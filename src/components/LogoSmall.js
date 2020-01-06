import React from 'react';
import styled from 'styled-components';
import {
  Container,
  CardTitle,
  CardImg,
  CardImgOverlay
} from 'reactstrap'
import GTLogo from '../images/GT_Logo.png'
import GTBG from '../images/GT_Bg.png'
import {device} from '../constants/mediaQueries'

const LogoWrapper = styled.div `
position: relative;
top: 2rem;
text-align: center;
}`

const Wrapper = styled.div `

@media ${device.laptop} {
  position: relative;
  top: 20px;
  left: 20px;
  margin-bottom: 20px;
  width: 70px;
  height: 70px;
  border-radius: 99em;
  background-image: url(${GTBG});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
}
`

function LogoSmall() {
  return (
    <Wrapper>
    <Container fluid={true}>
      {/* <CardImg width="100%" src={GTBG} alt="GT BG"/> */}

      <CardImgOverlay>
        <CardTitle>
      
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
        </CardTitle>
      </CardImgOverlay>

    </Container>
    </Wrapper>

  )
}

export default LogoSmall