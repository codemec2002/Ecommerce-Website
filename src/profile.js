import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";
import seller from "./seller_schema.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));



const profile_get = async(req, res) => {
    var session_mail=req.session.userData.email;
    try {
        const customer = await user.findOne({email : session_mail});
        const is_seller= await seller.findOne({email:session_mail});
        var output="false";
        if(is_seller) {
            output="true";
        }
        res.render("profile.ejs", {
            name: customer.name,
            email: customer.email,
            isSeller: output,
        });
    } catch {
        res.status(500).send('ServerError');
    }
};

export default profile_get;

