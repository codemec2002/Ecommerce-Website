import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cartSchema from "./cart_schema.js";
import product from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const go_to_cart = async (req, res) => {
    try {
        const userEmail = req.session.userData.email;
        const cartList = await cartSchema.find({ userEmail: userEmail });
        // const cart_list = cartList.products.forEach(async(pro) => {
        //     const list = await product.findById(pro.product);
        //     return list;
        // });
        
        const productsPromises = cartList[0].products.map(async (pro) => {
            const pro_res = await product.findById(pro.product);
            return pro_res;
        });
        
        const cart_list = await Promise.all(productsPromises);
        res.render("go_to_cart.ejs",{
            cartList:cart_list,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export default go_to_cart;