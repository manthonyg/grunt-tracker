import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex';
import { Link } from 'react-router-dom';

const Tab = styled.div`
  padding: 2px;
  margin: 0px 10px;
  overflow: hidden;
`;

const Heading = styled.h4`
color: #bbbbbb;
font-weight: 200;
font-size: 14px;
`



function ArrowTab(props) {
    const squad = props.squad
    return (
        <Tab>
            <Flex justifyBetween alignCenter>
                <Heading>{props.children}</Heading> 
                <Link to={`/show-squad/${squad._id}`}>
                    <i className="fa fa-chevron-right"></i>
                </Link>
            </Flex> 
        </Tab>
    )
}

export default ArrowTab