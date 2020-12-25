import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import MainTemplate from "./templates/MainTemplate";
import { connect } from "react-redux";
import { fetchProducts, handleCalculateCartTotals } from "./actions";
import { client } from "./data/contentfulData";
import Router from "./routing/Router";
import { setBestsellers } from "./actions/index";

const App = ({
  fetchProducts,
  setBestsellers,
  cart,
  cartCounter,
  handleCalculateCartTotals,
}) => {
  const setContentfulData = (data) => {
    if (data.length !== 0) {
      let products = data.map((item) => {
        const image = item.fields.productImage.fields.file.url;
        const category = item.fields.categories;
        const categories = Object.values(category);
        const product = { ...item.fields, categories };
        product.productImage = image;
        return product;
      });
      fetchProducts(products);
      setBestsellers();
    }
  };

  const getContentfulData = () => {
    client
      .getEntries({
        content_type: "jewelryShop",
      })
      .then((response) => {
        setContentfulData(response.items);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getContentfulData();
  }, []);

  useEffect(() => {
    handleCalculateCartTotals();
  }, [cart, cartCounter]);

  return (
    <BrowserRouter>
      <MainTemplate>
        <Router />
      </MainTemplate>
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
    bestseller: state.bestseller,
    emerald: state.emerald,
    cart: state.cart,
    cartCounter: state.cartCounter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (response) => dispatch(fetchProducts(response)),
    setBestsellers: () => dispatch(setBestsellers()),
    handleCalculateCartTotals: () => dispatch(handleCalculateCartTotals()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
