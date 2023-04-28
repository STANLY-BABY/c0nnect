import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from'./postReducer';
import AdminReducer from "./AdminReducer";

export const reducers= combineReducers({authReducer,postReducer,AdminReducer})