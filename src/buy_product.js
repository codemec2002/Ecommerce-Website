import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cartSchema from "./cart_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const buy_product = async (req, res) => {
    res.send("You bought the product");
};

export default buy_product;
