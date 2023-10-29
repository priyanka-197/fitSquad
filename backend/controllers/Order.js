import { Order } from "../models/orderModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import asyncError from "../middlewear/catchAsyncError.js";
import { Product } from "../models/productModel.js";


export const newOrder=asyncError(async(req,res,next)=>{
// const {shippingInfo,OrderItems,paymentInfo,itemPrice,taxPrice,shippingPrice,totalPrice,}=req.body
const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


const order= await Order.create({
    shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,paidAt:Date.now(),user:req.user._id,
})

res.status(201).json({
    success:true,
    order,

})

})
//get logged in user single product detail
export const getSingleOrder=asyncError(async(req,res,next)=>{

const order = await Order.findById(req.params.id).populate("user","name email");

if(!order){
    return next (new ErrorHandler("order not found with this id",404))
}
res.status(200).json({
    success:true,
    order,
})
})
//get logged in user orders
export const myOrders=asyncError(async(req,res,next)=>{

const orders = await Order.find({user:req.user._id}).populate("user","name email");

if(!orders){
    return next (new ErrorHandler("order not found with this id",404))
}
res.status(200).json({
    success:true,
    orders,
})
})
//get all order-admin
export const getAllOrders=asyncError(async(req,res,next)=>{

const orders = await Order.find()

let totalAmount=0;
orders.forEach((order)=>{
    totalAmount+=order.totalPrice
});
res.status(200).json({
    success:true,
    totalAmount,
    orders,
})
})
//update order status-admin
export const updateOrder=asyncError(async(req,res,next)=>{

const order = await Order.findById(req.params.id)

if(!order){
    return next (new ErrorHandler("order not found with this id",404))
}

if(order.orderStatus==='Delivered'){
    return next( new ErrorHandler('you have already delivered this order',400))
}


if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
order.orderStatus=req.body.status;

if(req.body.status === 'Delivered'){
    order.deliveredAt=Date.now()
}
await order.save({validateBeforeSave:false})


res.status(200).json({
    success:true,
    orderStatus:order.orderStatus,
})
})

async function updateStock(id,quantity){
const product=await Product.findById(id)

product.stock=product.stock-quantity;

await product.save({validateBeforeSave:false})

}
//deleteOrder
export const deleteOrder=asyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler("order not found with this id",404))
    }
    await order.deleteOne()
    
    res.status(200).json({
        success:true,
        
    })
    })