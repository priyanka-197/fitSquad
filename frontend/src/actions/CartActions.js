import {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../constants/CartConstent";
import axios from 'axios';


//add to cart
export const addItemsTocart=(id,quantity,flavour)=>async(dispatch,getState)=>{

    const {data}=await axios.get(`/api/v1/product/${id}`)


dispatch({type:ADD_TO_CART,payload:{
    product:data.product._id,
    name:data.product.name,
    price:data.product.price,
    image:data.product.images[0].url,
    stock:data.product.stock,
    quantity,
    flavour,
},
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
   
}

export const removeItemsFromCart=(id)=>async(dispatch,getState)=>{

    dispatch({type:REMOVE_CART_ITEM,
    payload:id,
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippinfInfo=(data)=>(dispatch)=>{
    dispatch({type:SAVE_SHIPPING_INFO,payload:data,})

    localStorage.setItem("shoppingInfo",JSON.stringify(data))
}