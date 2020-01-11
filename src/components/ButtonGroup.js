import React from "react";
import styled, { css } from "styled-components";
import Loader from "./Loader";

const ButtonGroupWrapper = styled.div`
  display: inline-flex;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-grow: 1;
`;

const Button = styled.a`
  padding: 0.25em 0.5em;
  border: solid 1px red;
  border-radius: 4px;
  flex-grow: 1;
  display: inline-block;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: red;
    color: #fff;
  }
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
