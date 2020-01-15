import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";

function CustomAlert(props) {
  const StyledAlert = styled(Alert)`

background-color: ${props => {
    if (props.success) return "#AEBD38 !important";
    if (props.warning) return "#505160 !important";
    if (props.danger) return "#505160 !important";
    return "";
  }} 
color: ${props => {
    if (props.success) return "#505160 !important";
    if (props.warning) return "#AEBD38 !important";
    if (props.danger) return "#B11 !important";
    return "";
  }} 
`;
  return (
    <StyledAlert
      success={props.success}
      warning={props.warning}
      danger={props.danger}
    >
      {props.children}
    </StyledAlert>
  );
}

export default Alert
