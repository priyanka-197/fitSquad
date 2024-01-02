import React from 'react';
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";

// burgerColorHover: "#eb4034",
// cartIconColor: "rgba(35, 35, 35,0.8)",

const options = {
    burgerColorHover: "orange",
    logo,
    logoWidth: "10vmax",
    navColor1: "white",
    navColor2:"rgba(247, 224, 255)",
    navColor3:"rgba(232, 182, 250)",
    // navColor4:"rgba(209, 104, 247)",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "purple",
    link2Color:"purple",
    link3Color:"purple",
    
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIconUrl: "/login",
    profileIconColor: "purple",
    searchIconColor: "purple",
    cartIconColor: "purple",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    profileIcon:true,
    ProfileIconElement:MdAccountCircle,
    searchIcon:true,
    SearchIconElement:MdSearch,
    cartIcon:true,
    CartIconElement:MdAddShoppingCart,
}

const Header =() => {
  return (
    <div>
      <ReactNavbar {...options}/>
    </div>
  )
}

export default Header
