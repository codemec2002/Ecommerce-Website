import mongoose, { Schema } from "mongoose";

import pkg from 'validator';

const {isEmail} = pkg;
// mongoose.connect("mongodb://localhost:27017/ecommerce");
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");

// we can increase the id by 1 for each entry in the database
const productsSchema = mongoose.Schema({
    name: String,
    brand: String,
    rating: Number,
    category: String,
    seller_email: String,
    price: String,
    quantity: Number,
    productImage: Buffer
});
productsSchema.index({"name":"text"});
const products = mongoose.model("products",productsSchema);

export default products;