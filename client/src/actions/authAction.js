import * as AuthApi from '../api/AuthRequest'

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};
export const AdminLogIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.AdminLogin(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
    return (error)
  }
};
  
  export const signUp = (formData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { data } = await AuthApi.signUp(formData);
      dispatch({ type: "AUTH_SUCCESS", data: data });
      
    } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_FAIL" });
    }
  };
  
  export const googleRegister =(credential)=>async(dispatch)=>{
    dispatch({type:"GOOGLE_AUTH_START"});
    try {
      const {data} =await AuthApi.googleRegister(credential)
      dispatch({type:"GOOGLE_AUTH_SUCCESS",data:data})
    } catch (error) {
      console.log(error);
      dispatch({type:"GOOGLE_AUTH_FAIL"})
    }
  }
  export const logOut =()=> async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
  }