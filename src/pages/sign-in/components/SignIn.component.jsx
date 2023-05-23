import React, { useState } from "react";
import TextInput from "../../../shared/components/textInput.component";
import Button from "../../../shared/components/Button.component";
import { signInAuthUserWithEmailAndPassword } from "../../../shared/utils/firebase"; 
import { useNavigate } from "react-router-dom";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SIGN_IN_FIELDS = [
  { name: "email", placeHolder: "Email", type: "text" },
  { name: "password", placeHolder: "Password", type: "password" },
];

const SignInForm = () => {
  const [signIn, setSignIn] = useState(defaultSignInFormFields); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignIn({ ...signIn, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();  
    try {
          await signInAuthUserWithEmailAndPassword(
        signIn.email,
        signIn.password
      );

     navigateToLibrary(); 
  } catch (error)  {
  console.log(error); 
  } 

  window.location.reload(); 
}; 


  const navigateToLibrary = () => {
    navigate({pathname:"/library", search: "?fromAuth=true"}); 
  };

  return (
    <form>
    <h2>Sign In</h2>
    {SIGN_IN_FIELDS.map((field) => {
      return (
        <TextInput
        key={field.name}
        onChange={handleChange}
        name={field.name}
        type={field.type}
        placeholder={field.placeHolder}
        value={signIn[field.name]}
      />
      )
    })}
     <Button handleClick={handleSubmit} type="submit" name={"Sign In"} /> 
    </form>
  );
    };


export default SignInForm;
