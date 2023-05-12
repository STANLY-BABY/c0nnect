import * as UserApi from "../api/UserRequest";
export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" });
  UserApi.followUser(id, data);
};
export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER" });
  UserApi.unfollowUser(id, data);
};

// export const updateProfilePic = (id, data) => async (dispatch) => {
//   dispatch({ type: "UPDATE_PROFILE_PIC" });
//   UserApi.updateProfilePic(id, data)
// };

export const updateProfilePic = (id, imageData) => async (dispatch) => {
    dispatch({ type: "UPDATE_PROFILE_PIC_START" });
    try {
    //   const { data: updatedData } = await

       UserApi.updateProfilePic(id, imageData).then((resp)=>{
        dispatch({ type: "UPDATE_PROFILE_PIC_SUCCESS", payload: { id: id, file:resp} });
       })
    } catch (error) {
      
      dispatch({ type: "UPDATE_PROFILE_PIC_FAIL" });
    }
  };
  
  export const updateCoverePic = (id, data) => async (dispatch) => {
    dispatch({ type: "UPDATE_COVER_PIC" });
    try {
      UserApi.updateCoverPic(id,data).then((res)=>{
        
        dispatch({type:"UPDATE_COVER_PIC_SUCCESS",payload:{id:id,file:res}})
      })
    } catch (error) {
      
      dispatch({type:"UPDATE_COVER_PIC_FAIL"})
    }
  };
  export const updateUser =(id,formData)=> async(dispatch)=>{
    dispatch({ type: "UPDATING_START" });
    try {
      const {data}= await UserApi.updateUser(id,formData)
      dispatch({type:"UPDATING_SUCESS",data:data})
    } catch (error) {
      dispatch({type:"UPDATING_FAIL"})
    }
  }