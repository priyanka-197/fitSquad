import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { ProductsReducer , ProductDetailsReducer,newReviewReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer} from "./reducers/productReducer";
import {ForgotPasswordReducer, ProfileReducer, UserReducer, allUsersReducer, userDetailsReducer} from "./reducers/UserReducer"
import { CartReducer } from "./reducers/CartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer,orderDetailsReducer, orderReducer } from "./reducers/OrderReducer";


const reducer=combineReducers({
    products:ProductsReducer,
    product:productReducer,
    productDetail: ProductDetailsReducer,
    user:UserReducer,
    profile:ProfileReducer,
    passwordForgot:ForgotPasswordReducer,
    cart:CartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct:newProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer,
    
    
});

let initialState={
    cart: {
        cartItems: localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          :[],
          shippingInfo: localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
}

}

const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;