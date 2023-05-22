import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useReducer, useState } from "react";
import { logIn } from "../../actions/authAction";
import { signupvalidationSchema } from "../../Pages/Login/Userauthvalid.js";
import { GoogleLogin } from "@react-oauth/google";
import { googleRegister, signUp } from "../../actions/authAction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
function LoginRight() {
  const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const formReducer = (data, event) => {
    return { ...data, [event.target.name]: event.target.value };
  };
  const [formData, setFormData] = useReducer(formReducer, {});
  const handleSubmit = async (e) => {
    e.preventDefault();
    let test =await dispatch(logIn(formData))
    setError(test.response.data)
    ;
  };
  const {
    register,
    handleSub,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupvalidationSchema),
    mode: "onBlur",
  });
  return (
    <div className="  xl:w-[31rem] lg:w-96 md:rounded-r-lg md:rounded-l-none rounded-lg bg-[#ffffffe8] xl:h-[33.9rem] lg:h-[30.9rem] flex justify-center items-center text-center flex-col lg:py-0 md:py-5 p-3">
      <p className="Heading text-4xl lg:mb-10 mb-6">CONNECT</p>
      <div class="lg:px-0 md:px-4 w-full lg:max-w-[340px] md:min-w-[300px]">
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <p className="text-start font-medium text-base">Email</p>
            <input
              type="email"
              className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
              id="email"
              placeholder="Email"
              name="email"
              onChange={setFormData}
            />
          </div>
          <div class="">
            <p className="text-start font-medium text-base">Password</p>
            <input
              class="font-medium shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              onChange={setFormData}
              placeholder="Enter your Password"
            />
            <p className="mb-1 text-end">Forgot password ?</p>
            <span className='text-red-500 font-light'>{error && <>{error}</>}</span>
            <button
              className=" text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-medium py-2 px-4 w-80 border border-white rounded"
              disabled={loading}
            >
              {loading ? "Loading..." : "Signin"}
            </button>
          </div>
        </form>
        <p className="my-1">OR</p>
 <GoogleLogin
              onSuccess={credentialResponse => {
                console.log('google',credentialResponse);
                dispatch(googleRegister(credentialResponse))
              }}
            />
        <p className="mt-3">
          Don't have an account ?{" "}
          <Link to="/register" className="text-blue-700">
            {" "}
            Signup
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default LoginRight;
