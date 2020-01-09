import styled from 'styled-components';
import React from 'react';

function Badge(props) {

const BadgeOuter = styled.div `
display: inline-block;
text-align: center;
font-size: 12px;
color: #AEBD38;
font-weight: 800;

`
  return (
    <BadgeOuter>
      {props.children}
    </BadgeOuter>

  )
}

export default Badge