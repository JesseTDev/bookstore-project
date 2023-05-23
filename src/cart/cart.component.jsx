import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartCard from "../cart/components/components/cartCard.component";
import Button from "../shared/components/Button.component";
import { CartContext } from "../shared/contexts/CartContext";
import { Link } from "react-router-dom";

const CheckoutContainer = styled.div`
  width: 80%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;

const BtnContainer = styled.div`
  margin-left: auto;
  padding: 1rem;
  display: flex;
  button {
    background-color: green;
  }
`;

const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

const Cart = () => {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  const checkOutHandler = () => {
    navigate({ pathname: "/checkout" });
  };

  return (
    <CheckoutContainer>
      {cartItems ? (
        <>
          {" "}
          <CheckoutHeader>
            <HeaderBlock>
              <span>Product</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Product Title</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Quantity</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Price</span>
            </HeaderBlock>
            <HeaderBlock>
              <span>Remove</span>
            </HeaderBlock>
          </CheckoutHeader>
          {cartItems.map((books) => {
            return <CartCard bookData={books} />;
          })}
          <BtnContainer>
            <Button handleClick={checkOutHandler} name={"Checkout"} />
          </BtnContainer>{" "}
        </>
      ) : (
        <span>
          Please add some books from the{" "}
          <Link to={"/library"}>Library Page</Link>
        </span>
      )}
    </CheckoutContainer>
  );
};

export default Cart;
