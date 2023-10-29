import React, { Fragment } from 'react';
import "./SelectPayment.css";
import { Link } from 'react-router-dom';

const SelectPayment = () => {

  const submitHandler=()=>{
    
  }

  return (
    <Fragment>
        <div className="paymentContainer">
          <div className='div'>
          <h2>Cash On Delievery</h2>
<input type='checkbox'/>
          </div>
          <div>
            <Link to="/process-payment">BY Credit/DebitCard</Link>
        </div>
        </div>
        <button onClick={submitHandler}>Place Order</button>
    </Fragment>
  )
}

export default SelectPayment;
