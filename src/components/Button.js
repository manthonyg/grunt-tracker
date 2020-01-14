import React from "react";
import styled, { css } from "styled-components";
import Loader from "./Loader";

const StyledButton = styled.button`
  border: ${props => {
    if (props.secondary) return "none";
    return "2px solid #AEBD38";
  }};

  background-color: ${props => {
    if (props.secondary) return "#68829e";
    return "#fff";
  }};

  margin: 0.25rem 0.10rem;
  color: ${props => {
    if (props.secondary) return "#fff";
    return "#000";
  }};

  font-size: ${props => {
    if (props.big) return "20px";
    if (props.small) return "12px";
    return "16px";
  }};
  border-radius: 3px;
  outline: none;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #aebd38;
    color: #fff;
  }
`;
const Button = ({
  secondary,
  big,
  small,
  inverse,
  loading,
  children,
  ...props
}) => {
  return (
    <StyledButton
      secondary={secondary}
      small={small}
      big={big}
      inverse={inverse}
      {...props}
    >
      {loading ? <Loader small white /> : children}
    </StyledButton>
  );
};

export default Button;
