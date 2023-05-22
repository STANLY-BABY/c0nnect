import React, { useEffect, useState } from 'react'
import LoginLeft from '../../Components/login/LoginLeft'
import LoginRight from '../../Components/login/LoginRight'

function Login() {
  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener('resize', handleResize);
  handleResize(); 

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  return (
    
<div className="Login min-h-[100vh] flex justify-center items-center text-center bg-gradient-to-r from-l-pink to-l-blue">
    {isMobile ? (
      <LoginRight />
    ) : (
      <>
        <div className="hidden md:block">
          <LoginLeft />
        </div>
        <LoginRight />
      </>
    )}
  </div>
  )
}

export default Login
