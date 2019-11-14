import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Container from '../components/Container'

const MobileNavWrapper = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    will-change: transform;
    transform: translateZ(0);
    display: flex;
    height: 50px;
    box-shadow: 0 -2px 5px -2px #333;
    background-color: #C8D5D3;
    
    
`

const MobileNavItem = styled.div`
flex-grow: 1;
text-align: center;
font-size: 12px;
display: flex;
flex-direction: column;
justify-content: center;
:active {
    color: red;
}
`

const MobileNavItemContent = styled.div`
display: flex;
flex-direction: column;
}
`


function BottomNav() {

    return (
<Container>
<MobileNavWrapper>
    <MobileNavItem>
        <a href='/'><i className='fa fa-3x fa-home'/></a>
        Home
    </MobileNavItem>
    <MobileNavItem>
        <a href='/'><i className='fa fa-3x fa-calendar'/></a>
        View Appointments
    </MobileNavItem>
    <MobileNavItem>
        <i className='fa fa-3x fa-check'/>
        Quick Check
    </MobileNavItem>
    <MobileNavItem>
        <a href='add-members'><i className='fa fa-3x fa-plus'/></a>
        Add Squad / Marine
    </MobileNavItem>
</MobileNavWrapper>
</Container>


    )
}

export default BottomNav
