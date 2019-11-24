import React from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex';
import { Link } from 'react-router-dom';
import { Toast, ToastHeader, ToastBody } from 'reactstrap';

const Tab = styled.div`
  padding: 2px;
  margin-top: 5px;
  overflow: hidden;
  background-color: #eee;
`;

const Heading = styled.h4`
color: #bbbbbb;
font-weight: 200;
font-size: 14px;
`

const DeleteIcon = styled.div`
position: relative;
width: 100vw;
left: 0px;
top: 0px;
`

function ArrowTab(props) {
    return (
      
        <Toast>
        <ToastHeader><DeleteIcon><i class="fa fa-remove" onClick={props.onClick} id={props.id}></i></DeleteIcon></ToastHeader>
            <Flex justifyAround alignCenter>

                <ToastBody><Heading>{props.children}</Heading></ToastBody>
                
                <Link to={props.link}>
                    <i className="tabIcon fa fa-chevron-right"  id={props.id} />
                </Link>
               
            </Flex> 
        
        </Toast>
     
    )
}

export default ArrowTab