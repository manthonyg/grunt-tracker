import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex'

const Tab = styled.div`
  padding: 2px;
  margin: 0px 10px;
  border: 1px solid black;
  border-bottom: none;
  overflow: hidden;
`;

const Heading = styled.h4`
color: #bbbbbb;
font-weight: 200;
font-size: 14px;
`

function ArrowTab(props) {
    return (
        <Tab>
            <Flex justifyBetween alignCenter>
            <Heading>{props.children}</Heading> 
            
            <i className="fa fa-chevron-right"></i>
            </Flex> 
        </Tab>
    )
}

export default ArrowTab