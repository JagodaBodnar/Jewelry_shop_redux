import React from "react";
import ProductBestsellerElement from "./ProductBestsellerElement";
import { connect } from "react-redux";
import {
  StyledProductList,
  StyledProductItem,
} from "./ProductBestsellersStyles";

const ProductBestsellers = ({ bestseller }) => {
  return (
    <StyledProductList>
      {bestseller.map((product) => {
        return (
          <StyledProductItem key={product.productName}>
            <ProductBestsellerElement {...product} />
          </StyledProductItem>
        );
      })}
    </StyledProductList>
  );
};
const mapStateToProps = (state) => {
  return {
    bestseller: state.bestseller,
  };
};

export default connect(mapStateToProps)(ProductBestsellers);
