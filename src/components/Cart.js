import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { HeadingTwo, HeadingOne } from "../reusableComponents/Heading";
import { IoIosClose, IoIosRemove, IoIosAdd } from "react-icons/io";
import Button from "../reusableComponents/Button";
import PaypalButton from "./PaypalButton";
import { v4 as uuidv4 } from "uuid";
import {
  increaseProductQuantity,
  removeProductFromCart,
  decreaseProductQuantity,
  setCartClosed,
} from "../actions";
import {
  useStyles,
  StyledCartWrapper,
  StyledModalContainer,
  StyledEmptyCartContainer,
  StyledCartHeader,
  StyledCartItemList,
  StyledCartItemElement,
  StyledCartItemImage,
  StyledProductQuantity,
  StyledTotalCart,
  StyledPayPal,
} from "./CartStyles";

const Cart = ({
  history,
  setCartClosed,
  isCartOpen,
  cart,
  removeProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
  cartTotal,
}) => {
  const classes = useStyles();

  return (
    <StyledCartWrapper>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isCartOpen}
        onClose={setCartClosed}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isCartOpen}>
          <StyledModalContainer className={classes.paper}>
            <StyledCartHeader>
              <HeadingOne cartheader>Cart</HeadingOne>
              <HeadingOne cartitemheader>Quantity</HeadingOne>
              <HeadingOne cartitemheader>Price</HeadingOne>
              <span></span>
              <HeadingOne cartitemheader>Sum</HeadingOne>
            </StyledCartHeader>
            {cart.length === 0 ? (
              <StyledEmptyCartContainer>
                <HeadingTwo>Your cart is empty</HeadingTwo>
              </StyledEmptyCartContainer>
            ) : (
              <>
                <StyledCartItemList>
                  {cart.map((item) => {
                    const {
                      productName,
                      productPrice,
                      productQuantity,
                      productImage,
                    } = item;
                    return (
                      <StyledCartItemElement key={uuidv4()}>
                        <StyledCartItemImage
                          src={productImage}
                          alt="product foto"
                        />
                        <HeadingTwo cartItemName>{productName}</HeadingTwo>
                        <HeadingTwo bold cartItemQuantity>
                          <Button
                            quantity
                            onClick={() => {
                              decreaseProductQuantity(
                                productName,
                                productQuantity
                              );
                            }}
                          >
                            <IoIosRemove />
                          </Button>
                          <StyledProductQuantity>
                            {productQuantity}
                          </StyledProductQuantity>
                          <Button
                            quantity
                            onClick={() => {
                              increaseProductQuantity(
                                productName,
                                productQuantity
                              );
                            }}
                          >
                            <IoIosAdd />
                          </Button>
                        </HeadingTwo>
                        <HeadingTwo bold>{productPrice}$</HeadingTwo>
                        <Button
                          close
                          onClick={() =>
                            removeProductFromCart(productName, productQuantity)
                          }
                        >
                          <IoIosClose />
                        </Button>
                        <HeadingTwo bold>
                          {productQuantity * productPrice}$
                        </HeadingTwo>
                      </StyledCartItemElement>
                    );
                  })}
                </StyledCartItemList>
                <StyledTotalCart>
                  <HeadingOne totalSum>TOTAL </HeadingOne>
                  <HeadingTwo totalSum bold>
                    {cartTotal}$
                  </HeadingTwo>
                </StyledTotalCart>
                <StyledPayPal>
                  <PaypalButton history={history} />
                </StyledPayPal>
              </>
            )}
          </StyledModalContainer>
        </Fade>
      </Modal>
    </StyledCartWrapper>
  );
};
const mapStateToProps = (state) => {
  return {
    isCartOpen: state.isCartOpen,
    cart: state.cart,
    cartTotal: state.cartTotal,
    cartCounter: state.cartCounter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCartClosed: () => dispatch(setCartClosed()),
    removeProductFromCart: (productName, productQuantity) =>
      dispatch(removeProductFromCart(productName, productQuantity)),
    increaseProductQuantity: (product) =>
      dispatch(increaseProductQuantity(product)),
    decreaseProductQuantity: (productName, productQuantity) =>
      dispatch(decreaseProductQuantity(productName, productQuantity)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
