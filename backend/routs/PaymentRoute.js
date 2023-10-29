import express from "express";
import {isAuthantication} from "../middlewear/auth.js";
import { processPayment, sendStripeApiKey } from "../controllers/Payment.js";


const router = express.Router();

router.route("/payment/process").post(isAuthantication,processPayment)
router.route("/stripeapikey").get(isAuthantication,sendStripeApiKey)


export default router;