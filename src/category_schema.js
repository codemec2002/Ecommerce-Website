import mongoose, { Schema } from "mongoose";
import pkg from 'validator';

const {isEmail} = pkg;
// mongoose.connect("mongodb://localhost:27017/ecommerce");
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");
import products from "./product_schema.js";     
const category_schema = mongoose.Schema({
    category: String,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
});
category_schema.index({category:1});
const categorySchema = mongoose.model("categorySchema",category_schema);

export default categorySchema;  