import * as UploadApi from '../api/UploadRequest'
export const uploadPost=(data)=>async(dispatch)=>{
    dispatch({type:'Upload start'});
    try {
        const newPost =await UploadApi.uploadPost(data);
        dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
      } catch (error) {
        
        dispatch({ type: "UPLOAD_FAIL" });
      }
}