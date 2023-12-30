import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import products from "./product_schema.js";
import categorySchema from "./category_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

const addProducts_get = function(req,res) {
    res.render("add_products.ejs");
}

const addProducts_post = async(req,res)=> {
    var product_name=req.body.name;
    var price=req.body.price;
    var quantity=req.body.quantity;
    var brand=req.body.brand;
    var category=req.body.category;
    var product_image = req.file.filename;
    if(product_name && price && quantity && brand && category && product_image) {
        if(category=="other") {
            if(req.body.otherCategory) {
                category=req.body.otherCategory;
            }
            else {
                res.render("add_products.ejs",{
                    msg: "All fields are required",
                });
            }
        }
        const existingProduct = await products.findOne({
            name: product_name,
            brand: brand,
            seller_email: req.session.userData.email,
        });
    
        if (existingProduct) {
            // If the product already exists for the seller, update its quantity
            existingProduct.quantity += parseInt(quantity, 10);
            await existingProduct.save();
            res.send("Product already Present so quantity updated successfully");
        } else {
            const newProduct = new products({
                name: product_name,
                brand: brand,
                category: category,
                seller_email:req.session.userData.email,
                price:price,
                quantity:quantity,
                productImage: product_image
            });
            console.log(product_image);
            const product_res=await newProduct.save();
        

            var category_res = await categorySchema.findOne({category:category});
            if(category_res) {
                category_res.products.push({product:product_res._id});
            } else {
                category_res = new categorySchema({
                    category: category,
                    products: [{product:product_res._id}]
                });
            }
            await category_res.save();
            res.send("successfully added");
        }
    }
    else {
        res.render("add_products.ejs",{
            msg:"All fields are required",
        });
    }
}

export {addProducts_get,addProducts_post};
