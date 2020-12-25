import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { clearCartCounter, setCartClosed, clearCart } from "../actions";
import { connect } from "react-redux";

const PaypalButton = ({
  setCartClosed,
  clearCartCounter,
  clearCart,
  cartTotal,
}) => {
  const onSuccess = (payment) => {
    console.log("Payment was succeeded!", payment);

    clearCart();
    setCartClosed();
    clearCartCounter();
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled", data);
  };

  const onError = (err) => {
    console.error("Error", err);
  };

  let env = "sandbox";
  let currency = "USD";

  const client = {
    sandbox: process.env.REACT_APP_SANDBOX_PAYPAL_ID,
    production: "YOUR-PRODUCTION-APP-ID",
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={cartTotal}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    cartTotal: state.cartTotal,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCartClosed: () => dispatch(setCartClosed()),
    clearCart: () => dispatch(clearCart()),
    clearCartCounter: () => dispatch(clearCartCounter()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaypalButton);
