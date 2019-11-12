import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Heading from '../components/Heading'

const LogoWrapper = styled.div`
position: relative;
top: 4px;
left: 4px;
padding-bottom: 20px;
`

function LogoSmall(props) {
    return (
        <LogoWrapper>
            <Heading h4>{props.children}</Heading>
        </LogoWrapper>
    )
}

export default LogoSmall