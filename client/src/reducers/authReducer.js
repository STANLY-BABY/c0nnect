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

    case "UNFOLLOW_USER_SUCCESSFULL":
      const updatedData = state.authData.user.following.filter(
        (userId) => userId !== action.data
      );
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: updatedData,
          },
        },
      };
    case "FOLLOW_USER_SUCCESSFULL":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };
    case "UPDATE_PROFILE_PIC_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            profilePicture: action.payload.file.profilePicture,
          },
        },
      };
    case "UPDATE_COVER_PIC_SUCCESS":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            coverPicture: action.payload.file.coverPicture,
          },
        },
      };
    case "GOOGLE_AUTH_SUCCESS":
      console.log("googleaction", action);
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      console.log("fail");
      return { ...state, updateLoading: false, error: true };

    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };

    default:
      return state;
  }
};

export default authReducer;
