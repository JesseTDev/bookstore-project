import React, { useState } from "react";
import TextInput from "../../../shared/components/textInput.component";
import Button from "../../../shared/components/Button.component";
import { createUser, createAuthUserWithEmailAndPassword } from "../../../shared/utils/firebase";
import SnackBar from "../../../shared/components/Snackbar.component";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SIGN_UP_FIELDS = [
  { name: "displayName", placeHolder: "Display Name", type: "text" },
  { name: "email", placeHolder: "Email", type: "text" },
  { name: "password", placeHolder: "Password", type: "password" },
  {
    name: "confirmPassword",
    placeHolder: "Confirm Password",
    type: "password",
  },
];

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const navigateToLibrary = () => {
    navigate({pathname:"/library", search: "?fromAuth=true"}); 
  };

  const handleSubmit = async () => {
    if(formFields.password !== formFields.confirmPassword) {
        setPasswordsDoNotMatch(true);  
        return
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        formFields.email,
        formFields.password
      );
      await createUser(user, {
        displayName: formFields.displayName,
      })
      navigateToLibrary();
    }
     catch (error) {console.log(error)}
  
  };
  
  
  return (
    <>
      <h2>Sign Up</h2>
      {SIGN_UP_FIELDS.map((field) => {
        return (
          <TextInput
            key={field.name}
            onChange={handleChange}
            name={field.name}
            type={field.type}
            placeholder={field.placeHolder}
            value={formFields[field.name]}
          />
        );
      })}
      <Button handleClick={handleSubmit} type="submit" name={"submit"} />
      <SnackBar
       open={passwordsDoNotMatch}
       setOpen={setPasswordsDoNotMatch}
       snackbarLabel="Passwords Do Not Match!"
       snackbarType="error"
        /> 
    </>
  );
};

export default SignUpForm;