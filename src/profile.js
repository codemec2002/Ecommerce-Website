import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '..', 'public')));



const profile_get = async(req, res) => {
    var session_mail=req.session.userData.email;
    try {
        const customer = await user.findOne({email : session_mail});
        res.render("profile.ejs", {userData : customer});
    } catch {
        console.error("error" + session_mail);
        res.status(500).send('ServerError');
    }
};

export default profile_get;

