import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Flex from "../components/Flex";
import { Link } from "react-router-dom";
//Media
import AngleR from "../images/angle-right-solid.svg";
import Plus from "../images/plus.svg";
//Global components
import Button from "./Button";

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
  display: block;
`;

const primaryCss = css`
  background-color: #fff;
  color: #000;
  padding: 15px;
  border: 7px solid #aebd38;
  display: block;
`;

const invertedCss = css`
  background-color: #505160;
  color: #fff;
  padding: 15px;
  border: 2px solid #505160;
  display: block;
`;

const toastCss = css`
  background-color: #fff;
  color: #000;
  padding: 15px;
  border: 2px solid #aebd38;
  display: block;
`;

const selectedCss = css`
  background-color: #fff;
  color: #000;
  padding: none;
  margin: none;
  display: block;
  border: 2px solid #aebd38;
  transition: 0ms all ease-in-out;
`;

const CardButtonWrapper = styled.div`
width: 100%;
height: 20px;
position: absolute:
border: 1px solid black;
`;

const StyledCard = styled.div`
    width: ${props => (props.big ? "450px" : "300px")};
    display: none;
    opacity: 0;
    transform: translateY(50px);
    transition: 200ms all ease-in-out;
    margin: ${props => (props.noMargin ? 0 : "15px")};
    ${props => props.animated && animatedCss}
    ${props => props.primary && primaryCss}
    ${props => props.toast && toastCss}
    ${props => props.selected && selectedCss}
    ${props => props.inverted && invertedCss}
`;
function Card(props) {
  const [animated, setAnimated] = useState(false);
  const handleSetAnimated = () => setAnimated(!animated);

  useEffect(() => {
    setTimeout(() => {
      handleSetAnimated();
    }, props.delay);
  }, []);

  return (
    <StyledCard
      animated={animated}
      big={props.big}
      noAnimation={props.noAnimation}
      noMargin={props.noMargin}
      delay={props.delay}
      selected={props.selected}
      primary={props.primary}
      inverted={props.inverted}
      toast={props.toast}
      shadow={props.shadow}
      handleClose={props.handleClose}
      id={props.id}
    >
      {props.children}

      {props.toast && (
        <CardButtonWrapper>
          <Flex justifyAround>
            <Button
              circular
              src={Plus}
              id={props.id}
              onClick={props.handleClose}
              style={{ left: "0", width: "2rem" }}
            >
              <img
                src={Plus}
                style={{ transform: "rotate(45deg)", width: "1.5rem" }}
              />
            </Button>
            {/* <img
              src={Plus}
              id={props.id}
              onClick={props.handleClose}
              style={{ width: "1rem", transform: "rotate(45deg)" }}
            /> */}

            {/* <img src={AngleR} style={{ width: "1.75rem" }} /> */}
            <Button>
              <Link to={props.link}>View</Link>
            </Button>
          </Flex>
        </CardButtonWrapper>
      )}
    </StyledCard>
  );
}

export default Card;
