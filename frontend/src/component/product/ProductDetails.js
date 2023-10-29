import React, { Fragment, useEffect,useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductsDetails, newReview } from "../../actions/ProductAction";
import { useParams } from "react-router-dom";

import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import {addItemsTocart} from "../../actions/CartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/ProductConstans";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const alert=useAlert();
 

  const { product, loading, error } = useSelector(
    (state) => state.productDetail
  );
  const {success,error:reviewError}=useSelector((state)=>state.newReview)

 

  const options = {
   size: "large",
    value: product.ratings,
    readOnly: true,
    precision:0.5,
  };



  const [quantity,setQunatity]=useState(1)
  const [flavour,setFlavour]=useState("")
  const [selectedColor, setSelectedColor] = useState('');
  const [open,setOpen]=useState(false)
  const[rating,setRating]=useState(0)
  const[comment,setComment]=useState("")
  
 
 
  
  const increaseQuantity=()=>{
    if(product.stock <= quantity)return;

    setQunatity(quantity+1)
  }
  const decreaseQuantity=()=>{
    if(quantity<=1)return;
    setQunatity(quantity-1)
  }

  const addtoCartHandler=()=>{
  
if(product.stock<1){
  return alert.success("product is out of stock")
}
console.log(flavour)
    dispatch(addItemsTocart(id,quantity,flavour))
    alert.success("Item added to Cart")
  }

  const submitReviewToggle=()=>{
    open?setOpen(false):setOpen(true);
  }
  const reviewSubmitHandler=()=>{
const myForm =new FormData();
myForm.set("rating",rating);
myForm.set("comment",comment);
myForm.set("productId",id);

dispatch(newReview(myForm))
setOpen(false)

  }

  useEffect(() => {
 
    if(error){
     alert.error(error)
     dispatch(clearErrors())
    }
    if(reviewError){
     alert.error(reviewError)
     dispatch(clearErrors())
    }
    if(success){
      alert.success("Review Submited Successfully")
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductsDetails(id));
  }, [dispatch,id,error,alert,success,reviewError]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
           <MetaData title ={`${product.name}-- The Fit Squad`}/>   
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                      style={{width:"30vw"}}
                    />
                  ))
                  }
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">

              <span className='span'>{`₹${product.mrp}`}</span>
<span>{`${product.discount} OFF`}</span>

                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
          <button onClick={addtoCartHandler}>Add to Cart</button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
               Size : <p>{product.size}</p>
              </div>
<br/>
<br/>
              <div className="detailsBlock-4">
            
              {product.flavour!=="undefined" && String(product.flavour).split(",").map((item,index)=>(
                <button className={`flavourBtn ${selectedColor === item ? 'active' : ''}`} key={item} onClick={(e)=>{setFlavour(item)
                 setSelectedColor(item)
                 

                }}>{item}</button>
              ))}
              
          </div>
<br/>
<br/>
              <div className="detailsBlock-5">
             Discount: <p>{`${product.discount} OFF`}</p>
              </div>

              <button onClick={submitReviewToggle}className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


        {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

 

export default ProductDetails;
