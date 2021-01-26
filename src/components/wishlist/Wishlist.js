import React from "react";
import Button from "../../reusableComponents/Button";
import { HeadingTwo } from "../../reusableComponents/Heading";
import { IoIosClose } from "react-icons/io";
import { connect } from "react-redux";
import {
  addProductToCart,
  addProductToWishlist,
  removeProductFromWishlist,
  toggleWishlistIcon,
} from "../../actions/index";
import {
  StyledEmptyWishlist,
  StyledWishlistContainer,
  StyledProductList,
  StyledProductItem,
  StyledRemoveFromListContainer,
  StyledAddToCartButtonContainer,
  StyledAddToCart,
  StyledProductImage,
  StyledLink,
  StyledProductListElement,
} from "./WishlistStyles";

const Wishlist = ({
  addProductToCart,
  removeProductFromWishlist,
  addProductToWishlist,
  products,
  wishlist,
}) => {
  const handleWishlist = (productName) => {
    products.map((item) => {
      if (item.productName === productName) {
        if (wishlist.length > 0 && item.wishList === true) {
          removeProductFromWishlist(productName);
          item.wishList = false;
        } else if (item.wishList === false) {
          console.log(productName);
          addProductToWishlist(productName);
          item.wishList = true;
        }
      }
    });
  };
  return (
    <>
      {wishlist.length === 0 ? (
        <StyledEmptyWishlist>
          <HeadingTwo>No products on your wishlist</HeadingTwo>
        </StyledEmptyWishlist>
      ) : (
        <StyledWishlistContainer>
          <StyledProductList>
            {wishlist.map((item) => {
              const {
                productName,
                productPrice,
                productQuantity,
                productImage,
                wishList,
              } = item;
              return (
                <>
                  <StyledProductItem key={productName}>
                    <StyledProductListElement>
                      <StyledRemoveFromListContainer>
                        <Button
                          close
                          onClick={() => handleWishlist(productName)}
                        >
                          <IoIosClose />
                        </Button>
                      </StyledRemoveFromListContainer>
                      <StyledLink
                        to={{
                          pathname: `/products/${productName}`,
                          state: {
                            productName,
                            productPrice,
                            productImage,
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
                        <HeadingTwo price>
                          {productPrice} <span>$</span>
                        </HeadingTwo>
                      </StyledLink>

                      <StyledAddToCartButtonContainer>
                        <Button
                          onClick={() => {
                            // handleDuplicateNamesOfProducts(
                            //   productName,
                            //   productPrice
                            // );
                            addProductToCart(productName);
                            // increaseCartCounter(productName);
                          }}
                        >
                          <StyledAddToCart />
                        </Button>
                      </StyledAddToCartButtonContainer>
                    </StyledProductListElement>
                  </StyledProductItem>
                </>
              );
            })}
          </StyledProductList>
        </StyledWishlistContainer>
      )}
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
    toggleWishlistIcon: () => dispatch(toggleWishlistIcon()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
