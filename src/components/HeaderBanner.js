import React from 'react'
import styled from 'styled-components'
import {Container} from 'reactstrap';
const Wrapper = styled.div `
border-radius:5px;
padding:20px 0px;
margin:10px 20px;
font-size:16px;
color:#05668D;
font-weight:600;	
overflow:auto;
text-align: center;
float: center;
`
const Header = styled.h4 `
font-size: 32px;
font-weight: ${props => {
  if (props.secondary) return '400'
  return '100'
}}
text-transform: uppercase;
border-bottom: ${props => {
  if (props.secondary) return 'none'
  return '2px solid #05668d'
}}
font-size: ${props => {
  if (props.secondary) return '20px'
  return '32px'
}}
`

const HeaderBanner = props => {

  return (
    <Container>
      <Wrapper>
        <Header secondary={props.secondary}>{props.children}</Header>
      </Wrapper>
    </Container>
  )
}

export default HeaderBanner