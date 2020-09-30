import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL
} from "../constants/userconstants";

const login = (email, password) => async (dispatch) => {
    console.log(email + password)
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    console.log(email + password)
    try {
      const { data } = await axios.post("http://localhost:5000/users/login", { email, password });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      console.log("data" +data)
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
  }

 
const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    console.log(email + password)
    try {
      const { data } = await axios.post("http://localhost:5000/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      console.log("data" +data)
     Cookie.set('userSignin', JSON.stringify(data));
     
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  }
  
  const register = (userId,name,phone,address) => async (dispatch) => {
  
    dispatch({ type: USER_REGISTER_REQUEST, payload: { userId,name,phone, address} });
    console.log(name +phone+ address)
    try {
      const { data } = await axios.put("http://localhost:5000/users/signin", {userId,name,phone, address });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      Cookie.set('userRegister', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    } 
  }

  /*const update = ({ userId, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
      const { data } = await Axios.put("/api/users/" + userId,
        { name, email, password }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  }
  */
  const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }
  export {login, signin,register, logout };
  
  