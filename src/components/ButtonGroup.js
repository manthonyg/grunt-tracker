import React from "react";
import styled, { css } from "styled-components";
import Loader from "./Loader";
import Button from './Button';

const ButtonGroupWrapper = styled.div`
  display: inline-flex;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-grow: 1;
`;


const ButtonGroup = props => {
  return (
    <ButtonGroupWrapper>
      <Button>{props.buttonOne}</Button>
      <Button>{props.buttonTwo}</Button>
      <Button>{props.buttonThree}</Button>
    </ButtonGroupWrapper>
  );
};

export default ButtonGroup;
