import React from 'react'
import LoginLeft from '../../Components/login/LoginLeft'
import LoginRight from '../../Components/login/LoginRight'
import './login.css'
function Login() {
  return (
    <div className='Login myflex bg-gradient-to-r from-l-pink to-l-blue  '>
      <LoginLeft/>
      <LoginRight/>
      
    </div>
  )
}

export default Login
