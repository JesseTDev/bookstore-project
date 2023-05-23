import React, { useState, useContext } from "react";
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Button from "../../shared/components/Button.component";
import { UserContext } from "../../shared/contexts/UserContext"; 
import LoadingPage from "../library/components/Loading.page.component";
import BasicModal from "../../shared/components/Dialog.component";
import { useNavigate } from "react-router-dom";
import CheckOutInfo from "./components/checkout-info.component";

const TitleContainer = styled.div `
  h1 {
    margin: 20px; 
  }
`

const CheckoutContainer = styled.div `
  display: flex;
  padding: 24px;
    
`

const StyleForm = styled.form `
    display: flex; 
    flex-direction: column; 
    width: 60%; 
`
const BtnContainer = styled.div `

  padding: 1rem;
  display: flex;
  button {
    background-color: green;
  }
`

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const onSubmit = (e) => {
        e.preventDefault(); 
      };  

      const navToLibrary = () => navigate('/library'); 

      const handleOpenDialog = () => {
            setOpen(true)
            return
        }; 


      if(!currentUser) {
        <LoadingPage /> 
      }; 


    return (
     <TitleContainer>
         <h1>Enter Card Details:</h1>
       <CheckoutContainer> 
 <StyleForm onSubmit={onSubmit}>
 {CHECK_OUT_FIELDS.map((field) => {
    return (
        <TextField key={field.name} onChange={handleChange} required
         defaultValue={field.name === 'name' ? currentUser?.displayName : ''} sx={{margin:'12px', width:'30%'}} label={field.placeHolder} variant="outlined"  name={field.name}/>
    )
 })}
 <BtnContainer>
 <Button handleClick={handleOpenDialog} type='submit' name={'Pay'} />
 </BtnContainer> 
 </StyleForm>
 <BasicModal navigationFunction={navToLibrary} open={open} setOpen={setOpen} title='Payment Successful!' bodyText={`Thanks, ${currentUser?.displayName} your books are on the way!`} /> 
 <CheckOutInfo /> 
       </CheckoutContainer>
       </TitleContainer>
    );
};

export default Checkout; 