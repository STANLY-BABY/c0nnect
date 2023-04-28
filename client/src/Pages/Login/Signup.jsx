import React from 'react'
import SignupLeft from '../../Components/signup/SignupLeft'
import SignupRight from '../../Components/signup/SignupRight'

function Signup() {
  return (
    <div className='Login myflex   bg-gradient-to-r from-l-pink to-l-blue'>
        <SignupLeft/>
        <SignupRight/>
    </div>
  )
}

export default Signup