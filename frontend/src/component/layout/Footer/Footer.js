import React from 'react';
import Appstore  from "../../../images/Appstore.png"
import playstore  from "../../../images/playstore.png"
import {AiOutlineInstagram} from "react-icons/ai";
import {BsFacebook} from "react-icons/bs";
import {IoLogoYoutube} from "react-icons/io";
import "./footer.css"

const Footer = () => {
  return (
   <footer id="footer">
     <div id="leftfooter">
   <h4>Dowanload our App</h4>
   <p>Dowanload App for Android and IOS mobile phone</p>
   <img src ={Appstore} alt="playstore"/>
   <img src ={playstore} alt="Appstore"/>
   </div>
   <div id="midfooter">
<h1>The Fit Squad</h1>
<p>High quality is our first priority</p>
<p>Copyrights 2023 &copy;The Fit Squad</p>
</div>

<div id='rightfooter'>
<h4>follow us</h4>
<a href="instagram.com">Instagram <AiOutlineInstagram/></a>  
<a href="facebook.com">Facebook <BsFacebook/></a>
<a href="youtube.com">Youtube <IoLogoYoutube/></a>

</div>

   </footer>)
}

export default Footer
