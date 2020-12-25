import React from "react";
import { connect } from "react-redux";
import Button from "../../reusableComponents/Button";
import { HeadingTwo } from "../../reusableComponents/Heading.js";
import { BsSearch } from "react-icons/bs";
import closeFilter from "../../assets/icons/closeFilterSvg.svg";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  productCategories,
  mineral,
  metal,
} from "../../localData/productCategories";
import { useSpring, animated } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import {
  removeFilterCategory,
  searchProductsBySearchInput,
  filterProductsByCategories,
  resetFilters,
} from "../../actions";
import {
  AnimatedNavbarWrapper,
  StyledCategoriesContainer,
  StyledCategories,
  StyledCategoryItem,
  StyledSearchInput,
  StyledForm,
  StyledSelectedCategoryContainer,
  StyledSelectedCategoryElement,
} from "./ProductsFilterMenuStyles";

const ProductsFilterMenu = ({
  removeFilterCategory,
  searchProductsBySearchInput,
  filterProductsByCategories,
  isProductMenuVisible,
  resetFilters,
  filterToRemove,
}) => {
  const screenSizeMobile = useMediaQuery("(max-width:576px)");

  const anim = useSpring({
    config: { duration: 500 },
    height: isProductMenuVisible
      ? screenSizeMobile
        ? "450px"
        : "280px"
      : "0px",
    opacity: isProductMenuVisible ? "1" : "0",
  });

  return (
    <animated.div style={anim}>
      <AnimatedNavbarWrapper>
        <StyledCategoriesContainer>
          <div>
            <HeadingTwo categoryName>Metal</HeadingTwo>
            <StyledCategories onClick={filterProductsByCategories}>
              {metal.map((item) => {
                return (
                  <StyledCategoryItem data-target={item} key={uuidv4()}>
                    {item}
                  </StyledCategoryItem>
                );
              })}
            </StyledCategories>
          </div>
          <div>
            <HeadingTwo categoryName>Mineral</HeadingTwo>
            <StyledCategories onClick={filterProductsByCategories}>
              {mineral.map((item) => {
                return (
                  <StyledCategoryItem data-target={item} key={uuidv4()}>
                    {item}
                  </StyledCategoryItem>
                );
              })}
            </StyledCategories>
          </div>
          <div>
            <HeadingTwo categoryName>Type</HeadingTwo>
            <StyledCategories onClick={filterProductsByCategories}>
              {productCategories.map((item) => {
                return (
                  <StyledCategoryItem data-target={item} key={uuidv4()}>
                    {item}
                  </StyledCategoryItem>
                );
              })}
            </StyledCategories>
          </div>
          <StyledForm onSubmit={searchProductsBySearchInput}>
            <StyledSearchInput
              type="text"
              name="search"
              placeholder="Search product"
              autoComplete="off"
              required
            />
            <Button search type="submit">
              <BsSearch />
            </Button>
          </StyledForm>
          <Button resetFilter onClick={resetFilters}>
            Reset Filters
          </Button>
          <StyledSelectedCategoryContainer>
            {filterToRemove.map((item) => {
              return (
                <StyledSelectedCategoryElement key={uuidv4()}>
                  <StyledCategoryItem selectedCategory>
                    {item}
                  </StyledCategoryItem>

                  <Button
                    closeFilter={closeFilter}
                    data-target={item}
                    onClick={removeFilterCategory}
                  ></Button>
                </StyledSelectedCategoryElement>
              );
            })}
          </StyledSelectedCategoryContainer>
        </StyledCategoriesContainer>
      </AnimatedNavbarWrapper>
    </animated.div>
  );
};
const mapStateToProps = (state) => {
  return {
    products: state.products,
    categoryFilter: state.categoryFilter,
    isProductMenuVisible: state.isProductMenuVisible,
    filterToRemove: state.filterToRemove,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    filterProductsByCategories: (e) => dispatch(filterProductsByCategories(e)),
    removeFilterCategory: (e) => dispatch(removeFilterCategory(e)),
    searchProductsBySearchInput: (e) =>
      dispatch(searchProductsBySearchInput(e)),
    resetFilters: () => {
      dispatch(resetFilters());
    },
    // toggleProductMenu: () => dispatch(toggleProductMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsFilterMenu);
