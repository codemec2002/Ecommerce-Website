import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import products from "./product_schema.js";
import categorySchema from "./category_schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app=express();
app.set('views',path.join(__dirname, '../views'));


