import React, { useReducer } from "react";
import "./signupRight.css";
import { Link } from "react-router-dom";
import { googleRegister, signUp } from "../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {signupvalidationSchema} from '../../Pages/Login/Userauthvalid.js'
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
function SignupRight() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const formReducer = (data, event) => {
    return { ...data, [event.target.name]: event.target.value };
  };
  const [formData, setFormData] = useReducer(formReducer,{});
  const handlesub = (data) => {
    console.log(data);
    dispatch(signUp(data));
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver( signupvalidationSchema),
    mode: 'onBlur',
  });
  return (
    <div className="LoginRight rounded-xl w-[28rem] bg-white  m-5 myflex flex-col ">
      <p className="Heading text-3xl my-10">CONNECT</p>
      <div className="w-full max-w-[340px]">
        <form className="signupform " onSubmit={handleSubmit(handlesub)}>
          <div className="mb-4">
            <p className="text-start font-medium text-base">User Name</p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
              id="username"
              name="username"
              type="text"
              placeholder="User_name"
              {...register('username')}
              onChange={setFormData}
            />
            <p>{errors.username?.message}</p>
          </div>
          <div className="mb-4">
            <p className="text-start font-medium text-base">Email</p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
              id="email"
              name="email"
              type="text"
              placeholder="abcexample@gmail.com"
              {...register('email')}
              onChange={setFormData}
            />
          </div>
          <p>{errors.email?.message}</p>
          <div className="mb-4">
            <p className="text-start font-medium text-base">Phone Number</p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
              id="phoneNumber"
              name="phonenumber"
              type="number"
              placeholder="(123)456789"
              {...register('phonenumber')}
              onChange={setFormData}
            />
          </div>
          <p>{errors.phonenumber?.message}</p>
          <div className="mb-4">
            {/* <p className="text-start font-medium text-base">Gender</p>
            <input type="radio" id="male" name="gender" />
            <label for="male" className="mr-2">
              Male
            </label>
            <input type="radio" id="female" name="gender" />
            <label for="female">Female</label> */}

            <div className="mb-4">
              <p className="text-start font-medium text-base">Date of Birth</p>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                placeholder=""
                {...register('dateOfBirth')}
                onChange={setFormData}
              />
            </div>
            {/* <p>{errors.dateOfBirth?.message}</p> */}
          </div>

          <div className="mb-4">
            <p className="text-start font-medium text-base">Password</p>
            <input
              className="font-medium shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your Password"
              {...register('password')}
              onChange={setFormData}
            />
          <p>{errors.password?.message}</p>

          </div>
          {/* <p className="text-start font-medium text-base">Confirm Password</p>
            <input
              className="font-medium shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmpassword"
              name="confirmpassword"
              type="confirmpassword"
              placeholder="Confirm Password"
              onChange={setFormData}
            /> */}

          <button type="submit" className="submitbtn text-lg bg-gradient-to-r from-l-pink to-l-blue text-white font-medium py-2 px-4 w-80 border border-white rounded" disabled={loading} >
            {loading?'Loading...':"Signup"}
          </button>
        </form>
        <p className="my-1">OR</p>
        {/* <button
          type="button"
          className="myflex  w-80 p-1 border-2 rounded-[10px] border-gray-200"
        >
          <img
            className="w-8 mr-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/157px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
          />
          <p className="">Sign in with Google</p>
        </button> */}
                 <GoogleLogin
              onSuccess={credentialResponse => {
                console.log('google',credentialResponse);
                dispatch(googleRegister(credentialResponse))
              }}
            />
        <p className="mt-3">
          Already have an account ?
          <Link to="/" className="text-blue-700">
            {" "}
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupRight;
