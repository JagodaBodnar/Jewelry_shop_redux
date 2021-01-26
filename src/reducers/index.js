import { actionTypes } from "../actions/actionTypes";
import emailjs from "emailjs-com";

const initialState = {
  products: [],
  productsToFilter: [],
  cart: [],
  cartCounter: 0,
  wishlist: [],
  isCartOpen: false,
  categoryFilter: [],
  filterToRemove: [],
  isProductMenuVisible: true,
  isChecked: false,
  openPopUp: false,
  bestseller: [],
  emerald: [],
  ruby: [],
  cartTotal: 0,
};

const shopTestReducer = (state = initialState, action) => {
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
    TOGGLE_WISHLIST_ICON,
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
  const { type, payload } = action;

  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [...payload],
        productsToFilter: [...payload],
      };
    case SET_BESTSELLERS:
      const sortingAlgorithm = (firstProduct, secondProduct) =>
        firstProduct.productId - secondProduct.productId;
      const sortedProducts = state.products.sort(sortingAlgorithm);
      const bestsellers = [];
      bestsellers.push(sortedProducts[0], sortedProducts[18]);
      const emeralds = [];
      emeralds.push(sortedProducts[12], sortedProducts[43]);
      const rubys = [];
      rubys.push(sortedProducts[45], sortedProducts[47]);
      return {
        ...state,
        bestseller: [...bestsellers],
        emerald: [...emeralds],
        ruby: [...rubys],
      };
    case SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case SET_CART_CLOSED:
      return {
        ...state,
        isCartOpen: false,
      };
    case ADD_PRODUCT_TO_CART:
      const addProductToCart = state.products.find((product) => {
        return product.productName === payload;
      });

      const isProductAlreadyInCart =
        state.cart.filter((e) => e.productName === `${payload}`).length > 0;

      return {
        ...state,
        cart: isProductAlreadyInCart
          ? [...new Set([...state.cart])]
          : [...new Set([...state.cart, addProductToCart])],
        cartCounter: state.cartCounter + 1,
      };
    case REMOVE_PRODUCT_FROM_CART:
      const productQuantity = payload.productQuantity;
      const remainedProducts = state.cart.filter((product) => {
        if (product.productName === payload.productName) {
          product.productQuantity = 1;
        }
        return product.productName !== payload.productName;
      });
      return {
        ...state,
        cart: [...new Set([...remainedProducts])],
        cartCounter: state.cartCounter - productQuantity,
      };
    case INCREASE_PRODUCT_QUANTITY:
      const increasedProductQuantity = state.cart.map((product) => {
        if (product.productName === payload) {
          product.productQuantity += 1;
        }
        return product;
      });
      return {
        ...state,
        cart: [...new Set([...increasedProductQuantity])],
        cartCounter: state.cartCounter + 1,
      };
    case DECREASE_PRODUCT_QUANTITY:
      const decreasedProductQuantity = state.cart.map((product) => {
        if (
          product.productName === payload.productName &&
          payload.productQuantity > 1
        ) {
          product.productQuantity -= 1;
          state.cartCounter -= 1;
        }
        return product;
      });
      return {
        ...state,
        cart: [...new Set([...decreasedProductQuantity])],
      };
    case HANDLE_CALCULATE_CART_TOTALS:
      let total = 0;
      state.cart.forEach((item) => {
        total = total + item.productQuantity * item.productPrice;
      });
      return {
        ...state,
        cartTotal: total,
      };
    case CLEAR_CART:
      state.cart.forEach((item) => {
        item.productQuantity = 1;
      });
      return {
        ...state,
        cart: [],
      };
    case CLEAR_CART_COUNTER:
      return {
        ...state,
        cartCounter: 0,
      };
    case TOGGLE_WISHLIST_ICON:
      return {
        ...state,
        products: [...state.products],
      };
    case HANDLE_DUPLICATE_NAMES_OF_PRODUCTS:
      const copyOfCart = [...state.cart];
      if (state.cart.length !== 0) {
        copyOfCart.forEach((item) => {
          if (item.productName === payload) {
            item.productQuantity = item.productQuantity + 1;
          }
        });
      }
      return {
        ...state,
        cart: [...new Set([...copyOfCart])],
      };
    case ADD_PRODUCT_TO_WISHLIST:
      const setProductOnWishlist = state.products.filter((product) => {
        return product.productName === payload;
      });
      const isProductAlreadyOnWishlist =
        state.wishlist.filter((e) => e.productName === `${payload}`).length > 0;

      return {
        ...state,
        wishlist: isProductAlreadyOnWishlist
          ? [...new Set([...state.wishlist])]
          : [...new Set([...state.wishlist, ...setProductOnWishlist])],
      };
    case REMOVE_PRODUCT_FROM_WISHLIST:
      const remainedWishProducts = state.wishlist.filter((product) => {
        return product.productName !== payload;
      });
      return {
        ...state,
        wishlist: [...new Set([...remainedWishProducts])],
      };
    case OPEN_WISHLIST_POPUP:
      return {
        ...state,
        openPopUp: true,
      };
    case CLOSE_WISHLIST_POPUP:
      return {
        ...state,
        openPopUp: false,
      };
    case TOGGLE_PRODUCT_MENU:
      return {
        ...state,
        isProductMenuVisible: !state.isProductMenuVisible,
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
      let filterAttribute = payload.getAttribute("data-target");
      const filterProducts = () => {
        if (filterAttribute !== null) {
          const filteredProducts = state.products.filter((product) =>
            product.categories.includes(filterAttribute)
          );
          return filteredProducts;
        }
      };
      return {
        ...state,
        products: filterProducts(),
        categoryFilter: state.categoryFilter.concat(filterAttribute),
        filterToRemove: state.filterToRemove.concat(filterAttribute),
      };
    case REMOVE_FILTER_CATEGORY:
      let filteredAttribute = payload.getAttribute("data-target");
      const setFilterToRemove = state.filterToRemove.filter((filter) => {
        return filter !== filteredAttribute;
      });
      const checkIfOneArrayIncludesOther = (arr, target) =>
        target.every((item) => arr.includes(item));
      const filteredProducts = state.productsToFilter.filter((product) => {
        if (
          checkIfOneArrayIncludesOther(
            product.categories,
            setFilterToRemove
          ) === true
        ) {
          return product;
        }
      });
      return {
        ...state,
        filterToRemove: [...setFilterToRemove],
        products: [...filteredProducts],
        categoryFilter: [...setFilterToRemove],
      };
    case SEARCH_PRODUCTS:
      payload.preventDefault();
      let temporary = [...state.productsToFilter];
      let tempProducts = [...temporary];
      const searchInputValue = payload.target.search.value;

      if (searchInputValue.length > 0) {
        tempProducts = tempProducts.filter((item) => {
          let tempSearchInput = searchInputValue.toLowerCase();
          let tempProductName = item.productName.toLowerCase();
          if (tempProductName.includes(tempSearchInput)) {
            return item;
          }
        });
      }
      payload.target.reset();
      return {
        ...state,
        products: [...tempProducts],
      };
    case RESET_FILTERS:
      return {
        ...state,
        products: [...state.productsToFilter],
        categoryFilter: [],
        filterToRemove: [],
      };
    case HANDLE_CHECKBOX_CHANGE:
      return {
        ...state,
        isChecked: !state.isChecked,
      };
    case SEND_QUESTION:
      payload.preventDefault();
      emailjs
        .sendForm(
          "service_plarh0j",
          "template_7bbl3dd",
          payload.target,
          "user_oRqOU5S9CjVoFm0t7S0mI"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      payload.target.reset();
      return {
        ...state,
        isChecked: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default shopTestReducer;
