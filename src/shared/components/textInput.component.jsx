import React from "react";
import styled, { css } from "styled-components";

const subColor = "grey";

const shrinkLabelStyles = css`
top: -14px;
font-size: 12px;
`;

export const FormInputLabel = styled.label`
color: ${subColor};
font-size: 16px;
font-weight: normal;
position: absolute;
pointer-events: none;
left: 5px;
top: 10px;
transition: 300ms ease all;
`;

export const Input = styled.input`
background: none;
background-color: white;
color: ${subColor};
font-size: 18px;
padding: 10px 10px 10px 5px;
display: block;
width: 100%;
border: none;
border-radius: 0;
border-bottom: 1px solid black;
margin: 25px 0;
&:focus {
outline: none;
}
&:focus ~ ${FormInputLabel} {
${shrinkLabelStyles};
}
`;

const TextInput = ( { type, placeholder, value, onChange, name } ) => {
    return (
        <Input type={type} placeholder={placeholder} value={value} onChange={onChange} name={name}/>
    );
};

export default TextInput; 