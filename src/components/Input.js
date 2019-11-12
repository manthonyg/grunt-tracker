import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
width: 100%;
margin: 0 auto;
`

const InputField = styled.input`
margin: 0 auto;
border: 1px solid #333333
width: 80vw;
min-width: 280px;
padding: 10px;
margin: 50px 10px 0px 10px;
border-radius: 2px;
:focus {
    border-top: none;
    border-left: none;
    border-right: none;
}
`

const HelperText = styled.p`
font-size: 10px;
color: #aaa;
align-text: left;
margin-left: 20px;
`

function Input(props) {
    return (
    <InputWrapper>
        <InputField {...props}>{props.children}</InputField>
        <HelperText>{props.helperText}</HelperText>
    </InputWrapper>
    
    )
}

export default Input