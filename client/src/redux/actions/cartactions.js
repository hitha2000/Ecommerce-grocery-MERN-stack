import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartconstants";


export const addToCart = (productid, productname, mrp, sp, quantity,category, subcategory, image, count) => async (dispatch, getState) => {

     
      dispatch({
        type: CART_ADD_ITEM, payload: {
            productid, productname, mrp, sp, quantity,category, subcategory, image, count
        }
      });
     
      const { cart: { cartItems } } = getState();
 


    localStorage.setItem("cartItems", JSON.stringify(cartItems));

     
}
  
 export const removeFromCart = (productid) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productid });
  
   // const { cart: { cartItems } } = getState();
   //Cookie.set("cartItems", JSON.stringify(cartItems));
  }