import React from 'react';
import styled from 'styled-components';
import Flex from '../components/Flex';
import {Link} from 'react-router-dom';
import {Toast, ToastHeader, ToastBody} from 'reactstrap';

const Tab = styled.div `
  padding: 2px;
  margin: 5px;
`;

const DeleteIcon = styled.div `
position: relative;
width: 100vw;
left: 0px;
top: 0px;
`

function ArrowTab(props) {
  return (
    <Tab>
    <Toast>
      <ToastHeader>
        <DeleteIcon>
          <i className="fa fa-remove" onClick={props.onClick} id={props.id}></i>
        </DeleteIcon>
      </ToastHeader>
      <Flex justifyAround alignCenter>

        <ToastBody>
          {props.children}
        </ToastBody>

        <Link to={props.link}>
          <i className="tabIcon fa fa-chevron-right" id={props.id}/>
        </Link>

      </Flex>

    </Toast>
    </Tab>

  )
}

export default ArrowTab