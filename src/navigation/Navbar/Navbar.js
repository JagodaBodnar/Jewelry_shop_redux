import React, { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import cartIcon from "../../assets/icons/shoppingCartSvg.svg";
import Button from "../../reusableComponents/Button";
import { GiCutDiamond } from "react-icons/gi";
import HamburgerNavigation from "./HamburgerMenu";
import WishlistPopUp from "../../components/wishlist/WishlistPopUp";
import { connect } from "react-redux";
import { setCartOpen } from "../../actions/index";
import {
  StyledNav,
  StyledUl,
  StyledLi,
  StyledLink,
  StyledSpan,
  StyledLogoContainer,
  StyledAddToWishlist,
  StyledHamburgerMenu,
  StyledRoutes,
  StyledNavigation,
} from "./NavbarStyles";

const Navbar = ({ cartCounter, setCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledNav>
        <StyledUl>
          <StyledLogoContainer>
            <GiCutDiamond />
          </StyledLogoContainer>
          <StyledRoutes>
            <StyledLi>
              <StyledLink to={routes.home}>Home</StyledLink>
            </StyledLi>

            <StyledLi>
              <StyledLink to={routes.products}>Products</StyledLink>
            </StyledLi>

            <StyledLi>
              <StyledLink to={routes.contact}>Contact</StyledLink>
            </StyledLi>
          </StyledRoutes>
          <StyledLi>
            <StyledHamburgerMenu
              isOpen={isOpen}
              menuClicked={handleClick}
              width={18}
              height={15}
              strokeWidth={1}
              rotate={0}
              color="grey"
              borderRadius={0}
              animationDuration={0.5}
            />
            <Link to={routes.list}>
              <Button wishlist>
                <StyledAddToWishlist></StyledAddToWishlist>
              </Button>
            </Link>
            <Button cartIcon={cartIcon} onClick={setCartOpen}>
              <StyledSpan>{cartCounter}</StyledSpan>
            </Button>
          </StyledLi>
        </StyledUl>
        <StyledNavigation isOpen={isOpen}>
          {isOpen === true ? <HamburgerNavigation /> : ""}
        </StyledNavigation>
        <WishlistPopUp />
      </StyledNav>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartCounter: state.cartCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCartOpen: () => dispatch(setCartOpen()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
