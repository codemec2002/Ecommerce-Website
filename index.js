import express from "express";
import bodyParser from "body-parser";
import session from "cookie-session";
import cookieParser from "cookie-parser";
import fs from "fs";
import multer from "multer";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as loginRoute from "./src/login.js";
import * as signupRoute from "./src/signup.js";
import * as forgotPassRoute from "./src/forget_pass.js";
import verifyOtp from "./src/verify_otp.js";
import newPass from "./src/new_pass.js";
import homeRoute from "./src/home.js";
import * as becomeSeller from "./src/become_seller.js";
import * as addProduts from "./src/add_products.js";
import profile from "./src/profile.js";
import categoryProduct from "./src/category_products.js";
import search from "./src/search.js";
import add_to_cart from "./src/add_to_cart.js";
import go_to_cart from "./src/cart.js";
import buy_product from "./src/buy_product.js";

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const port=3000;

// use session to store the email in session 
app.use(cookieParser());
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"it's a secret",
  cookie:{maxAge:3600000*1},
  email:"email"
}));

// for uploading image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where you want to save the uploaded files
    // cb(null, 'uploads/');
    fs.mkdir('./public/uploads/',(err)=>{
      cb(null, './public/uploads/');
   });
  },
  filename: (req, file, cb) => {
    // Create a unique filename for the uploaded file
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get("/",loginRoute.login_get);
app.post("/",loginRoute.login_post);

app.get("/signup",signupRoute.signup_get);
app.post("/signup",signupRoute.signup_post);

app.get("/forgot_password",forgotPassRoute.forgotPass_get); 
app.post("/forgot_password",forgotPassRoute.forgotPass_post);

app.post("/verify_otp",verifyOtp);

app.post("/new_password",newPass);

app.get("/home",homeRoute);

app.get("/become_seller",becomeSeller.sellerSignUp_get);
app.post("/become_seller",becomeSeller.sellerSignUp_post);

app.get("/add_products",addProduts.addProducts_get);
app.post("/add_products",upload.single('product_image'),addProduts.addProducts_post);

app.get("/profile", profile);

app.get("/category",categoryProduct);

app.post("/search", search);

app.get("/add_to_cart", add_to_cart);

app.get("/go_to_cart", go_to_cart);

app.get("/buy_product", buy_product);

app.post("/:category", search);

// app.get("/:category/:name",name_wise_product);

app.listen(port,function(){
    console.log(`Server started on port ${port}`);
});
