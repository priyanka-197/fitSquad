import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useState } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Fragment } from 'react';
import Loader from '../layout/loader/Loader';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/UserAction';
import { useAlert } from 'react-alert';
import "./forgotPassword.css"

const ForgotPassword = () => {
 const dispatch=useDispatch()
 const alert = useAlert()
 const {loading,error,message} =useSelector(state=>state.passwordForgot)   
const [email,setEmail]=useState("")
const forgotPasswordSubmit=(e)=>{
    e.preventDefault()
    
dispatch(forgotPassword({email}))
}

useEffect(()=>{
if(error){
    alert.error(error)
    dispatch(clearErrors())
}
console.log(message)
if(message){
    alert.success(message)
}
},[error,alert,dispatch,message])
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword;
