import { ErrorHandler } from "../utils/errorHandler.js";



export const errorMiddleWear=(err,req,res,next)=>{
err.statusCode=err.statusCode||500;
err.message=err.message || "internal server error";


//wrong mongodb id error

if(err.name==="castError"){
    const message = `resource not found. invalid${err.path}`;
    err=new ErrorHandler(message,400)

}

// mongoose duplicate key error

if(err.code===11000){
    const message = `duplicate ${Object.keys(err.keyValue)} enter`
    err = new ErrorHandler(message,400)
}

//wrong jwt error//
if(err.message === "TokenExpiredError"){
    const message = `json web token is Expired,Try again `;
    err =new ErrorHandler(message,400)
}

res.status(err.statusCode).json({success:false,message:err.message})
}