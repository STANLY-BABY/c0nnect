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
        console.log(resp.profilePicture,"resp data")
        dispatch({ type: "UPDATE_PROFILE_PIC_SUCCESS", payload: { id: id, file:resp} });
       })
    } catch (error) {
      console.log(error);
      dispatch({ type: "UPDATE_PROFILE_PIC_FAIL" });
    }
  };
  
  export const updateCoverePic = (id, data) => async (dispatch) => {
    dispatch({ type: "UPDATE_COVER_PIC" });
    try {
      UserApi.updateCoverPic(id,data).then((res)=>{
        console.log(res.coverPicture,'resp data')
        dispatch({type:"UPDATE_COVER_PIC_SUCCESS",payload:{id:id,file:res}})
      })
    } catch (error) {
      console.log(error);
      dispatch({type:"UPDATE_COVER_PIC_FAIL"})
    }
  };