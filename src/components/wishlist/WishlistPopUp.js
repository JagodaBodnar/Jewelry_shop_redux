import React from "react";
import { HeadingTwo } from "../../reusableComponents/Heading";
import Button from "../../reusableComponents/Button";
import { routes } from "../../routes";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import {
  StyledWishlistPopUpContainer,
  StyledWishlistPopUpOff,
  StyledWishlistPopUp,
  StyledOverflowContainer,
  StyledProductListElement,
  StyledLink,
  StyledProductImage,
  StyledGoToWishlist,
} from "./WishlistPopUpStyles";

const WishlistPopUp = ({ wishlist, openPopUp }) => {
  return (
    <>
      {openPopUp ? (
        <StyledWishlistPopUpContainer>
          <StyledWishlistPopUp>
            <StyledOverflowContainer>
              {wishlist.map((item) => {
                const {
                  productName,
                  productPrice,
                  productQuantity,
                  productDesc,
                  productImage,
                  wishList,
                } = item;
                return (
                  <StyledProductListElement key={uuidv4()}>
                    <StyledLink
                      to={{
                        pathname: `/products/${productName}`,
                        state: {
                          productName,
                          productPrice,
                          productImage,
                          productDesc,
                          productQuantity,
                          wishList,
                        },
                      }}
                    >
                      <StyledProductImage
                        src={productImage}
                        alt="product foto"
                      />
                      <HeadingTwo>{productName}</HeadingTwo>
                      <HeadingTwo>{productPrice}$</HeadingTwo>
                    </StyledLink>
                  </StyledProductListElement>
                );
              })}
              <StyledGoToWishlist to={routes.list}>
                <Button>Go to wishlist</Button>
              </StyledGoToWishlist>
            </StyledOverflowContainer>
          </StyledWishlistPopUp>
        </StyledWishlistPopUpContainer>
      ) : (
        <StyledWishlistPopUpContainer>
          <StyledWishlistPopUpOff></StyledWishlistPopUpOff>
        </StyledWishlistPopUpContainer>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
    openPopUp: state.openPopUp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPopUp);
