import React from "react";
import "./contact.css";
import { Button } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import PhoneIcon from "@material-ui/icons/Phone";
import Instagram from "@material-ui/icons/Instagram";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:Fitsquadindia@outlook.com">
        <MailIcon/>
        <Button>MAIL: Fitsquadindia@outlook.com</Button>
      </a>
      <a className="mailBtn" href = "tel:9669653333">
        <PhoneIcon/>
      <Button>Contact NO:9669653333</Button>
        </a>

      <a className="mailBtn" href ="https://instagram.com/fitsquadindiaofficial?igshid=OGQ5ZDc2ODk2ZA==">
        <Instagram/>
      <Button>Fitsquadindiaofficial</Button>
      </a>
    </div>
  );
};

export default Contact;