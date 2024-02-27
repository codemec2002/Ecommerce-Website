import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import products from "./product_schema.js";
import categorySchema from "./category_schema.js";
import categories from "./get_category_name.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

const name_wise_product = function(req,res) {
    var category=req.params.category;
    var name=req.params.name;
    // console.log("here");
    // console.log(category);
    // console.log(name);
    // console.log("here");
    categories.forEach(cate=> {
        if(category==cate.category) {
            // console.log(cate.category_wise_name);
            // console.log("check",cate.category_wise_name[name]);
            cate.category_wise_name.forEach((products,n)=> {
                if(n==name) {
                    res.render("search.ejs",{
                        products:products,
                    });
                }
            });
        }
    })
}

export default name_wise_product;