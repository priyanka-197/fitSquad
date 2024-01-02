import React, { Fragment, useEffect, useState } from 'react';
import "./products.css";
import {useSelector,useDispatch} from "react-redux";
import {getProducts,clearErrors} from "../../actions/ProductAction";
import Loader from "../layout/loader/Loader";
import ProductCard from "../Home/ProductCard"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useAlert} from "react-alert"
import MetaData from '../layout/MetaData';
// import Slider from "react-material-ui-carousel";



const categories=[  
"Protein",
"Massgainer",
"Pre-Workout",
"Mineral&Vitamins",
"EnergyDrinks",
"Creatine",
"Healthy-snacks",
"Combos",
]

const Products = () => {
   const {keyword} = useParams()
    const dispatch=useDispatch()
    const alert =useAlert()
    const[currentPage,SetCurrentPage]=useState(1)
    const [price,setPrice]=useState([0,15000])
    const [category,setCategory]=useState("")
    const[ratings,setRatings]=useState(0)
const {products,loading,error,productsCount,resultPerPage}=useSelector(state=>state.products)
const setCurrentPageNo=(e)=>{
    SetCurrentPage(e)
}
const priceHandler=(event,newPrice)=>{
    setPrice(newPrice);
}


useEffect(()=>{
if(error){
    alert.error(error)
    dispatch(clearErrors())
}
dispatch(getProducts(keyword,currentPage,price,category,ratings))


    },[dispatch,keyword,currentPage,price,category,ratings,alert,error])


  return (
    <Fragment>
       {loading?(<Loader/>):(
            <Fragment>
    <MetaData title="Products--The Fit Squad"/>            
<h2 className='productsHeading'>Products</h2>
<div className='products'>
    {products && products.map((product)=>(
        <ProductCard key={product._id} product={product}/>
    ))}
</div>
<div className='filterBox'>
  <Typography>Price</Typography>
  <Slider
  value={price}
  aria-label="price"
  onChange={priceHandler}
  valueLabelDisplay="auto"
 
min={0}
max={15000}
/>
<Typography>Catogries</Typography>
<ul className='categoryBox'>
    {categories.map((category)=>(
<li className='category-link'key={category} onClick={()=>setCategory(category)}>{category}</li>
    ))}
</ul>
<fieldset>
    <Typography component="legend">Rating Above</Typography>
    <Slider value={ratings}
    onChange={(e,newRating)=>setRatings(newRating)}
    aria-labelledby='continuous-slider'
    min={0}
    max={5}
    valueLabelDisplay='auto'
    />
</fieldset>
</div>

{resultPerPage<productsCount && (
    <div className='paginationBox'>
    <Pagination 
     activePage={currentPage}
     itemsCountPerPage={resultPerPage}
     totalItemsCount={productsCount}
     onChange={setCurrentPageNo}
     nextPageText="Next"
     prevPageText="Prev"
     firstPageText="1st"
     lastPageText="Last"
     itemClass="page-item"
     linkClass="page-link"
     activeClass="pageItemActive"
     activeLinkClass="pageLinkActive"
    
    />
    </div>
) }
            </Fragment>
        )}
    </Fragment>
  )
}

export default Products;