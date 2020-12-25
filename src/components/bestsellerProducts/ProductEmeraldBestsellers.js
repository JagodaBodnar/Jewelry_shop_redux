import React from "react";
import ProductBestsellerElement from "./ProductBestsellerElement";
import { connect } from "react-redux";
import {
  StyledProductList,
  StyledProductItem,
} from "./ProductBestsellersStyles";

const ProductEmeraldBestseller = ({ emerald }) => {
  return (
    <StyledProductList>
      {emerald.map((product) => {
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
    emerald: state.emerald,
  };
};

export default connect(mapStateToProps)(ProductEmeraldBestseller);
