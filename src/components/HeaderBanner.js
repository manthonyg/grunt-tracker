import React from 'react';
import styled from 'styled-components';
import Heading from '../components/Heading';
import { Container } from 'reactstrap';



function HeaderBanner(props) {
    return (
        <Container full>
        
            <Heading center h3>{props.children}</Heading>
    
        </Container>
    )
}

export default HeaderBanner