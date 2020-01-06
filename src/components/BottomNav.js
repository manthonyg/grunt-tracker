import React, {useState} from 'react';
import styled from 'styled-components';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

const MobileNavWrapper = styled.nav `
position: fixed;
bottom: 0px;
left: 0;
right: 0;
padding: 10px 0px;
display: flex;
height: 70px;
background-color: #505160;
transition: all 300ms;
margin-top: 40px;
&:after {
  content: '';
  background-color: #AEBD38;
  width: 100%;
  height: .2rem;
  position: absolute;
  bottom: 0;
  z-index: 2;
}
`

const MobileNavItem = styled.div `
flex-grow: 1;
color: #fff;
text-align: center;
font-size: ${props => {
  if (props.center) return '2px'
  return '12px'}}
display: flex;
flex-direction: column;
justify-content: center;
:active {
    color: #fff;
}
&:a {
  color: #fff;
}
`

const StyledLink = styled(Link)`
color: #fff
:active {
  color: #AEBD38;
}
`

const StyledDropdownToggle = styled(DropdownToggle)`
color: #fff;
`
const MobileNavItemContent = styled.div `
display: flex;
flex-direction: column;
padding: 10px 0px;
z-index: 50000;
color: #fff;

`


function BottomNav(props) {

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const history = useHistory()
  return (
    <MobileNavWrapper>
      <MobileNavItem>
        <MobileNavItemContent>
          <i className='material-icons' onClick={history.goBack}>arrow_back</i>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem center>
        <MobileNavItemContent>
      
            <StyledLink to='/'><i className="material-icons">home</i></StyledLink>
      
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <ButtonDropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
            <StyledDropdownToggle size='sm' color='none'>
              <i className='material-icons'>add</i>
            </StyledDropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/create-squad'>Squad</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>
  )
}

export default BottomNav
