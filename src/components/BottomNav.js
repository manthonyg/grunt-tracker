import React, {useState} from 'react';
import styled from 'styled-components';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useHistory } from 'react-router-dom'

const MobileNavWrapper = styled.nav `
position: fixed;
bottom: ${props => {
  if (props.hidden) {return '-50px'}
  return '0px'
}};
left: 0;
right: 0;
padding: 10px 0px;
display: flex;
height: 50px;
background-color: #f8f9fa;
margin-top: 100px;
transition: all 300ms;
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

function BottomNav(props) {

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const history = useHistory()
  return (

    <MobileNavWrapper {...props}>
      <MobileNavItem>
      <MobileNavItemContent>
          <a onClick={history.goBack}><i className='material-icons'>arrow_back</i></a>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <a href='/'><i class="material-icons">
home
</i></a>
          
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <ButtonDropdown direction="up" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle size='sm' color='none'>
            <i className='material-icons'>add</i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/create-marine'>Marine</DropdownItem>
              <DropdownItem href='/create-squad'>Squad</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>

  )
}

export default BottomNav
