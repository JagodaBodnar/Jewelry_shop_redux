import React, { useState } from "react";
import Button from "../../reusableComponents/Button";
import { HeadingOne } from "../../reusableComponents/Heading";
import {
  StyledAddToWishlist,
  StyledButtonContainer,
  StyledDetailsContainer,
  StyledHeaderContainer,
  StyledImage,
  StyledImgContainer,
  StyledSingleProductContainer,
  StyledPriceParagraph,
  StyledIsOnWishlist,
  StyledProductDescription,
} from "./SingleProductStyles";
import { connect } from "react-redux";
import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
  handleDuplicateNamesOfProducts,
  openWishlistPopUp,
  closeWishlistPopUp,
} from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";

const SingleProduct = (props) => {
  const {
    productName,
    productImage,
    productPrice,
    productDesc,
    wishList,
  } = props.location.state;

  const [toggleWishlistLogo, setToggleWishlistLogo] = useState(wishList);
  const toggle = () => {
    setToggleWishlistLogo(!toggleWishlistLogo);
  };
  const products = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const handleWishlist = (productName) => {
    products.map((item) => {
      if (item.productName === productName) {
        if (wishlist.length > 0 && item.wishList === true) {
          item.wishList = false;
          dispatch(removeProductFromWishlist(productName));
        } else if (item.wishList === false) {
          item.wishList = true;
          dispatch(addProductToWishlist(productName));
        }
      }
    });
  };
  const closePopUp = () => {
    setTimeout(() => {
      dispatch(closeWishlistPopUp());
    }, 3000);
  };
  return (
    <>
      <StyledSingleProductContainer>
        <StyledImgContainer>
          <StyledImage src={productImage} alt="single product foto" />
        </StyledImgContainer>
        <StyledDetailsContainer>
          <StyledHeaderContainer>
            <HeadingOne singleProductHeader>{productName}</HeadingOne>
            <StyledPriceParagraph>{productPrice}$</StyledPriceParagraph>
          </StyledHeaderContainer>
          <StyledButtonContainer>
            <Button
              addToWishlist
              onClick={() => {
                handleWishlist(productName);
                toggle();
                dispatch(openWishlistPopUp());
                closePopUp();
              }}
            >
              {wishList ? (
                toggleWishlistLogo ? (
                  <StyledIsOnWishlist />
                ) : (
                  <StyledAddToWishlist />
                )
              ) : toggleWishlistLogo ? (
                <StyledIsOnWishlist />
              ) : (
                <StyledAddToWishlist />
              )}
            </Button>
            <Button
              addToCart
              onClick={() => {
                dispatch(handleDuplicateNamesOfProducts(productName));
                dispatch(addProductToCart(productName));
              }}
            >
              Add to cart
            </Button>
          </StyledButtonContainer>
          <StyledProductDescription>{productDesc}</StyledProductDescription>
        </StyledDetailsContainer>
      </StyledSingleProductContainer>
    </>
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
    addProductToWishlist: (product) => dispatch(addProductToWishlist(product)),
    removeProductFromWishlist: (product) =>
      dispatch(removeProductFromWishlist(product)),
    handleDuplicateNamesOfProducts: (product) =>
      dispatch(handleDuplicateNamesOfProducts(product)),
    openWishlistPopUp: () => dispatch(openWishlistPopUp()),
    closeWishlistPopUp: () => dispatch(closeWishlistPopUp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
