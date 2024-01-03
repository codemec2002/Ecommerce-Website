import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import category from "./category_schema.js";
import products from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
const category_collection = await category.find();
console.log(category_collection);
const category_wise_name_promise = category_collection.map(async (e)=> {
    const category_name = new Map();
    for(var i=0;i<e.products.length;i++) {
        var id=e.products[i].product;
        var res = await products.findById(id);
        if(res) {
            if(category_name.has(res.name)) {
                category_name.get(res.name).push(res);
            } else {
                category_name.set(res.name,[res]);
            }
        } else {
            console.log("no match for this product id");
        }
    }
    return {
        category:e.category,
        category_wise_name: category_name
    };
});
// we need to wait for all the promises/operations to finish
// const final=async()=> {
//     try {
//         category_wise_name=await Promise.all(category_wise_name_promise);
//     } catch(error) {
//         console.error(error);
//     }
// }
// await final();
// console.log(category_wise_name_promise);
var category_wise_name= await Promise.all(category_wise_name_promise);
console.log(category_wise_name);
export default category_wise_name;