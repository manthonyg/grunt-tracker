import React from "react";
import styled from "styled-components";

function Icon(props) {
  const StyledIcon = styled.i`
    color: ${props => {
      if (props.primary) return "#AEBD38";
      if (props.secondary) return "#68829e";
      if (props.success) return "green";
      if (props.warning) return "yellow";
      if (props.danger) return "red";
      return "#000";
    }};
  `;

  return (
    <StyledIcon
      secondary={props.secondary}
      primary={props.primary}
      success={props.success}
      warning={props.warning}
      danger={props.danger}
      className="material-icons"
    >
      {props.children}
    </StyledIcon>
  );
}

export default Icon;
