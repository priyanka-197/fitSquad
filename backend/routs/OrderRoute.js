import express from "express";
import { deleteOrder, getAllOrders, getSingleOrder, myOrders, newOrder, updateOrder } from "../controllers/Order.js";
import { isAuthantication,authoriseRoles } from "../middlewear/auth.js";


const router = express.Router()

router.route("/order/new").post(isAuthantication,newOrder)
router.route("/order/:id").get(isAuthantication,getSingleOrder)
router.route("/orders/me").get(isAuthantication,myOrders)
router.route("/admin/orders").get(isAuthantication,authoriseRoles("admin"),getAllOrders)
router.route("/admin/order/:id").put(isAuthantication,authoriseRoles("admin"),updateOrder).delete(isAuthantication,authoriseRoles('admin'),deleteOrder)

export default router;