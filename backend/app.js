import express from "express";
import product from "./routs/ProductRoute.js";
import user from "./routs/userRoute.js"
import order from "./routs/OrderRoute.js"
import payment from "./routs/PaymentRoute.js"
import { errorMiddleWear } from "./middlewear/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

if(process.env.NODE_ENV!=="PRODUCTION"){
    dotenv.config({path:"backend/config/config.env"})
}



app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.use(errorMiddleWear)
app.use(errorMiddleWear)
export default app;