import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSechema = new mongoose.Schema(
  {
  name: {
    type:String,
    required: [true, "please Enter your name"],
    maxLength: [30, "name can not exceed 30 characters"],
    minLength: [4, "name should have more then 4 characters"],
  },
  email: {
    type:String,
    required: [true, "please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "please Enter a valid Email"],
  },
  password: {
    type:String,
    required: [true, "please Enter your password"],
    minLength: [7, "password should have more than 7 characters"],  
   select:false,
    
  },

  role: {
    type:String,
    default: "user",
  },
  createdAt:{
    type:Date,
    default:Date.now(),
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});



userSechema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    console.log("password is not modifying")
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


userSechema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE,
    })
}

 userSechema.methods.comparePassword = async function(enteredPassword){

 return await bcrypt.compare(enteredPassword,this.password)
 }
 
 userSechema.methods.getResetPasswordToken=function(){
const resetToken = crypto.randomBytes(20).toString("hex")

this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordExpire= Date.now()+15*60*1000;
return resetToken;
}
export const User=mongoose.model("User",userSechema)