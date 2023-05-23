import React, { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../contexts/UserContext";
import CartIcon from "../../cart/components/components/cartIcon.component";
import CartDropdown from "../../cart/components/components/cartDropdown.component";
import { CartContext } from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faSignOut, faSignIn } from "@fortawesome/free-solid-svg-icons";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Divider = styled.div`
  border-bottom: 2px solid lightgray;
  margin: 24px;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  padding: 25px;
`;

export const NavLinks = styled.div`
  display: flex;
  padding-top: 24px;
  font-size: 16px;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px; 
  text-decoration: none;
  color: rgb(52, 52, 52); 
  cursor: pointer;
`;

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const {isCartOpen, setIsCartOpen} = useContext(CartContext); 

  const signOutUser = () => {
    setCurrentUser(null);
  }; 

  const toggleOpenCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
        {currentUser && currentUser.displayName && (
          <NavLink>
            <strong>Welcome {currentUser.displayName}</strong>
          </NavLink>
        )}
         {currentUser !== null ? (
  <NavLink onClick={signOutUser} to="/">
    <FontAwesomeIcon icon={faSignOut} /> Sign Out
  </NavLink>
) : (
  <NavLink to="/">
    <FontAwesomeIcon icon={faSignIn} /> Sign In
  </NavLink>
)}
          <NavLink to="/library"><FontAwesomeIcon icon={faBook} /> Library</NavLink>

          <NavLink to="/account"><FontAwesomeIcon icon={faUser} /> Account</NavLink>

          {currentUser && <NavLink to="/account"><FontAwesomeIcon icon={faUser} /> Account</NavLink>}

          <span onClick={toggleOpenCart}><NavLink><CartIcon /></NavLink></span>
        </NavLinks>
      {isCartOpen && <CartDropdown setCartisOpen={setIsCartOpen}  /> }
      </NavigationContainer>
      <Divider />
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
