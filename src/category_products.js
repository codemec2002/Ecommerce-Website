import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import categorySchema from "./category_schema.js";
import products from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

const categoryProduct = async(req,res)=> {
    const category=req.query.name;
    var category_find_res = await categorySchema.findOne({category:category});
    if(category_find_res) {
        var category_products_promise = category_find_res.products.map(async(product)=> {
            var id = product.product;
            var product_find_res = await products.findById(id);
            return product_find_res;
        });
        var category_products= await Promise.all(category_products_promise);
        // while rendering send category name and category products
        res.render("category_wise_display.ejs",{
            categoryName:category,
            products: category_products
        });
    } else {
        res.send("No products of this category");
    }
}



export default categoryProduct;