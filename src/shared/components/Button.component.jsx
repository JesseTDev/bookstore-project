import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: #2d7ab2;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  transition: 0.5s ease;
  justify-content: center;
  &:hover {
    background-color: white;
    color: #434343;
    border: 1px solid #2d7ab2;
  }
`;

const Button = ({ name, handleClick }) => {
  return <StyledButton onClick={handleClick}>{name}</StyledButton>;
};

export default Button;
