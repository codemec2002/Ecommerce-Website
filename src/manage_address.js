import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import user from "./schema.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.set('views', path.join(__dirname, '../views'));

const get_address = async (req, res) => {
    const user_mail = req.session.userData.email;
    const response = await user.findOne({ email: user_mail });
    // console.log(response.address);
    const addresses = response.address;
    if (addresses.length == 0) {
        res.render("manage_address.ejs");
    } else {
        res.render("manage_address.ejs", {
            addresses: addresses,
        });
    }
}

const post_address = async (req, res) => {
    const user_mail = req.session.userData.email;
    const address = req.body;
    const response = await user.updateOne({ email: user_mail }, {
        $push: {
            address: address,
        }
    });
    res.redirect("/manage_address");
}

const add_address = (req, res) => {
    res.render("add_address.ejs");
}

const delete_address = async (req, res) => {
    const ind = req.params.ind;
    const user_mail = req.session.userData.email;
    const response = await user.findOne({ email: user_mail });

    try {
        await user.updateOne({ email: user_mail }, {
            $pull: {
                address: response.address[ind]
            }
        });
    } catch (e) {
        console.log(e);
    }
    res.redirect("/manage_address");
}

export { get_address, post_address, add_address, delete_address };