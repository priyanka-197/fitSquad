import React, { Fragment, useEffect } from 'react';
import {CgMouse} from "react-icons/cg";

import "./home.css";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getHomeProducts} from '../../actions/ProductAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../layout/loader/Loader';
import {useAlert} from "react-alert";




const Home = () => {
  const alert = useAlert()
  const dispatch=useDispatch()
  const {loading,error,products}=useSelector(state=>state.products)
  
  useEffect(()=>{
    
if(error){
 alert.error(error)
 dispatch(clearErrors())
}
dispatch(getHomeProducts())
  },[dispatch,error,alert])


  return (
  <Fragment>
    {
      loading ? (<Loader/>) :(
        <>
        <MetaData title="The Fit Squad"/>
        <div className='banner'>
           <p>Welcome to The Fit Squad </p> 
           <h1>FIND AMAZING PRODUCT BELOW</h1>
           <a href="#container">
            <button>Scroll <CgMouse/></button>
           </a>
    </div>
   
        <h2 className='homeHeading'>Featured products</h2>
        <div className='container' id="container">
         {products && products.map(product=>(
          <ProductCard key={product._id} product={product}/>
         )) }
    
    
        </div>
        </>
      )
    }
  </Fragment>
    
  )
}

export default Home
