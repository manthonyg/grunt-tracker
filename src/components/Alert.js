import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";

function CustomAlert(props) {
  const StyledAlert = styled(Alert)`

background-color: ${props => {
    if (props.success) return "#fff !important";
    if (props.info) return "#fff !important";
    if (props.danger) return "#fff !important";
    return "";
  }} 
color: ${props => {
    if (props.success) return "#505160 !important";
    if (props.info) return "#AEBD38 !important";
    if (props.danger) return "#B11112 !important";
    return "";
  }} 
border: ${props => {
    if (props.success) return "#AEBD38 !important";
    if (props.info) return "#05668d !important";
    if (props.danger) return "#B11112 !important";
    return "";
  }} 

  z-index: 100000 !important;
  position: absolute !important;
  top: 50% !important;
  width: 100vw !important;
  border: #aebd38 4px solid !important;
  background-color: #fff !important;
  color: #05668d !important;
`;

  return (
    <StyledAlert
      success={props.success}
      info={props.info}
      danger={props.danger}
    >
      {props.children}
    </StyledAlert>
  );
}

export default Alert;
