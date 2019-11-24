import React from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from 'reactstrap';

const MobileNavWrapper = styled.nav `
position: fixed;
bottom: 0;
left: 0;
right: 0;
padding: 10px 0px;
display: flex;
height: 50px;
background-color: #f8f9fa;
`

const MobileNavItem = styled.div `
flex-grow: 1;
text-align: center;
font-size: 12px;
display: flex;
flex-direction: column;
justify-content: center;
:active {
    color: white;
}
`

const MobileNavItemContent = styled.div `
display: flex;
flex-direction: column;
padding: 10px 0px;
`

function BottomNav() {

  return (

    <MobileNavWrapper>
      <MobileNavItem>
        <MobileNavItemContent>
          <a href='/'><i className='fa fa-2x fa-home'/></a>
          Home
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <a href='/'><i className='fa fa-2x fa-calendar'/></a>
          Appointments
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <i className='fa fa-2x fa-check'/>
          Quick Check
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <a href='add-members'><i className='fa fa-2x fa-plus'/></a>
          Add
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>

  )
}

export default BottomNav
