import React, { useEffect, useState } from "react";
import SignupLeft from "../../Components/signup/SignupLeft";
import SignupRight from "../../Components/signup/SignupRight";

function Signup() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Login myflex  min-h-[100vh] bg-gradient-to-r from-l-pink to-l-blue">
      {isMobile ? (
        <SignupRight />
      ) : (
        <>
          <div className="hidden md:block">
            <SignupLeft />
          </div>
        <SignupRight />
        </>
      )}
    </div>
  );
}

export default Signup;
