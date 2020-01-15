import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div `
border-radius:5px;
font-size:16px;

font-weight:600;	
overflow:auto;
text-align: center;
float: center;
`
const Header = styled.h4 `
font-weight: ${props => {
  if (props.secondary) return '400'
  return '100'
}}
color: ${props => {
  if (props.white) return '#fff'
  return '#05668D'
}};
text-transform: uppercase;
border-bottom: ${props => {
  if (props.secondary) return 'none'
  if (props.header) return 'none'
  return '2px solid #505160'
}}
font-size: ${props => {
  if (props.secondary) return '20px'
  if (props.small) return '14px'
  return '32px'
}}
`

const Banner = props => {

  return (

      <Wrapper>
        <Header header={props.header} white={props.white} small={props.small} secondary={props.secondary}>{props.children}</Header>
      </Wrapper>
 
  )
}

export default Banner