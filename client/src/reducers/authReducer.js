const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: false };

    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };

    case "UPDATE_PROFILE_PIC_SUCCESS":
      console.log('action',action);
      return{...state,authData: { ...state.authData, user: { ...state.authData.user, profilePicture: action.payload.profilePicture } }}
      
    default:
      return state;
  }
};

export default authReducer;
