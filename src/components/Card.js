import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Flex from "../components/Flex";
import { Link } from "react-router-dom";

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
`;

const primaryCss = css`
  background-color: #fff;
  color: #000;
  border: 2px solid #aebd38;
`;

const toastCss = css`
  background-color: #fff;
  color: #000;
  border: 2px solid #aebd38;
`;

const CardButtonWrapper = styled.div`
width: 100%;
height: 20px;
position: absolute:
border: 1px solid black;
`;

const StyledCard = styled.div`
    width: ${props => (props.big ? "450px" : "300px")};
    padding: 15px;
    opacity: 0;
    transform: translateY(50px);
    transition: 500ms all ease-in-out;
    margin: ${props => (props.noMargin ? 0 : "15px")};
    ${props => props.animated && animatedCss}
    ${props => props.primary && primaryCss}
    ${props => props.toast && toastCss}
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
      primary={props.primary}
      toast={props.toast}
      handleClose={props.handleClose}
      id={props.id}
    >
      {props.children}
      {props.toast && (
        <CardButtonWrapper>
          <Flex justifyBetween>
            <i
              className="material-icons"
              id={props.id}
              onClick={props.handleClose}
            >
              close
            </i>
            <Link to={props.link}>
              <i className="material-icons">arrow_right_alt</i>
            </Link>
          </Flex>
        </CardButtonWrapper>
      )}
    </StyledCard>
  );
}

export default Card;
