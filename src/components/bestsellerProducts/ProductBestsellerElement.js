import React from "react";
import { HeadingTwo } from "../../reusableComponents/Heading";
import Button from "../../reusableComponents/Button.js";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addProductToWishlist,
  removeProductFromWishlist,
  closeWishlistPopUp,
  openWishlistPopUp,
  handleDuplicateNamesOfProducts,
  addProductToCart,
} from "../../actions/index";
import {
  StyledWishlistButtonContainer,
  StyledTooltip,
  StyledImgContainer,
  StyledProductImage,
  StyledLink,
  StyledAddToCartButtonContainer,
  StyledAddToCart,
  StyledIsOnWishlist,
  StyledAddToWishlist,
  StyledProductListElement,
} from "./ProductBestsellerElementStyles";

const ProductsBestsellerElement = ({
  productName,
  productPrice,
  productImage,
  productQuantity,
  productDesc,
  wishList,
  addProductToWishlist,
  addProductToCart,
  openWishlistPopUp,
  closeWishlistPopUp,
  products,
  wishlist,
  removeProductFromWishlist,
  handleDuplicateNamesOfProducts,
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
  return (
    <StyledProductListElement key={productName}>
      <StyledWishlistButtonContainer>
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <Button
            onClick={() => {
              addProductToWishlist(productName);
              handleWishlist(productName);
              openWishlistPopUp();
              closePopUp();
              // toggle();
            }}
          >
            {wishList === true ? (
              <StyledIsOnWishlist />
            ) : (
              <StyledAddToWishlist />
            )}
            <StyledTooltip>Add to wishlist</StyledTooltip>
          </Button>
        </Link>
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
        <HeadingTwo>{productName}</HeadingTwo>
        <HeadingTwo price>
          {productPrice} <span>$</span>
        </HeadingTwo>
      </StyledLink>

      <StyledAddToCartButtonContainer>
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <Button
            onClick={() => {
              handleDuplicateNamesOfProducts(productName, productPrice);
              addProductToCart(productName);
              // increaseCartCounter(productName);
            }}
          >
            <StyledAddToCart />
          </Button>
        </Link>
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
)(ProductsBestsellerElement);
