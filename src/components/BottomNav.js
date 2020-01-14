import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//Packages
import styled from "styled-components";
import { DropdownToggle } from "reactstrap";
//Global components
import Logo from './Logo';


const MobileNavWrapper = styled.nav`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 10px 0px;
  display: flex;
  height: 70px;
  background-color: #505160;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.11'%3E%3Cpolygon fill='%235d605a' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%236b7055' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%23787f4f' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%23868f49' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%23939e43' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%23a1ae3e' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23aebd38' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
background-repeat: no-repeat;
background-position: center;
background-size: cover;
  margin-top: 40px;
  &:after {
    content: "";
    background-color: #aebd38;
    width: 100%;
    height: 0.2rem;
    position: absolute;
    bottom: 0;
    z-index: 2;
  }
`;

const MobileNavItem = styled.div`
flex-grow: 1;
color: #fff;
text-align: center;
font-size: ${props => {
  if (props.center) return "2px";
  return "12px";
}}
display: flex;
flex-direction: column;
justify-content: center;
:active {
    color: #fff;
}
&:a {
  color: #fff;
}
`;

const StyledLink = styled(Link)`
  color: #fff
:active {
    color: #aebd38;
  }
`;

const MobileNavItemContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  z-index: 50000;
  color: #fff;
`;

function BottomNav(props) {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const history = useHistory();
  return (
    <MobileNavWrapper>
      <MobileNavItem>
        <MobileNavItemContent>
          <i className="material-icons" onClick={history.goBack}>
            arrow_back
          </i>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem center>
        <MobileNavItemContent>
          <StyledLink to="/">
            <i className="material-icons">home</i>
          </StyledLink>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <StyledLink to="/create-squad">
            <i className="material-icons">add</i>
          </StyledLink>
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>
  );
}

export default BottomNav;
