import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div `
border:1px solid #ebeff2;
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
font-weight: 600;
`


const HeaderBanner = props => {

  return (
    <Wrapper>
        <Header>{props.children}</Header>
    </Wrapper>
  )
}

export default HeaderBanner