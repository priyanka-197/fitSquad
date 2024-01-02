
import './App.css';
import React, { useState,useEffect } from 'react';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home"
import webfont from "webfontloader";
import ProductDetails from './component/product/ProductDetails';
import Products from "./component/product/Products.js";
import Search from './component/product/Search';
import Login from './component/user/Login';
import store from "./Store";
import { loadUser } from './actions/UserAction';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart"
import Shipping from "./component/cart/Shipping"
import ConfirmOrder from "./component/cart/ConfirmOrder"
import Payment from "./component/cart/Payment"
import ProtectedRoutes from "./component/Route/ProtectedRoute"
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/cart/OrderSuccess";
import SelectPayment from './component/cart/SelectPayment';
import MyOrders from "./component/order/MyOrders.js";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/admin/newProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList';
import ProcessOrder from './component/admin/ProcessOrder';
import UserList from "./component/admin/UserList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from './component/admin/ProductReviews';
import Contact from './component/layout/Contact';
import About from './component/layout/About';
import NotFound from './component/layout/NotFound/NotFound';







// DB_URI="mongodb://127.0.0.1:27017/"


function App() {
  const {isAuthanticated,user}=useSelector(state=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState('')



  async function getStripeApiKey(){
  try {
      
    const {data}=await axios.get("/api/v1/stripeapikey")
setStripeApiKey(data.stripeApiKey)

  } catch (error) {
    console.log(error)
  }
  }
 

useEffect(()=>{
    webfont.load({
      google:{
        families:['Roboto',"Droid Sans","Chilanka"]
      }
    })
store.dispatch(loadUser())

  getStripeApiKey()

  },[])

// window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
  
   <Router>
    <Header/>
    {isAuthanticated && <UserOptions user={user}/>}

  <Routes>
  
<Route exact path="/" element={<Home/>}></Route>
<Route exact path="/product/:id" element={<ProductDetails/>}></Route>
<Route exact path="/products" element={<Products/>}></Route>
<Route path="/products/:keyword" element={<Products/>}></Route>
<Route exact path="/search" element={<Search/>}></Route>
<Route exact path="/contact" element={<Contact/>} />
<Route exact path="/about" element={<About/>} />

<Route  element={<ProtectedRoutes/> }>

<Route exact path="/account" element={<Profile/>}/>
<Route exact path="/update-me" element={<UpdateProfile/>}/>
<Route exact path="/update-password" element={<UpdatePassword/>}/>
<Route exact path="/shipping" element={<Shipping/>}/>
<Route exact path="/order-confirm" element={<ConfirmOrder/>}/>
<Route exact path="/selectPayment" element={<SelectPayment/>}/>

{stripeApiKey && (
  <Route
    path="/process-payment"
    element={(
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    )}
  />
)}
<Route exact path='/success'element={<OrderSuccess/>}/>
<Route exact path='/orders'element={<MyOrders/>}/>
<Route exact path='/order/:id'element={<OrderDetails/>}/>
<Route isAdmin={true} exact path='/admin/dashboard'element={<Dashboard/>}/>
<Route isAdmin={true} exact path='/admin/products'element={<ProductList/>}/>
<Route isAdmin={true} exact path='/admin/product'element={<NewProduct/>}/>
<Route isAdmin={true} exact path='/admin/product/:id'element={<UpdateProduct/>}/>
<Route isAdmin={true} exact path='/admin/orders'element={<OrderList/>}/>
<Route isAdmin={true} exact path='/admin/order/:id'element={<ProcessOrder/>}/>
<Route isAdmin={true} exact path='/admin/users'element={<UserList/>}/>
<Route isAdmin={true} exact path='/admin/user/:id'element={<UpdateUser/>}/>
<Route isAdmin={true} exact path='/admin/reviews'element={<ProductReviews/>}/>


</Route>



<Route exact path="/forgot-password" element={<ForgotPassword/>}/>
<Route exact path="/reset-password/:token"element={<ResetPassword/>}/>
<Route exact path="/login" element={<Login/>}></Route>
<Route exact path="/cart" element={<Cart/>}></Route>
<Route path='*' element={<NotFound />} />
</Routes>
    <Footer/>
    </Router>
    
  );
}

export default App;
