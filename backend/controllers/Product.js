import { Product } from "../models/productModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import asyncError from "../middlewear/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";

//create product admin
export const createProduct = asyncError(async (req, res, next) => {
  let images=[];
 
  if(typeof req.body.images==="string"){
images.push(req.body.images)
  }else{
images=req.body.images;
  }

  const imagesLinks=[];
for (let i = 0; i < images.length; i++) {
const result=await cloudinary.v2.uploader.upload(images[i],{folder:"products",})
  imagesLinks.push({
    public_id:result.public_id,
    url:result.secure_url,

  })
}
req.body.images=imagesLinks;
req.body.user = req.user._id
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
  
});

export const getAllProducts = asyncError(async (req, res) => {

  const resultPerPage =8;

  const productsCount = await Product.countDocuments()
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  
  

const products = await apiFeatures.query;

  res.status(200).json({ success: true, products,productsCount ,resultPerPage});
});
//get all products admin
export const getAdminProducts = asyncError(async (req, res) => {


  const products=await Product.find();
  
res.status(200).json({ success: true, products});
});

//get all products home
export const getAllHomeProducts = asyncError(async (req, res) => {


  const products=await Product.find();
  
res.status(200).json({ success: true, products});
});

export const updateProduct = asyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

 // Images Start Here
 let images = [];

 if (typeof req.body.images === "string") {
   images.push(req.body.images);
 } else {
   images = req.body.images;
 }

 if (images !== undefined) {
   // Deleting Images From Cloudinary
   for (let i = 0; i < product.images.length; i++) {
     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
   }

   const imagesLinks = [];

   for (let i = 0; i < images.length; i++) {
     const result = await cloudinary.v2.uploader.upload(images[i], {
       folder: "products",
     });

     imagesLinks.push({
       public_id: result.public_id,
       url: result.secure_url,
     });
   }

   req.body.images = imagesLinks;
 }

  product = await Product.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, product });
});

export const deleteProduct = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  //Deleting image from cloudinary
  for (let i = 0; i < product.images.length; i++) {
await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    
  }
  await product.deleteOne();
  res
    .status(200)
    .json({ success: true, message: "product deleted successfully" });
});

export const getProductDetails = asyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({ success: true, product });
});


// create new review or update review 
export const createProductReview=asyncError(async(req,res,next)=>{
const {rating,comment,productId} =req.body

  const review = {
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
  }
  const product = await Product.findById(productId)

  const isReviewed =  product.reviews.find(rev=>rev.user.toString()===req.user._id.toString())

if(isReviewed){
product.reviews.forEach((rev)=>{
  if(rev.user.toString()===req.user._id.toString())
 (rev.rating=rating),(rev.comment=comment)
})
}else{
  product.reviews.push(review)
  product.numOfReviews=product.reviews.length
}
let avg =0
product.reviews.forEach(rev=>{
  avg=avg+rev.rating
})
// product.numOfReviews=product.reviews.length
product.ratings = avg/product.reviews.length

await product.save({validateBeforeSave:false})
res.status(200).json({success:true})
})
//get all reviews of a product
export const getProductReviews=asyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)

  if(!product){
    return next(new ErrorHandler("product not found",404))
  }

  res.status(200).json({success:true,reviews:product.reviews,})
})

export const deleteReview=asyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId)

if(!product){
    return next(new ErrorHandler("product not found",404))
  }

  const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())
  
let avg = 0;

reviews.forEach((rev)=>{
avg=avg+rev.rating
  })
  
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
 

const numOfReviews = reviews.length

await Product.findOneAndUpdate({_id:req.query.productId},{$set:{reviews:reviews},ratings,numOfReviews},{new:true,runValidators:true,useFindAndModify:false})

  res.status(200).json({
    success:true,
  })

})