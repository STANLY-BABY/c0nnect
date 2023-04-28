import "./loginright.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useReducer } from "react";
import { logIn } from "../../actions/authAction";

function LoginRight() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const formReducer = (data, event) => {
    return { ...data, [event.target.name]: event.target.value };
  };
  const [formData, setFormData] = useReducer(formReducer, {});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formData));
  };
  return (
    <div className="  w-[31rem] rounded-r-lg bg-[#ffffffe8] h-[33.9rem]  myflex flex-col LoginRight ">
      <p className="Heading text-4xl mb-10">CONNECT</p>
      <div class="w-full max-w-[340px]">
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
            <button className=" text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-medium py-2 px-4 w-80 border border-white rounded" disabled={loading}>
              {loading?'Loading...':"Signin"}
            </button>
          </div>
        </form>
        <p className="my-1">OR</p>
        <button className="myflex  w-80 p-1 border-2 rounded-[10px] border-gray-200">
          <img
            class="w-8 mr-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
          />
          <p class="">Sign in with Google</p>
        </button>
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
