import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import product from "./product_schema.js";
import customerOrderSchema from "./customer_order_schema.js";
import cartSchema from "./cart_schema.js";
import Seller from "./seller_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const buy_product = async (req, res) => {
    console.log(req.query);
    try {
        // Check if the request body contains any data, indicating direct purchase without adding to cart
        if (Object.keys(req.body).length > 0) {
            // When directly bought without adding to cart
            const Product = req.query.product ? JSON.parse(req.query.product) : null;
            const quantity = 1;
            const productId = Product._id;
            const session_mail = req.session.userData.email;
            
            // Update seller details: Push sold product details to seller's soldProducts array
            await Seller.updateOne(
                { email: Product.seller_email },
                { $push: { soldProducts: { productId: productId, quantitySold: quantity, buyerEmail: session_mail } } }
            );

            // Update product quantity: Reduce the quantity of the sold product
            await product.findByIdAndUpdate(productId, { $inc: { quantity: -quantity } });

            // Update customer order schema: Add the purchased product to customer's order history
            let order_res = await customerOrderSchema.findOne({ userEmail: session_mail });
            if (order_res) {
                order_res.products.push({ product: productId, quantity: parseInt(quantity) });
            } else {
                order_res = new customerOrderSchema({
                    userEmail: session_mail,
                    products: [{ product: productId, quantity: parseInt(quantity) }]
                });
            }
            await order_res.save();

        } else {
            // When products are bought from the cart
            console.log("from cart");
            const userEmail = req.session.userData.email;
            const cartList = await cartSchema.find({ userEmail: userEmail });
            if (cartList.length) {
                // Loop through the products in the cart and process each one
                const productsPromises = cartList[0].products.map(async (pro) => {
                    // Find the product details from the product schema
                    const pro_res = await product.findById(pro.product);

                    // Print Seller details     
                    const sellerDetails = await Seller.findOne({ email: pro_res.seller_email });
                    console.log("Seller Details:", sellerDetails);
                    
                    // Update seller details: Push sold product details to seller's soldProducts array
                    await Seller.updateOne(
                        { email: pro_res.seller_email },
                        { $push: { soldProducts: { productId: pro.product, quantitySold: pro.quantity, buyerEmail: userEmail } } }
                    );

                    // Update product quantity: Reduce the quantity of the sold product
                    await product.findByIdAndUpdate(pro.product, { $inc: { quantity: -pro.quantity } });

                    // Update customer order schema: Add the purchased product to customer's order history
                    const customer_ordered_list = new customerOrderSchema({
                        userEmail: userEmail,
                        products: [{ product: pro.product, quantity: parseInt(pro.quantity) }]
                    });
                    await customer_ordered_list.save();

                    return {
                        res: pro_res,
                        quantity: pro.quantity
                    };
                });
                
                await Promise.all(productsPromises);
                await cartSchema.deleteMany({ userEmail: userEmail });
            }
        }
        res.send("products bought");
    } catch (error) {
        console.log(error.message); // Log the error message
        res.status(500).send("Error occurred while processing the request.");
    }

};

export default buy_product;
