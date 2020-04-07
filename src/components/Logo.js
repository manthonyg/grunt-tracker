import React from "react";
//Packages
import styled, { keyframes, css } from "styled-components";
// Media

import GTBG from "../images/GT_Bg.png";
import { device } from "../constants/mediaQueries";
//Global components
import Flex from "./Flex";

const jump = keyframes` {
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0) rotate(10deg); }
  30%  { transform: scale(.9,1.1)   translateY(-40px) rotate(-15deg) }
  50%  { transform: scale(1.05,.95) translateY(0)   }
  57%  { transform: scale(1,1)      translateY(-7px) }
  100%  { transform: scale(1,1)      translateY(0)  }
}
    `;

const jumpEffect = css`
   animation: ${jump} 1000ms ease-out
   animation-iteration-count: 3`;

const slide = keyframes`
{
  0% { background-position: 45% -100px}
  100% {background-posiiton: 50%}
}
`;
const slideEffect = css`
  animation: ${slide} 3s linear forwards;
`;

const LogoWrapper = styled.div`
position: relative;
top: 2rem;
text-align: center;
}`;

function Logo({ size, inverted }) {
  return (
    <img
      alt="Grunt Tracker"
      style={
        inverted
          ? {
              width: `${size}em`,
              transform: `rotateY(180deg)`
            }
          : { width: `${size}em` }
      }
    />
  );
}

export default Logo;
