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
    right: 34px;
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
    animation: ${Pulsate} 750ms ease-out infinite;
    border-radius: 50%;
  `;
  const ArrowDown = styled.div`
    position: absolute;
    box-sizing: border-box;
    bottom: 26px;
    width: 20px;
    height: 20px;
    border-top: 5px solid #68829e;
    border-right: 5px solid #68829e;
    right: 14px;
    -moz-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    transform: rotate(135deg);
  `;

  return (
    <ArrowWrapper>
      <ArrowBorder>
        <ArrowDown></ArrowDown>
      </ArrowBorder>
    </ArrowWrapper>
  );
}

export default PulsingArrow;
