import React from "react";
import styled from "styled-components";
import Dropdown from "../../../shared/components/Dropdown.component";
import TextField from '@mui/material/TextField';

const Container = styled.div`
display: flex;
padding: 24px 0;
border-bottom: 2px solid lightgray;
margin: 24px;
`

const StyledText = styled.strong `
    padding-top: 20px;
    margin: 0px 10px; 
`


const LibraryFilters = ( {selectedGenre, handleGenreSelectChange, GENRE_ARRAY, handleAuthorChange} ) => {
    return (
       <Container>
          <Dropdown  
     handleGenreSelectChange={handleGenreSelectChange} 
     GENRE_ARRAY={GENRE_ARRAY} 
     selectedGenre={selectedGenre} 
     label={'Search by Genre'}
     /> 
     <StyledText>OR</StyledText>
     <TextField onChange={(e) => handleAuthorChange(e)} sx={{width:'125px'}} id="outlined-basic" label="Search by Author" variant="outlined" />
       </Container>
    );
};

export default LibraryFilters; 