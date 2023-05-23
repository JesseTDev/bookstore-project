import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

const LoadingContainer = styled.div `
    display: flex;
    justify-content: center;
    height: 83vh;
    align-items: center;
    p {
        font-size: 25px;
        padding: 10px;
    }
`


const LoadingPage = ({ loadingLabel }) => {
    return (
        <LoadingContainer>
     <CircularProgress />
        <p>Loading {loadingLabel}...</p>
        </LoadingContainer>
    );
};

export default LoadingPage; 