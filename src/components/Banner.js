import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  overflow: auto;
  float: center;
  margin-top: ${props => {
    if (props.header) return "3rem";
    return "1rem";
  }};
`;
const Header = styled.h4`
font-weight: ${props => {
  if (props.secondary) return "400";
  if (props.small) return "400";
  if (props.white) return "300";
  return "100";
}}
color: ${props => {
  if (props.white) return "#fff";
  if (props.green) return "#aebd38";
  if (props.dark) return "#505160";
  return "#05668D";
}};
text-transform: uppercase;
border-bottom: ${props => {
  if (props.secondary) return "none";
  if (props.header) return "none";
  return "none";
}}
font-size: ${props => {
  if (props.secondary) return "28px";
  if (props.small) return "14px";
  return "28px";
}}

`;

const Banner = props => {
  return (
    <Wrapper header={props.header}>
      <Header
        header={props.header}
        white={props.white}
        green={props.green}
        dark={props.dark}
        small={props.small}
        secondary={props.secondary}
      >
        {props.children}
      </Header>
    </Wrapper>
  );
};

export default Banner;
