import styled from "styled-components";
import React from "react";

function Badge(props) {
  const BadgeOuter = styled.div`
    display: inline-block;
    text-align: center;
    font-size: 12px;
    margin-left: 1rem;
    color: #05668d;
    font-weight: 800;
  `;
  return <BadgeOuter>{props.children}</BadgeOuter>;
}

export default Badge;
