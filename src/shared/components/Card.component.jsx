import React, {useContext, useState} from "react";
import styled from "styled-components";
import * as dayjs from 'dayjs'; 
import Rating from '@mui/material/Rating';
import Button from "./Button.component";
import { CartContext } from "../contexts/CartContext";
import SnackBar from "../../shared/components/Snackbar.component";


const CardContainer = styled.div`
  width: 100%;
  margin: 12px;
  display: flex;
  justify-content: center;
  transition: 0.3s ease;
  position: relative;
  &:hover {
    transform: translateY(-15px);
  }
  button {
    width: 100%;
    max-width: 250px;
    align-self: center;
    transition: 0.3s ease;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }
  }
`;

const InnerCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: pointer;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 30px;
  transition: 0.5s ease;
  width: 100%;
  max-width: 400px;
  height: 100%;
`;

const CardImage = styled.div`
  height: 300px;
  width: 200px;
  background-image: url(${(props) => props.imageURL});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h2`
  text-align: center;
  padding: 2px;
  font-size: 25px;
`;

const CardAuthor = styled.h3`
  text-align: center;
  font-size: 20px;
`;

const CardGenre = styled.p`
  text-align: center;
  font-size: 18px;
`;

const CardDate = styled.p`
  text-align: center;
  font-size: 15px;
`;

const CardRating = styled.div`
  text-align: center;
`;

const Card = ({ bookData }) => {
  const { title, imageLinks, authors, categories, publishedDate, averageRating
  } =
    bookData.volumeInfo;
    const { id } = bookData;

    const bookObj = {
      title,
      imageLinks,
      authors,
      categories,
      publishedDate,
      averageRating,
      id,
    };
 
    const [addedItemSuccess, setAddedItemSuccess] = useState(null); 

    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => {
      addItemToCart(bookObj); 
      setAddedItemSuccess(true); 
    }; 

  return (
    <>
      <CardContainer key={title}>
        <InnerCardContainer>
          <CardImage imageURL={imageLinks?.thumbnail} />
          <CardTitle> {title}</CardTitle>
          {authors && <CardAuthor>Author: {authors[0]}</CardAuthor>}
          {categories && <CardGenre>Genre: {categories}</CardGenre>}
          <CardDate>Date Published: {dayjs(publishedDate).format('YYYY')}</CardDate>
          <CardRating>
          {averageRating && <Rating name="read-only" value={averageRating} readOnly />}
          </CardRating>
          <Button handleClick={addProductToCart} name='Add To Cart' />
        </InnerCardContainer>
      </CardContainer>
      <SnackBar
      open={addedItemSuccess}
      setOpen={setAddedItemSuccess}
      snackbarLabel={`${title} added to cart`}
      snackbarType="success"
       /> 
    </>
  );
};

export default Card;
