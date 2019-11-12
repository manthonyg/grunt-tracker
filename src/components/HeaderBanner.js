import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Heading from '../components/Heading';

const Banner = styled.div`
background-color: #C8D5D3;
width: 100vw;
padding: 1px 0px
`

function HeaderBanner(props) {
    return (
        <Banner>
            <Heading center h3>{props.children}</Heading>
        </Banner>
    )
}

export default HeaderBanner