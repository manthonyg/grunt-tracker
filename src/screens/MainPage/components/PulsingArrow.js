import React from "react";
import styled, { keyframes } from "styled-components";

function PulsingArrow() {
  const Pulsate = keyframes`
    0% {
        transform: scale(0.9, 0.9);
        opacity: 0.0;
      }
      50% {
        opacity: 1.0;
      }
      100% {
        transform: scale(1.3, 1.3);
        opacity: 0;
      }
    `;

  const ArrowWrapper = styled.div`
    position: absolute;
    bottom: 80px;
    right: 40px;
    width: 60px;
    height: 60px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
    box-sizing: border-box;
  `;
  const ArrowBorder = styled.div`
    position: absolute;
    width: 60px;
    height: 60px;
    border: 2px solid black;
    border-radius: 50%;
  `;
  const ArrowDown = styled.div`
    position: absolute;
    box-sizing: border-box;
    bottom: 24px;
    width: 20px;
    height: 20px;
    border-top: 3px solid black;
    border-right: 3px solid black;
    right: 19px;
    -moz-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
  `;
  const Pulse = styled.div`
    border-radius: 50%;
    height: 56px;
    width: 56px;
    position: absolute;
    margin: 0;
    animation: ${Pulsate} 750ms ease-out;
    animation-iteration-count: infinite;
    opacity: 0;
    box-sizing: border-box;
    box-shadow: 0 0 3px 1px #aebd38;
    animation-delay: 2s;
  `;

  return (
    <ArrowWrapper>
      <ArrowBorder>
        <ArrowDown></ArrowDown>
        <Pulse></Pulse>
      </ArrowBorder>
    </ArrowWrapper>
  );
}

export default PulsingArrow;