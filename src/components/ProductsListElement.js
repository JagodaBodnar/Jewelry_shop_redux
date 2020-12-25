import React, { useState } from "react";
import { HeadingTwo } from "../reusableComponents/Heading.js";
import Button from "../reusableComponents/Button.js";
import { v4 as uuidv4 } from "uuid";
import {
  addProductToCart,
  addProductToWishlist,
  handleDuplicateNamesOfProducts,
  openWishlistPopUp,
  removeProductFromWishlist,
  closeWishlistPopUp,
} from "../actions/index";
import { connect } from "react-redux";
import {
  StyledWishlistButtonContainer,
  StyledAddToWishlist,
  StyledIsOnWishlist,
  StyledAddToCartButtonContainer,
  StyledAddToCart,
  StyledImgContainer,
  StyledProductImage,
  StyledProductListElement,
  StyledLink,
} from "./ProductsListElementStyles";

const ProductsListElement = ({
  wishList,
  products,
  addProductToCart,
  productName,
  productImage,
  productQuantity,
  productPrice,
  productDesc,
  wishlist,
  removeProductFromWishlist,
  addProductToWishlist,
  handleDuplicateNamesOfProducts,
  openWishlistPopUp,
  closeWishlistPopUp,
}) => {
  const handleWishlist = (productName) => {
    products.map((item) => {
      if (item.productName === productName) {
        if (wishlist.length > 0 && item.wishList === true) {
          removeProductFromWishlist(productName);
          item.wishList = false;
        } else if (item.wishList === false) {
          addProductToWishlist(productName);
          item.wishList = true;
        }
      }
    });
  }; // wishList for item is not working properly there is a delay how to fix differently?
  const closePopUp = () => {
    setTimeout(() => {
      closeWishlistPopUp();
    }, 3000);
  };

  const [toggleWishlistLogo, setToggleWishlistLogo] = useState(wishList);
  const toggle = () => {
    setToggleWishlistLogo(!toggleWishlistLogo);
  };
  return (
    <StyledProductListElement key={uuidv4()}>
      <StyledWishlistButtonContainer>
        <Button
          onClick={() => {
            addProductToWishlist(productName);
            handleWishlist(productName);
            openWishlistPopUp();
            closePopUp();
            // toggle();
          }}
        >
          {wishList === true ? <StyledIsOnWishlist /> : <StyledAddToWishlist />}
        </Button>
      </StyledWishlistButtonContainer>

      <StyledLink
        to={{
          pathname: `/products/${productName}`,
          state: {
            productName,
            productPrice,
            productImage,
            productQuantity,
            productDesc,
            wishList,
          },
        }}
      >
        <StyledImgContainer>
          <StyledProductImage src={productImage} alt="product foto" />
        </StyledImgContainer>
        <HeadingTwo products>{productName}</HeadingTwo>
        <HeadingTwo price>
          {productPrice} <span>$</span>
        </HeadingTwo>
      </StyledLink>

      <StyledAddToCartButtonContainer>
        <Button
          onClick={() => {
            handleDuplicateNamesOfProducts(productName);
            addProductToCart(productName);
            // increaseCartCounter(productName);
          }}
        >
          <StyledAddToCart />
        </Button>
      </StyledAddToCartButtonContainer>
    </StyledProductListElement>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
    wishlist: state.wishlist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product) => dispatch(addProductToCart(product)),
    addProductToWishlist: (productName) =>
      dispatch(addProductToWishlist(productName)),
    removeProductFromWishlist: (product) =>
      dispatch(removeProductFromWishlist(product)),
    handleDuplicateNamesOfProducts: (product) =>
      dispatch(handleDuplicateNamesOfProducts(product)),
    openWishlistPopUp: () => dispatch(openWishlistPopUp()),
    closeWishlistPopUp: () => dispatch(closeWishlistPopUp()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsListElement);
