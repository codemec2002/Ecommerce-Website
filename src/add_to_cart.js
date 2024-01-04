    import express from "express";
    import { fileURLToPath } from 'url';
    import path, { dirname } from 'path';
    import cartSchema from "./cart_schema.js";

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const app = express();
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.static(path.join(__dirname, '..', 'public')));

    const add_to_cart = async (req, res) => {
        try {
            const Product = req.query.product ? JSON.parse(req.query.product) : null;
            // console.log(Product);
            var id = Product._id;
            var session_mail = req.session.userData.email;
            var cart_res=await cartSchema.findOne({userEmail:session_mail});
            if(cart_res) {
                cart_res.products.push(id);
            } else {
                cart_res = new cartSchema({
                    userEmail: session_mail,
                    products: [{ product: id }]
                });
            }
            await cart_res.save();
            console.log("Product added to cart");
            res.status(200).send("Product added to cart successfully");

            // console.log("Product:", Product);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            res.status(500).send("Error adding product to cart");
        }
    }

    export default add_to_cart;
