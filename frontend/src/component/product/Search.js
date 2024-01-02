import React, { Fragment, useState } from 'react';
import "./search.css";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';



const Search = () => {
   const [keyword,setKeyword]=useState("")
const navigate=useNavigate()
   const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
 navigate("/products");
    }
  };
   
  return (
   <Fragment>
         <MetaData title="Search Product--The Fit Squad"/>   
    <form className='searchBox' onSubmit={searchSubmitHandler}>
     <input type="text" value={keyword} placeholder='search a product....' onChange={(e)=>setKeyword(e.target.value)}/>  
     <input type='submit' value="search"/>
    </form>


   </Fragment>
  )
  }

export default Search
