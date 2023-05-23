import React, {useContext} from "react";
import styled from "styled-components";
import { CartContext } from "../../../shared/contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { returnRandomPrice } from "../../../cart/components/components/cartItem.component";

const InfoContainer = styled.div `
    display: flex;
    align-items: center; 
    flex-direction: column; 
   width: 100%;
    h1 {
        font-size: 30px;
        margin-bottom: 2rem; 
        color: #2ab738;
    }
`

const InnerContainer = styled.div `
    display: flex;
    width: 550px;
    height: 650px; 
    text-align: center;  
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    flex-direction: column; 
    overflow: scroll; 
`

const BooksInCartContainer = styled.div `
    margin: 1rem; 
    width: 340px;
    border-radius: 10px; 
    padding: 10px;
    align-self: center; 
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`
const CheckOutInfo = () => {


    const {cartItems, cartCount} = useContext(CartContext); 

    return (
        <InfoContainer>
             <h1>{cartCount} Books in CheckOut Cart <FontAwesomeIcon icon={faShoppingCart} /></h1>
            <InnerContainer>
         {cartItems.map((books) => {
            return (
                <BooksInCartContainer>
                 <img src={books.imageLinks.smallThumbnail} alt={`$product`}/> 
                <h2>Book Title {books.title}</h2>
                <h3>Book Category: {books.categories}</h3>
                <h4>Price: {returnRandomPrice()}</h4>

               </BooksInCartContainer>
            )
         })}

         </InnerContainer>
        </InfoContainer>
    );
}; 

export default CheckOutInfo; 