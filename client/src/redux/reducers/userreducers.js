import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL
  } from "../constants/userconstants";

  export function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading1: true };
      case USER_SIGNIN_SUCCESS:
        return { loading1: false, userSignin: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading1: false, error1: action.payload };
      default: return state;
    }
  }

  export function userLoginReducer(state = {}, action) {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading2: true };
      case USER_LOGIN_SUCCESS:
        return { loading2: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading2: false, error2: action.payload };
      case USER_LOGOUT:
        return {};
      default: return state;
    }
  }

  export function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userRegister: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  