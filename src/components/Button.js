import React from "react";
import styled, { css } from "styled-components";
import Loader from "./Loader";

const StyledButton = styled.button`
  border: ${props => {
    if (props.secondary) return "none";
    if (props.inverted) return "none";
    return "2px solid #AEBD38";
  }};

  background-color: ${props => {
    if (props.secondary) return "#68829e";
    if (props.inverted) return "#68829e";
    return "#fff";
  }};

  margin: 0.35rem 0.3rem;
  color: ${props => {
    if (props.secondary) return "#fff";
    if (props.inverted) return "#fff";
    return "#000";
  }};

  font-size: ${props => {
    if (props.big) return "20px";
    if (props.small) return "12px";
    return "16px";
  }};
  border-radius: 3px;
  outline: none;
  padding: 0.5rem;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 200;
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
  inverted,
  ...props
}) => {
  return (
    <StyledButton
      secondary={secondary}
      small={small}
      big={big}
      inverted={inverted}
      {...props}
    >
      {loading ? <Loader small white /> : children}
    </StyledButton>
  );
};

export default Button;
