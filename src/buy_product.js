import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import product from "./product_schema.js";
import customerOrderSchema from "./customer_order_schema.js";
import cartSchema from "./cart_schema.js";
import { Seller } from "./seller_schema.js";
import { soldProductsSchema } from "./seller_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const buy_product = async (req, res) => {
    
    console.log(req.query);
    if(req.query===undefined || req.query === null || req.query == {} || Object.keys(req.query).length === 0) {
        // When products are bought from the cart
        console.log("from cart");
        const userEmail = req.session.userData.email;
        const cartList = await cartSchema.find({ userEmail: userEmail });
        if (cartList.length) {
            // Loop through the products in the cart and process each one
            const productsPromises = cartList[0].products.map(async (pro) => {
                // Find the product details from the product schema
                const pro_res = await product.findById(pro.product);

                const Product = pro_res;
                const quant = pro_res.quantity;
                const productId = pro_res._id;
                const session_mail = req.session.userData.email;

                const soldProducts = new soldProductsSchema({
                    productId: pro_res._id,
                    quantitySold: pro_res.quantity,
                    buyerEmail: session_mail

                });
        
                await soldProducts.save();
        

                // Print Seller details     
                await Seller.updateOne(
                    { email: Product.seller_email },
                    { $push: { soldProducts: soldProducts } }
                );

                // Update product quantity: Reduce the quantity of the sold product
                await product.findByIdAndUpdate(pro.product, { $inc: { quantity: -pro.quantity } });

                // Update customer order schema: Add the purchased product to customer's order history
                let order_res = await customerOrderSchema.findOne({ userEmail: session_mail });
                if (order_res) {
                    order_res.products.push({ product: productId, quantity: parseInt(quant) });
                } else {
                    order_res = new customerOrderSchema({
                        userEmail: session_mail,
                        products: [{ product: productId, quantity: parseInt(quant) }]
                    });
                }
                await order_res.save();

                return {
                    res: pro_res,
                    quantity: pro.quantity
                };
            });

            await Promise.all(productsPromises);
            await cartSchema.deleteMany({ userEmail: userEmail });
        }
    }
    // Check if the request body contains any data, indicating direct purchase without adding to cart
    else {
        // When directly bought without adding to cart
        const Product = req.query.product ? JSON.parse(req.query.product) : null;
        const quant = 1;
        const productId = Product._id;
        const session_mail = req.session.userData.email;

        // Update seller details: Push sold product details to seller's soldProducts array

        console.log("before");
        const soldProducts = new soldProductsSchema({
            productId: productId,
            quantitySold: quant,
            buyerEmail: session_mail
        });

        await soldProducts.save();

        await Seller.updateOne(
            { email: Product.seller_email },
            { $push: { soldProducts: soldProducts } }
        );



        // Update product quantity: Reduce the quantity of the sold product
        await product.findByIdAndUpdate(productId, { $inc: { quantity: -quant } });

        console.log(req.query);

        // Update customer order schema: Add the purchased product to customer's order history
        let order_res = await customerOrderSchema.findOne({ userEmail: session_mail });
        if (order_res) {
            order_res.products.push({ product: productId, quantity: parseInt(quant) });
        } else {
            order_res = new customerOrderSchema({
                userEmail: session_mail,
                products: [{ product: productId, quantity: parseInt(quant) }]
            });
        }
        await order_res.save();

    }
    res.send("products bought");

};

export default buy_product;
