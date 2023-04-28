import React from "react";
import "./loginLeft.css";
import pic from "../../Images/signup.jpg";
function LoginLeft() {
  return (
    <div className="LoginLeft bg-white w-[45rem]  myflex items-center flex-col">
      <div class="heade">
        <div>
          <svg
            class="waves"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g class="parallax">
              <use
                href="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                href="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use href="#gentle-wave" x="56" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>

      <p className="Heading text-4xl mb-10 ">Join Our Community</p>
      <button
        type="button"
        className=" text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-medium py-2 px-4 w-56 border border-white rounded"
      >
        Register
      </button>
      <img src={pic} className="border-white " alt="" />
    </div>
  );
}

export default LoginLeft;
