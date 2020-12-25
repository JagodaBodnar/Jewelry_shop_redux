import React from "react";
import ProductBestsellerElement from "./ProductBestsellerElement";
import { connect } from "react-redux";
import {
  StyledProductList,
  StyledProductItem,
} from "./ProductBestsellersStyles";

const ProductRubyBestseller = ({ ruby }) => {
  return (
    <StyledProductList>
      {ruby.map((product) => {
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
    ruby: state.ruby,
  };
};

export default connect(mapStateToProps)(ProductRubyBestseller);
