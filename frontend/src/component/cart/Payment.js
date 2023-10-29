import React, { Fragment, useEffect,useRef, useState} from "react";
import CheckoutSteps from "./CheckOutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/OrderAction";

import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [flag,setFlag]=useState(false)

const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"))

const dispatch=useDispatch()
const stripe=useStripe()
const elements=useElements()
const payBtn=useRef(null)
const navigate=useNavigate()
const alert=useAlert()

const {shippingInfo,cartItems}=useSelector((state)=>state.cart)
const {user}=useSelector((state)=>state.user)
 const {error,success}=useSelector((state)=>state.newOrder)

const paymentData={
  amount:Math.round(orderInfo.totalPrice * 100),
}

const order={
  shippingInfo,
  orderItems: cartItems,
  itemsPrice: orderInfo.subtotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharges,
  totalPrice: orderInfo.totalPrice,
 
}
const order1={
  shippingInfo,
  paymentInfo:{
    id:'cash on delivery',
    status:'cash on delivery',
  },
  orderItems: cartItems,
  itemsPrice: orderInfo.subtotal,
  taxPrice: orderInfo.tax,
  shippingPrice: orderInfo.shippingCharges,
  totalPrice: orderInfo.totalPrice,
 
}
const continueHandler=()=>{
  
if(flag){
    dispatch(createOrder(order1))
   }
}

 const submitHandler=async(e)=>{
e.preventDefault()
payBtn.current.disabled=true;
try {
  const config={
    headers:{
      "Content-Type":"application/json",
    }
  };
  const {data}= await axios.post('/api/v1/payment/process',paymentData,config)

  const client_secret = data.client_secret

  if(!stripe || !elements)return;

  const result= await stripe.confirmCardPayment(client_secret,{
    payment_method:{
      card:elements.getElement(CardNumberElement),

    billing_details:{
      name:user.name,
      email:user.email,
      address:{
        line1: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.pinCode,
        country: shippingInfo.country,
      },
    },
  },

  }
  );
if(result.error){
  payBtn.current.disabled=false;
  alert.error(result.error.message)
}else{
  if(result.paymentIntent.status==="succeeded"){
    
    order.paymentInfo={
      id:result.paymentIntent.id,
      status:result.paymentIntent.status,
    }
    dispatch(createOrder(order))
    navigate("/success")
  }else{
    alert.error("here is some issue while processing payment")
  }
}

} catch (error) {
  payBtn.current.disabled=false;
   alert.error(error)
}
};
useEffect(() => {
  if (error) {
    alert.error('first fullfill Shipping Information');
    dispatch(clearErrors());
  }
  if(success){
    navigate("/success")
  }

},[dispatch, error, alert,success,navigate]);

return (
  
     <Fragment>
    <MetaData title="Payment"/>
    <CheckoutSteps activeStep={2} />



    <div className="paymentContainer">
    <div className="select">
<h3>CASH ON DELIVERY</h3>
<input type="checkbox" checked={flag} onChange={()=>setFlag(!flag)}/>
<button onClick={continueHandler}>Place Order</button>
</div>
<h2>OR</h2>
<br/>
      <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
        <Typography>Card Info</Typography>
        <div>
          <CreditCardIcon />
          <CardNumberElement className="paymentInput" />
        </div>
        <div>
          <EventIcon />
          <CardExpiryElement className="paymentInput" />
        </div>
        <div>
          <VpnKeyIcon />
          <CardCvcElement className="paymentInput" />
        </div>

        <input
          type="submit"
          value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
          ref={payBtn}
          className="paymentFormBtn"
        />
      </form>
    </div>
  </Fragment>
 
  )
}

export default Payment
