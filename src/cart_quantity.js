import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cartSchema from "./cart_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const increase_quantity = async (req, res) => {
    const product_id = req.body.id;
    const userEmail = req.session.userData.email;
    const cartList = await cartSchema.find({ userEmail: userEmail });
    // console.log(cartList[0]);
    cartList[0].products.find(item => item.product == product_id).quantity += 1;
    await cartList[0].save();
    res.redirect("/go_to_cart");
}

const decrease_quantity = async (req, res) => {
    const product_id = req.body.id;
    const userEmail = req.session.userData.email;
    const cartList = await cartSchema.find({ userEmail: userEmail });
    // console.log(cartList[0]);
    cartList[0].products.find(item => item.product == product_id).quantity -= 1;
    await cartList[0].save();
    res.redirect("/go_to_cart");
}

export { increase_quantity, decrease_quantity };