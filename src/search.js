import express, { query } from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import products from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const search = async(req, res) => {
    try {
        const queryProductName = req.body.name;
        // const allProducts = await products.find();
        // console.log(allProducts);
        // console.log(queryProductName);
        const productArray = await products.find({ name: queryProductName });

        if (productArray.length === 0) {
            console.log("No item found for the searched name");
            res.send("Cannot find the searched product");
        } else {
            res.render("search.ejs", { products: productArray });
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
}

export default search;
