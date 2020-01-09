import React, { useContext } from 'react';
import styled, {keyframes, css} from 'styled-components';
import {
  Container,
  CardTitle,
  CardImg,
  CardImgOverlay
} from 'reactstrap'
import GTLogo from '../images/GT_Logo.png'
import GTBG from '../images/GT_Bg.png'
import { device } from '../constants/mediaQueries'


const jump = keyframes` {
  0%   { transform: scale(1,1)      translateY(0); }
  10%  { transform: scale(1.1,.9)   translateY(0) rotate(10deg); }
  30%  { transform: scale(.9,1.1)   translateY(-40px) rotate(-15deg) }
  50%  { transform: scale(1.05,.95) translateY(0)   }
  57%  { transform: scale(1,1)      translateY(-7px) }
  100%  { transform: scale(1,1)      translateY(0)  }
}
    `
  
   const jumpEffect = css`
   animation: ${jump} 1000ms ease-out
   animation-iteration-count: 3`
  
const slide = keyframes`
{
  0% { background-position: 45% -100px}
  100% {background-posiiton: 50%}
}
`
const slideEffect = css`
animation: ${slide} 3s linear forwards;`
   
const LogoWrapper = styled.div `
position: relative;
top: 2rem;
text-align: center;
}`

const BackgroundLayer = styled.div`
background-image: url(${GTBG});
background-attachment: fixed;
background-repeat: no repeat;
background-position: center;
position: absolute;
border-radius: 100%;
width: 80px;
height: 80px;
top: 10px;
left: 15px;
`

const Wrapper = styled.div `

@media ${device.laptop} {
  position: relative;
  top: 20px;
  left: 20px;
  margin-bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 99em;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  }
}
`


function LogoSmall() {
  return (
    <>
    <BackgroundLayer></BackgroundLayer>
    <Wrapper>
       
    <Container fluid={true}>
      {/* <CardImg width="100%" src={GTBG} alt="GT BG"/> */}

    
          <LogoWrapper>
            <img
              alt='Grunt Tracker'
              src={GTLogo}
              style={{
              width: '2rem',
              position: 'relative',
              top: '-25px'
            }}/>
          </LogoWrapper>
      

    </Container>
    </Wrapper>
    </>

  )
}

export default LogoSmall