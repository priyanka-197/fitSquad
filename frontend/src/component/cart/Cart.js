import React, { Fragment } from 'react';
import CartItemCard from './CartItemcard';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addItemsTocart,removeItemsFromCart } from '../../actions/CartActions';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import "./cart.css"
import MetaData from '../layout/MetaData';

const Cart = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const {cartItems}=useSelector(state=>state.cart)
const {isAuthanticated}=useSelector((state)=>state.user)

const increaseQuantity=(id,quantity,stock)=>{
    const newQty=quantity+1;
    if(stock <= quantity)return;
    dispatch(addItemsTocart(id,newQty))
}
const decreaseQuantity=(id,quantity)=>{
    const newQty=quantity-1;
    if(quantity<=1)return;
    dispatch(addItemsTocart(id,newQty))
}

const deleteCartItems=(id)=>{
dispatch(removeItemsFromCart(id))
}
const checkoutHandler=()=>{
  if(isAuthanticated){
    navigate('/shipping')
  }else{
    navigate("/login")
  }
  
}

  return (
    <Fragment>
       <MetaData title="Cart--The Fit Souad"/> 
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Place Order</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
