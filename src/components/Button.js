import React from "react";
import styled, { css } from "styled-components";
import Loader from "./Loader";
//Media
import Plus from "../images/plus.svg";

const StyledButton = styled.button`
  border: ${props => {
    if (props.secondary) return "2px solid white";
    if (props.inverted) return "2px solid #AEBD38";
    if (props.danger) return "2px solid red";
    if (props.noBorder) return "none";
    return "2px solid #AEBD38";
  }};

  background-color: ${props => {
    if (props.secondary) return "#68829e";
    if (props.inverted) return "#68829e";
    return "#fff";
  }};

  border-radius: ${props => {
    if (props.circular) return "100%";
    return "0";
  }}

  margin: ${props => {
    if (props.noMargin) return "0";
    return "0.35rem 0.3rem";
  }}
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
  circular,
  loading,
  children,
  inverted,
  noMargin,
  noBorder,
  danger,
  ...props
}) => {
  return (
    <StyledButton
      secondary={secondary}
      small={small}
      big={big}
      circular={circular}
      danger={danger}
      noMargin={noMargin}
      noBorder={noBorder}
      inverted={inverted}
      {...props}
    >
      {loading ? <Loader small white /> : children}
    </StyledButton>
  );
};

export default Button;
