import React from 'react';
import Heading from '../components/Heading';
import { Container } from 'reactstrap';




function HeaderBanner(props) {
    return (
        <Container>
            <Heading center h3>{props.children}</Heading>
        </Container>
    )
}

export default HeaderBanner