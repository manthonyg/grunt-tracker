import React from "react";
import styled from "styled-components";

const PillWrapper = styled.div`
  width: 5rem;
  height: 2rem;
  margin: 0.5rem;
  background-color: #aebd38;
  color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  text-transform: uppercase;
  border-radius: 10px;
`;

function Pill({ children }) {
  return <PillWrapper>{children}</PillWrapper>;
}

export default Pill;
