import React, { Fragment,useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import profile from "../../images/profile.png"
import Loader from '../layout/loader/Loader'
import { useNavigate } from 'react-router-dom'
import "./profile.css"

const Profile = () => {
    const {user,loading,isAuthanticated}=useSelector(state=>state.user)
  
    const navigate=useNavigate()
    useEffect(()=>{
if(!isAuthanticated){
 navigate("/login")

}
    },[navigate,isAuthanticated])
    
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title={`${user.name}'s Profile`} />
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={profile} alt={user.name} />
            <Link to="/update-me">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>

            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/update-password">Change Password</Link>
            </div>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
);
}

export default Profile
