import React, { useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { returnRandomPrice } from "./cartItem.component";
import { CartContext } from "../../../shared/contexts/CartContext";

const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  max-height: 450px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 200px;
  }
`;

const BaseSpan = styled.span`
  width: 23%;
`;

const Quantity = styled(BaseSpan)`
  display: flex;
`;

const Arrow = styled.div`
  cursor: pointer;
`;

const Value = styled.span`
  margin: 0 10px;
`;

const RemoveButton = styled.button`
  cursor: pointer;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 2em;
  align-self: center;
  color: white;
  background-color: #eb4a4a;
  transition: 0.3s ease;
  &:hover {
    background-color: #ff5959;
  }
  &:active {
    background-color: #f32727;
  }
`;

const CartCard = ({ bookData }) => {
  const { title, imageLinks } = bookData;
  const { addItemToCart, clearItemFromCart, removeItemToCart } =
    useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(bookData);
  const addItemHandler = () => addItemToCart(bookData);
  const removeItemHandler = () => removeItemToCart(bookData);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageLinks.smallThumbnail} alt={`${bookData.title}`} />
      </ImageContainer>
      <BaseSpan> {title} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{bookData.quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {returnRandomPrice()}</BaseSpan>
      <RemoveButton>
        <FontAwesomeIcon icon={faTrash} onClick={clearItemHandler} />
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CartCard;
