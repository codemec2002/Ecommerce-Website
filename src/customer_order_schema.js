import mongoose, { Schema } from "mongoose";
import pkg from 'validator';

const {isEmail} = pkg;
// mongoose.connect("mongodb://localhost:27017/ecommerce");
mongoose.connect("mongodb+srv://hupenderkhatod:Hupender%40123@cluster0.yl15wtm.mongodb.net/");
import products from "./product_schema.js";
const customer_order_schema = mongoose.Schema({
    userEmail : String,
    quantity : Number,
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    }]
});
cart_schema.index({userEmail:1});
const customerOrderSchema = mongoose.model("customerOrderSchema", customerOrderSchema);

export default customerOrderSchema;  