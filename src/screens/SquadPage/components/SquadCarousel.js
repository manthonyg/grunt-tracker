import React from "react";
import styled from "styled-components";
//Packages
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//Global components
import HeaderBanner from "../../../components/HeaderBanner";
import Button from "../../../components/Button";

function SquadCarousel({ data, callsign, handleSetCurrentView }) {
  const Header = styled.h4`
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-size: 0.85rem;
    position: relative;
    line-height: 1;
  `;
  const Stats = styled.div`
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
height: 8rem;
color:#fff;
font-size:13px;
font-weight:300;
&:nth-child(3) {
border-right: none
}
`;
  const StatsContainer = styled.div`
    overflow: auto;
    font-size: 16px;
    color: #aebd38;
    font-weight: 600;
  `;

  return (
    <div>
      <HeaderBanner>
        <strong>{callsign}OVERVIEW</strong>
      </HeaderBanner>

      <Carousel
        centerMode
        centerSlidePercentage={100}
        showStatus={false}
        showIndicators={false}
        infiniteLoop
        emulateTouch
        showThumbs={false}
      >
        <div>
          <StatsContainer>
            {data && (
              <Stats>
                <Header>Accountability</Header>
                <br />
                {data.length}
                <br />
                <i className="material-icons lg" id='accountability' onClick={handleSetCurrentView}>arrow_right_alt</i>
              </Stats>
            )}
            <Stats>
              <Header>Appointments</Header>
              <br />-
            </Stats>
            <Stats>
              <Header>Discrepancies</Header>
              <br />-
            </Stats>
          </StatsContainer>
        </div>
        <div>
          <StatsContainer>
            <Stats>
              <Header>Something</Header>
              <br />
              Interesting
            </Stats>
            <Stats>
              <Header>Else</Header>
              <br />
              Would be
            </Stats>
            <Stats>
              <Header>Here</Header>
              <br />!
            </Stats>
          </StatsContainer>
        </div>
        <div>
          <StatsContainer>
            <Stats>
              <Button secondary>Generate Zap #</Button>
            </Stats>
            <Stats>
              <Button secondary>Morning Report</Button>
            </Stats>
            <Stats>
              <Button secondary>Appointment List</Button>
            </Stats>
          </StatsContainer>
        </div>
      </Carousel>
    </div>
  );
}

export default SquadCarousel;
