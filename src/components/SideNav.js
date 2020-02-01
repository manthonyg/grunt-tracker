import React from "react";
//Packages
import styled, { keyframes } from "styled-components";
//Global Components
import Logo from "./Logo";
//Media
import BG from "../images/GT_Bg.png";
import Hamburger from "../images/hamburger-yellow.svg";
import Plus from "../images/plus.svg";

function SideNav({ open, onClick, navLinks, handleView }) {
  const NavWrapper = styled.div`
    position: absolute;
    z-index: 10000;
    width: ${props => {
      if (props.open) return "75vw";
      return "0vw";
    }}
    height: 100vh;
    border-right: ${props => {
      if (props.open) return "10px solid #AEBD38";
      return "none";
    }}

    background-position: 25% 110%;
    background-attachment: fixed;
    background-clip: border-box;
    background-repeat: no-repeat;
    background-size: auto auto;
    background-color: #68829e;
    background-image: url(${BG});
  `;

  const HamburgerWrapper = styled.div`
    position: absolute;
    top: 12px;
    left: ${props => {
      if (props.open) return "40%";
      return "14px";
    }}
    z-index: ${props => {
      if (props.open) return "100001";
      return "1";
    }};
  `;

  const NavItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    height: 50vh;
    margin: 0 auto;
    justify-content: center;
    text-align: center;
  `;

  const NavItem = styled.h4`
    color: #fff;
    text-transform: uppercase;
    &:hover {
      color: #aebd38;
    }
  `;

  const LogoWrapper = styled.div`
    position: absolute;
    top: 5px;
    left: 35%;
  `;
  return (
    <NavWrapper open={open}>
      <HamburgerWrapper onClick={onClick}>
        <img
          style={
            open
              ? {
                  width: "2rem",
                  color: "white",
                  transform: "rotate(45deg)"
                }
              : { width: "2rem", color: "green" }
          }
          src={open ? Plus : Hamburger}
        />
      </HamburgerWrapper>

      {open && (
        <NavItemWrapper>
          {navLinks.map(link => (
            <NavItem id={link.view} onClick={handleView}>
              {link.title}
            </NavItem>
          ))}
        </NavItemWrapper>
      )}
      {open && (
        <LogoWrapper>
          <Logo size="4"></Logo>
        </LogoWrapper>
      )}
    </NavWrapper>
  );
}

export default SideNav;
