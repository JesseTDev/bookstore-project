import React, { useState, useContext } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../../shared/components/Dropdown.component";
import Button from "../../shared/components/Button.component";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { GENRE_ARRAY } from "../library/LibraryPage.component";
import {
  getCurrentUser,
  updateUser,
} from "../../shared/utils/firebase";
import LoadingPage from "../library/components/Loading.page.component";
import SnackBar from "../../shared/components/Snackbar.component";
import { UserContext } from "../../shared/contexts/UserContext";


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;


const Account = () => {

  const {currentUser} = useContext(UserContext); 

  const [loading, setLoading] = useState(false);
  const [updateAccountSuccess, setUpdateAccountSuccess] = useState(false);
  const [formFields, setFormFields] = useState({
    displayName: "",
    favouriteGenre: "",
    DOB: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resp = await getCurrentUser();
      let updateUserInput = {
        displayName: formFields.displayName || currentUser.displayName,
        favouriteGenre: formFields.favouriteGenre || currentUser.favouriteGenre,
        DOB:
          dayjs(formFields.DOB.$d).format("DD/MM/YYYY") ||
          dayjs(currentUser.DOB).format("DD/MM/YYYY"),
      };
      await updateUser(resp.uid, updateUserInput);
      setLoading(false);
      setUpdateAccountSuccess(true);
    } catch (error) {
  
    }
  };

  if (!currentUser || loading) {
    return <LoadingPage loadingLabel="Account Data" />;
  }

  return (
    <>
      <FormContainer>
        <h3>Update Account Details</h3>
        <TextField
          label="Email"
          sx={{ marginBottom: "24px", width: "300px" }}
          defaultValue={currentUser?.email || ""}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          onChange={handleChange}
          name="displayName"
          sx={{ marginBottom: "24px", width: "300px" }}
          label="Display Name"
          type="text"
          variant="outlined"
          defaultValue={currentUser?.displayName || ""}
        />
        <Dropdown
          selectedGenre={formFields.favouriteGenre}
          defaultValue={currentUser.favouriteGenre}
          handleGenreSelectChange={handleChange}
          name="favouriteGenre"
          sx={{ marginBottom: "24px", width: "300px" }}
          label="Select Favourite Genre"
          GENRE_ARRAY={GENRE_ARRAY}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={
                formFields.DOB ||
                dayjs(new Date(currentUser.DOB)) ||
                dayjs(new Date())
              }
              onChange={(newValue) =>
                setFormFields({
                  ...formFields,
                  DOB: newValue,
                })
              }
              sx={{ marginBottom: "24px", width: "300px" }}
              label="Date of Birth"
            />
          </DemoContainer>
        </LocalizationProvider>
        <div>
        <Button type="submit" name="Submit" handleClick={handleSubmit} />
        </div>
      </FormContainer>
      <SnackBar
        open={updateAccountSuccess}
        setOpen={setUpdateAccountSuccess}
        snackbarLabel="Account succesfully updated!"
        snackbarType="success"
      />
    </>
  );
};

export default Account;
