import React, {useState} from 'react';
import styled from 'styled-components';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {useHistory} from 'react-router-dom'

const MobileNavWrapper = styled.nav `
position: fixed;
bottom: 0px;
left: 0;
right: 0;
padding: 10px 0px;
display: flex;
height: 50px;
background-color: #f8f9fa;
transition: all 300ms;
margin-top: 40px;
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
z-index: 50000;

`

function BottomNav(props) {

  const [dropdownOpen,
    setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const history = useHistory()
  return (
<MobileNavWrapper>
  <MobileNavItem>
      <MobileNavItemContent>
          <a href='#' onClick={history.goBack}><i className='material-icons'>arrow_back</i></a>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <a href='/'><i className="material-icons">home</i></a>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <ButtonDropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle size='sm' color='none'>
            <i className='material-icons'>add</i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/create-squad'>Squad</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>
  )}


export default BottomNav

//       <MobileNavWrapper {...props}>       <nav class="tab" data-selected="2">
// 	<div class="icons">   <a href='#' onClick={history.goBack}><div
// data-index="1" class="icon"><i
// className='material-icons'>arrow_back</i></div></a> 		<a
// href='/create-squad'><div data-index="1" class="icon"><i
// className='material-icons'>add</i></div></a> 		<div data-index="1"
// class="icon"><a href='/'><i className="material-icons">home</i></a></div>
// 	</div> 	<div class="bar"> 		<div class="cap"></div> 		<div class="middle">
// 			<div class="side"></div> 			<div class="circle"></div> 			<div
// class="side"></div> 		</div> 		<div class="cap"></div> 	</div> </nav>
// </MobileNavWrapper>