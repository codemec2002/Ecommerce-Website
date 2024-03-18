import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { Seller } from "./seller_schema.js";
import products from "./product_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));

const seller_details = async (req, res) => {
    try {
        const sellerEmail = req.session.userData.email;
        const sellerDetails = await Seller.findOne({email : sellerEmail});
        console.log((sellerDetails) + " hwlllo ji  ");
        const sellerPromises = sellerDetails.products.map(async (item) => {
            const pro_res = await products.findById(item);
        });

        const sellerPro = await Promise.all(sellerPromises);
        console.log(sellerPro + "from server   ");
        
        if (!sellerDetails) {
            res.send("No seller found");
        } else {
            res.render('seller_details.ejs', { seller: sellerDetails });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

export default seller_details;
