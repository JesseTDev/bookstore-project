import React, { useState, useContext } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from "../../shared/components/Button.component";
import { UserContext } from "../../shared/contexts/UserContext"; 
import LoadingPage from "../library/components/Loading.page.component";
import BasicModal from "../../shared/components/Dialog.component";
import { useNavigate } from "react-router-dom";
import CheckOutInfo from "./components/checkout-info.component";
import { CartContext } from "../../shared/contexts/CartContext";

const TitleContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const CheckoutContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
`;

const StyleForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  button {
    background-color: green;
  }
`;

const CHECK_OUT_FIELDS = [
    {
     name: 'name',
     placeHolder: 'Name',
    },
    {
    name: 'cardNumber',
    placeHolder: 'Card Number'
    },
    {
    name: 'expirydate',
    placeHolder: 'Expiry Date'
    },
    {
    name: 'cvc',
    placeHolder: 'CVC'
    }
];


const Checkout = () => {
    const {cartItems} = useContext(CartContext); 
    const {currentUser } = useContext(UserContext);
    const navigate = useNavigate(); 

    const defaultFormFields = {
        name: currentUser?.displayName,
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [open, setOpen] = useState(false); 
    const [failedPay, setFailedPay] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const onSubmit = (e) => {
        e.preventDefault(); 
      };  

      const navToLibrary = () => navigate('/library'); 

      const handleOpenDialog = () => {
            setOpen(true);
            if(cartItems.length === 0) {
              setFailedPay(true);
              setOpen(false);
            } 
            return
        }; 


      if(!currentUser) {
        <LoadingPage /> 
      }; 


    return (
     <TitleContainer>
       <CheckoutContainer> 
    <StyleForm onSubmit={onSubmit}>
    <h1>Enter Card Details:</h1>
      {CHECK_OUT_FIELDS.map((field) => {
    return (
        <TextField key={field.name} onChange={handleChange} required
         defaultValue={field.name === 'name' ? currentUser?.displayName : ''} sx={{ margin: "12px", width: "50%" }} label={field.placeHolder} variant="outlined"  name={field.name}/>
    )
 })}
 <BtnContainer>
 <Button handleClick={handleOpenDialog} type='submit' name={'Pay'} />
 </BtnContainer> 
 </StyleForm>
 {failedPay ? <h2>There are 0 books in your cart! Add a book to continue.</h2>  : <BasicModal navigationFunction={navToLibrary} open={open} setOpen={setOpen} title='Payment Successful!' bodyText={`Thanks, ${currentUser?.displayName} your books are on the way!`} />}
 {cartItems.length === 0 ? '' : <CheckOutInfo />}
       </CheckoutContainer>
       </TitleContainer>
    );
};

export default Checkout; 