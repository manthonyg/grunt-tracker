import React from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//Packages
import styled from "styled-components";
//Media
import Home from "../../images/home-solid.svg";
import LArrow from "../../images/larrow.svg";
import AddSquad from "../../images/add-squad-yellow.svg";

const MobileNavWrapper = styled.nav`
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 10px 0px;
  display: flex;
  justify-content: between;
  height: 70px;
  background-color: #505160;
  background-image: contain;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0.04em;
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
 justify-content:between
 align-items: center;
:active {
    color: #fff;
}
&:a {
  color: #fff;
}
`;

const StyledLink = styled(Link)`
  color: #fff
&:hover {
    color: #aebd38;
  }
`;

const MobileNavItemContent = styled.div`
  display: flex;
  padding: 10px 0px;
  justify-content:between
  z-index: 50000;
  color: #fff;
`;

function BottomNav() {
  const history = useHistory();
  return (
    <MobileNavWrapper>
      <MobileNavItem>
        <MobileNavItemContent>
          <StyledLink>
            <span
              class="material-icons"
              onClick={history.goBack}
              style={{ fontSize: "2rem" }}
            >
              arrow_back_ios
            </span>
          </StyledLink>
        </MobileNavItemContent>
      </MobileNavItem>
      <MobileNavItem>
        <MobileNavItemContent>
          <StyledLink to="/">
            <span class="material-icons" style={{ fontSize: "2rem" }}>
              home
            </span>
          </StyledLink>
        </MobileNavItemContent>
      </MobileNavItem>

      <MobileNavItem>
        <MobileNavItemContent>
          <StyledLink to="/create-squad">
            <i class="material-icons" style={{ fontSize: "2rem" }}>
              group_add
            </i>
          </StyledLink>
        </MobileNavItemContent>
      </MobileNavItem>
    </MobileNavWrapper>
  );
}

export default BottomNav;
