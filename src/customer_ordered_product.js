import express from "express";
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import cartSchema from "./cart_schema.js";
import product from "./product_schema.js";
import customerOrderSchema from "./customer_order_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const customer_ordered_product = async (req, res) => {

    try {
        const userEmail = req.session.userData.email;
        const orderList = await customerOrderSchema.findOne({userEmail: userEmail});
        // console.log(orderList.products + "   before   ");
        if (orderList) {
            const productsPromises = orderList.products.map(async (pro) => {
                const pro_res = await product.findById(pro.product);
                return {
                    res : pro_res,
                    quantity : pro.quantity
                };
            });

            const order_list = await Promise.all(productsPromises);
            console.log(order_list);
            res.render("customer_ordered.ejs", {
                orderList: order_list,
            });
        } else {
            return res.send("NO Order");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


export default customer_ordered_product;

