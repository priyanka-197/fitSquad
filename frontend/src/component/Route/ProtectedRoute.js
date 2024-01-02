import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {Outlet,useNavigate} from "react-router-dom"

const ProtectedRoutes = () => {
    const {loading,isAuthanticated}=useSelector(state=>state.user)
    const navigate=useNavigate()

  return (
    <Fragment>


       {!loading && (
        <>
        {!isAuthanticated ? navigate("/login") :<Outlet/>}
       
        </>
        )}
   


       
       
    </Fragment>
  )
}

export default ProtectedRoutes;
