import React from 'react';
import styled from 'styled-components';
import GTLogo from '../images/GT_logo.png'

const LogoWrapper = styled.div`
position: relative;
top: 10px;
text-align: center;
padding-bottom: 20px;
margin-bottom: 20px;
`

function LogoSmall() {
    return (
        <LogoWrapper>
            <img alt='Grunt Tracker' src={GTLogo} style={{width: '50px'}}/>
        </LogoWrapper>
    )
}

export default LogoSmall