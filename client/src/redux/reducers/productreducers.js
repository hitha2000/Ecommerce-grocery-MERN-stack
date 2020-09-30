import { 
    PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL,

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS
  } from '../constants/productconstants';
  
  export function productSaveReducer(state = { product: {} }, action) {
    switch (action.type) {
      case PRODUCT_SAVE_REQUEST:
        return { loading: true };
      case PRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

export function productListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
     
      console.log(action.payload)
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function productUpdateReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
