import React, { useContext } from "react";
import styled from "styled-components";
import CartItem from "./cartItem.component";
import Button from "../../../shared/components/Button.component";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../../shared/contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const DropdownContainer = styled.div `
position: absolute;
width: 240px;
height: 250px;
display: flex;
flex-direction: column;
padding: 20px;
border: 1px solid black;
background-color: white;
top: 70px;
right: 40px;
border-radius: 8px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
z-index: 5;
button {
    width: 50%;
    align-self: center;
}
`

const InnerContainer = styled.div `
height: 240px;
display: flex;
flex-direction: column;
overflow: scroll;
h3 {
    text-align: center; 
}
`


const CartDropdown = ( {setCartisOpen} ) => {

    const navigate = useNavigate(); 
    
    const {cartItems} = useContext(CartContext); 

    const navigateToCart = () => {
        navigate('/cart');
        setCartisOpen(false);
    }; 


    return (
<DropdownContainer>
<InnerContainer>
    <h3>Cart <FontAwesomeIcon icon={faCartShopping} /></h3>
{cartItems.length ? cartItems.map((cartItem) => {return (<CartItem item={cartItem} />)}) : <span>Please add some books from the <Link to={'/library'}>Library Page</Link></span>}
</InnerContainer>
<Button handleClick={navigateToCart} name={'TO CART'} /> 
</DropdownContainer>
    );
};

export default CartDropdown; 