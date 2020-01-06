import React, {useEffect, useRef, useState} from 'react';
import styled, {keyframe} from 'styled-components'
import Badge from '../components/Badge';
import Flex from '../components/Flex'
import HeaderBanner from '../components/HeaderBanner';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import Button from '../components/Button'
import {getAllMarinesInSquad} from '../services/get';


function SquadOverviewCard({data, callsign, onClick, toggleAdd}) {

const Header = styled.h4 `
text-align:center;
color:#fff;
font-weight: 700;
font-size: .85rem;	
position:relative;
line-height: 1;
`
const Stats = styled.div `
border-right:2px solid #fff;
&:nth-child() {
  border-right:2px solid #AEBD38;
}
width: 33.33333%;
float:left;
background-color: red;
padding: 10px;
background:#505160 ;
text-align:center
display:block;
height: 5rem;
color:#fff;
font-size:13px;
line-height: .5;
font-weight:300;
&:nth-child(3) {
border-right: none
}
`
const StatsContainer = styled.div `
overflow:auto;
font-size:16px;
color:#AEBD38;
font-weight:600;
`

  return (

    <div>

      <HeaderBanner>
        <strong>{callsign}</strong>
        OVERVIEW
      </HeaderBanner>

      <Carousel
        centerMode
        centerSlidePercentage={100}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        emulateTouch
        showThumbs={false}>
        <div>
          <StatsContainer>
          {data &&
            <Stats>
              <Header>Accountability</Header><br/>
              {data.length}</Stats>}
            <Stats>
              <Header>Appointments</Header><br/>
              2</Stats>
            <Stats>
              <Header>Discrepancies</Header><br/>
              0</Stats>
          </StatsContainer>
        </div>
        <div>
          <StatsContainer>
            <Stats>
              <Header>Something</Header><br/>
              Interesting</Stats>
            <Stats>
              <Header>Else</Header><br/>
              Would be</Stats>
            <Stats>
              <Header>Here</Header><br/>
              0</Stats>
          </StatsContainer>

        </div>
        <div>
          <StatsContainer>
            <Stats>
              <Badge onClick={onClick} color="secondary">View T/O</Badge>
            </Stats>
            <Stats>
              <Badge onClick={toggleAdd} color="secondary">Add</Badge>/<Badge onClick={toggleAdd} color="secondary">Remove</Badge>
            </Stats>
            <Stats></Stats>
          </StatsContainer>
        </div>
      </Carousel>
    </div>

  )
}

export default SquadOverviewCard