import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import {
    userSigninReducer,
    userRegisterReducer,
    userLoginReducer
    //userUpdateReducer,
    

  } from './reducers/userreducers';
import 
{
  productSaveReducer,
  productListReducer,
  productUpdateReducer
} from './reducers/productreducers'

import
{
  cartReducer
}
from './reducers/cartreducers'
// const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// const cartItems = Cookie.getJSON('cartItems') || [];
const cartItems= JSON.parse(localStorage.getItem('cartItems')) || [];

const userInfo = Cookie.getJSON('userInfo') || null;
const userSignin=Cookie.getJSON('userSignin') || null;
const userRegister=Cookie.getJSON('userRegister') || null;

const initialState = {
   cart: { cartItems:[]},
    userSignin: {userSignin},
    userLogin:{userInfo},
    userRegister:{userRegister}
  };
 

  const reducer = combineReducers({
    productsList: productListReducer,
    //productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    updateProduct:productUpdateReducer,
      productSave: productSaveReducer,
    //productDelete: productDeleteReducer,
    //productReviewSave: productReviewSaveReducer,
    //orderCreate: orderCreateReducer,
    //orderDetails: orderDetailsReducer,
    //orderPay: orderPayReducer,
    //userUpdate: userUpdateReducer,
    //myOrderList: myOrderListReducer,
    //orderList: orderListReducer,
    //orderDelete: orderDeleteReducer,
  });
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


  const configureStore = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  export default configureStore;
  
