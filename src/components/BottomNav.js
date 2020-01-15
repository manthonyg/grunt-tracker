import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//Packages
import styled from "styled-components";


const MobileNavWrapper = styled.nav`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 10px 0px;
  display: flex;
  height: 70px;
  background-color: #505160;
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
