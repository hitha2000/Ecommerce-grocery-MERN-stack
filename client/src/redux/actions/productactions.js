import {
    
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    
   
  } from '../constants/productconstants';
  import axios from 'axios';
  import Cookie from 'js-cookie'
 



export const saveProduct = (productid,productname,mrp,sp,quantity,category,subcategory,featured,image) => async (dispatch, getState) => {

  const userinform=JSON.parse(Cookie.get('userInfo'))
  const config={
    headers:
    {
        'Content-Type':"application/json",
        
            'Authorization': 'bearer '+ userinform.token
        
    }
  
}
  console.log("client" + productid);
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload:{productid,productname,mrp,sp,quantity,category,subcategory,featured,image}});
      /*const {
        userSignin: { userSignin },
      } = getState();*/
      console.log("client" + productname);
    
        const { data } = await axios.post("http://localhost:5000/products", {productid,productname,mrp,sp,quantity,category,subcategory,featured,image},config, {
         
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });

       
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };


 export const listProducts = (item) => async (dispatch) => {
    try {
      console.log("pdadctions"+item)
     const subcategory=item
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(        
                        
        'http://localhost:5000/subcategory?subcategory=' +
          subcategory 
         
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

  
export const productUpdate = (updateproductid, updatemrp, updatesp) => async (dispatch, getState) => {
  const userinform=JSON.parse(Cookie.get('userInfo'))
  const config={
    headers:
    {
        'Content-Type':"application/json",
        
            'Authorization': 'bearer '+ userinform.token
        
    }
  
}

 console.log(updateproductid +" in actions")
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: { updateproductid, updatemrp,updatesp } });
    const { data } = await axios.put("http://localhost:5000/products" ,
      {updateproductid,updatemrp,updatesp},config);
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
  }
}