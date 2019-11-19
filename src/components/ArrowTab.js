import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex';
import { Link } from 'react-router-dom';
import LineBreak from '../components/LineBreak'
import styles from '../App.css'

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
    return (
        
        <Tab>
            <LineBreak/>
            <Flex justifyAround alignCenter>
                <Heading>{props.children}</Heading> 
                
                <Link to={props.link}>
                    <i className="tabIcon fa fa-chevron-right"  id={props.id} />
                </Link>
               
            </Flex> 
        </Tab>
    )
}

export default ArrowTab