import { actionTypes } from "./actionTypes";

const {
  FETCH_PRODUCTS,
  SET_BESTSELLERS,
  SET_CART_OPEN,
  SET_CART_CLOSED,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  INCREASE_PRODUCT_QUANTITY,
  DECREASE_PRODUCT_QUANTITY,
  HANDLE_CALCULATE_CART_TOTALS,
  CLEAR_CART,
  CLEAR_CART_COUNTER,
  HANDLE_WISHLIST,
  HANDLE_DUPLICATE_NAMES_OF_PRODUCTS,
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
  OPEN_WISHLIST_POPUP,
  CLOSE_WISHLIST_POPUP,
  TOGGLE_PRODUCT_MENU,
  FILTER_PRODUCTS_BY_CATEGORY,
  REMOVE_FILTER_CATEGORY,
  SEARCH_PRODUCTS,
  RESET_FILTERS,
  HANDLE_CHECKBOX_CHANGE,
  SEND_QUESTION,
} = actionTypes;

export const fetchProducts = (response) => {
  return {
    type: FETCH_PRODUCTS,
    payload: response,
  };
};

export const setBestsellers = () => {
  return {
    type: SET_BESTSELLERS,
  };
};

export const setCartOpen = () => {
  return {
    type: SET_CART_OPEN,
  };
};

export const setCartClosed = () => {
  return {
    type: SET_CART_CLOSED,
  };
};

export const addProductToCart = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: product,
  };
};

export const removeProductFromCart = (productName, productQuantity) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: { productName, productQuantity },
  };
};

export const increaseProductQuantity = (product) => {
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    payload: product,
  };
};

export const decreaseProductQuantity = (productName, productQuantity) => {
  return {
    type: DECREASE_PRODUCT_QUANTITY,
    payload: { productName, productQuantity },
  };
};

export const handleCalculateCartTotals = () => {
  return {
    type: HANDLE_CALCULATE_CART_TOTALS,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
export const clearCartCounter = () => {
  return {
    type: CLEAR_CART_COUNTER,
  };
};

export const handleWishlist = (product) => {
  return {
    type: HANDLE_WISHLIST,
    payload: product,
  };
};

export const handleDuplicateNamesOfProducts = (product) => {
  return {
    type: HANDLE_DUPLICATE_NAMES_OF_PRODUCTS,
    payload: product,
  };
};

export const addProductToWishlist = (productName) => {
  return {
    type: ADD_PRODUCT_TO_WISHLIST,
    payload: productName,
  };
};
export const removeProductFromWishlist = (product) => {
  return {
    type: REMOVE_PRODUCT_FROM_WISHLIST,
    payload: product,
  };
};

export const openWishlistPopUp = () => {
  return {
    type: OPEN_WISHLIST_POPUP,
  };
};

export const closeWishlistPopUp = () => {
  return {
    type: CLOSE_WISHLIST_POPUP,
  };
};

export const toggleProductMenu = () => {
  return {
    type: TOGGLE_PRODUCT_MENU,
  };
};

export const filterProductsByCategories = (e) => {
  return {
    type: FILTER_PRODUCTS_BY_CATEGORY,
    payload: e.target,
  };
};

export const removeFilterCategory = (e) => {
  return {
    type: REMOVE_FILTER_CATEGORY,
    payload: e.target,
  };
};
export const searchProductsBySearchInput = (e) => {
  return {
    type: SEARCH_PRODUCTS,
    payload: e,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const handleCheckboxChange = () => {
  return {
    type: HANDLE_CHECKBOX_CHANGE,
  };
};

export const sendQuestion = (e) => {
  return {
    type: SEND_QUESTION,
    payload: e,
  };
};
