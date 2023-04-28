import React, { useState } from 'react'
import style from './login.module.scss';
import { useNavigate } from 'react-router-dom';
import { AdminLogIn } from '../../../actions/authAction';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {
    const dispatch =useDispatch()
  const navigate =useNavigate()
  const [data, setData] = useState({ password: "", email: "" })
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit =()=>{
    console.log("adminlogin",data)
    dispatch( AdminLogIn(data))
  }
  return (
    <div className={style.forgotpassword}>
      <div className={style.box}>
        <div>
          {/* <img src={logo} alt="logo" /> */}
          <h2 className='Heading text-4xl' >Connect</h2>
        </div>
        <h2 className={style.forgothead}>Admin Login </h2>
        <p>Login with your email and password</p>
        <div className={style.form}>
          <label for="email-input">Email</label>
          <input type="email" placeholder='Enter your email' id="email-input" name='email' onChange={handleChange} value={data.email} />
          <label for="password-input">Password</label>
          <input type="password" placeholder='Enter your password' id="password-input" name='password' onChange={handleChange} value={data.password}/>
          <button className='button' onClick={handleSubmit} >Submit</button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin