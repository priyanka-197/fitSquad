import React, { Fragment, useState, useEffect } from "react";
import "./resetPassword.css";
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import { useNavigate,useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()
    const {token}=useParams()
    const{loading,error,success}=useSelector(state=>state.passwordForgot)
    const[password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState('')

    const resetPasswordSubmit=(e)=>{
e.preventDefault()
dispatch(resetPassword(token,{password,confirmPassword}))

    }

    useEffect(()=>{
if(error){
    alert.error(error)
    dispatch(clearErrors)
}
if(success){
    alert.success("password updated successfully")

    navigate('/login')
}


    },[dispatch,navigate,alert,success,error])
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmPassword}
                  onChange={(e) =>setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword
