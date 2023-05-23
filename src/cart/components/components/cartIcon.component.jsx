import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as ShoppingIcon } from "../../../assets/shopping-bag.svg"; 
import { CartContext } from "../../../shared/contexts/CartContext";

const CartIconContainer = styled.div `
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  
    svg {
      width: 24px;
      height: 24px;
    }
    
`

const ItemCount = styled.span `
position: absolute;
font-size: 10px;
font-weight: bold;
bottom: 12px;
`

const CartIcon = () => {

    const {cartCount} = useContext(CartContext); 

    return (
<CartIconContainer>
<ShoppingIcon /> 
<ItemCount>
{cartCount}
</ItemCount>
</CartIconContainer>
    );

};

export default CartIcon; 