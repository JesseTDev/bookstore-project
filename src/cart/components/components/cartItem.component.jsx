import React from "react";
import styled from "styled-components";

const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  img {
    width: 30%;
  }
`;

const ItemsDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;

  span {
    font-size: 12px;
  }
`;
export const returnRandomPrice = () => {
  return `$${Math.floor(Math.random() * (20 - 5)) + 5}`;
};

const CartItem = ({ item }) => {
  const { title, imageLinks } = item;

  return (
    <CartItemContainer>
      <img src={imageLinks.smallThumbnail} alt={`$product`} />
      <ItemsDetails>
        <span>{title}</span>
        <span>{returnRandomPrice()}</span>
      </ItemsDetails>
    </CartItemContainer>
  );
};

export default CartItem;
