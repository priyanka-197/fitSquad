import { ErrorHandler } from "../utils/errorHandler.js";
import asyncError from "../middlewear/catchAsyncError.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/jwt.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";


export const ragisterUser = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

 const user = await User.create({
    name,
    email,
    password,
   
  });

  sendToken(user, 201, res);
});

export const logInUser = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please enter Email or Password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid Email or Password", 401));
  }

  const isPasswordmatch = await user.comparePassword(password);

  if (!isPasswordmatch) {
    return next(new ErrorHandler("invalid Email or Password", 401));
  }
  const token = user.getJwtToken();

  sendToken(user, 200, res);
});

export const logout = asyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "logged out" });
});

export const forgotPassword = asyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetpasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `your password reset token is :-\n\n ${resetpasswordUrl} \n\n if you have not email this,then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `The Fit Squad password recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.name} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

export const resetPassword = asyncError(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
 
  if (!user) {
    return next(
      new ErrorHandler(
        "reset password token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
 export const getUserDetail =asyncError(async(req,res,next)=>{
const user= await User.findById(req.user.id)

res.status(200).json({success:true,user})
 })
 export const updateUser=asyncError(async(req,res,next)=>{
const user= await User.findById(req.user.id).select("+password")

const isPasswordmatch = await user.comparePassword(req.body.oldPassword)

if (!isPasswordmatch) {
  return next(new ErrorHandler("old Password is incorrect", 401));
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(new ErrorHandler("password does not match",400))
  }

  user.password = req.body.newPassword;
  await user.save()

sendToken(user,200,res)
 })
 export const updateUserProfile=asyncError(async(req,res,next)=>{

// we will add cloudinary later
const user =await User.findOneAndUpdate({_id:req.user._id},{$set:{name:req.body.name,email:req.body.email,}},{
  new:true,
  runValidators:true,
  userfindAndModify:false
})
res.status(200).json({success:true,user})
 })


//get all users (admin)
export const getAllUsers=asyncError(async(req,res,next)=>{
const users= await User.find();

res.status(200).json({success:true,users})
})
//get single user (admin)
export const getSingleUser=asyncError(async(req,res,next)=>{
const user= await User.findById(req.params.id);

if(!user){
  return next(new ErrorHandler(`user does not exist with id ${req.params,id}`))
}
res.status(200).json({success:true,user})
})

//update role-admin
export const updateUserRole=asyncError(async(req,res,next)=>{




   const user =await User.findOneAndUpdate(
    {_id:req.params.id},
    {$set:{
    role:req.body.role,
    name:req.body.name,
    email:req.body.email,
  }},
  {
    new:true,
    runValidators:true,
    userfindAndModify:false
  })

  res.status(200).json({success:true,user})
   })

   //delete user-admin
export const deleteUser=asyncError(async(req,res,next)=>{


  const user =await User.findById(req.params.id)


  
  if(!user){
    return next(new ErrorHandler(`user does not exist with id${req.params.id}`))
  }
  await user.deleteOne()

  res.status(200).json({success:true,message:"user deleted successfully"})
   })

