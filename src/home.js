import express from "express";
const router = express.Router();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import category_wise_name from "./get_category_name.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));

router.get("/home", function(req,res) {
    res.render("home.ejs",{
        categories: category_wise_name,
    }
    );
})

// router.listen("3000",()=> {
//     console.log("server start on port " + 3000);
// })

export default router;