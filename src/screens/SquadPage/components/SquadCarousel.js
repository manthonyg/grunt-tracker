import React, { useContext } from "react";
import styled from "styled-components";
//Packages
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//Global components
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import { SquadPageContext } from "../SquadPage";

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
background: ${props => {
    if (props.secondary) return "#aebd38";
    return "#505160";
  }}

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


function SquadCarousel({ handleSetCurrentView }) {

  const dataProvider = React.useContext(SquadPageContext)

  const marineData = dataProvider.marineData
  const squadData = dataProvider.squadData


  return (
    <div>
      <Banner secondary>{squadData.callsign}overview</Banner>
      <Carousel
       showStatus={false}
       showIndicators={false}
       showThumbs={false}
       centerMode
       centerSlidePercentage={100}
       infiniteLoop
       emulateTouch
      >
        <div>
          <StatsContainer>
            <Stats>
              <Header>Accountability</Header>
              <br />
              {marineData && marineData.length ? (
                <>
                  <Banner white>{marineData.filter(m => m.accountability.accountedFor).length}/
                  {marineData.length}</Banner>
                </>
              ) : (
                "-"
              )}
            </Stats>

            <Stats>
              <Header>Appointments</Header>
              <br />
              {marineData && marineData.appointments ? (
                <>
                  {marineData.filter(d => d.appointments.length)}
                  {marineData.appointments.length}

                  <br />
                  <i
                    className="material-icons"
                    id="accountability"
                    onClick={handleSetCurrentView}
                  >
                    arrow_right_alt
                  </i>
                </>
              ) : (
                "-"
              )}
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
              <Header>Header</Header>
              <br />
              Body
            </Stats>
            <Stats>
              <Header>Header</Header>
              <br />
              Body
            </Stats>
            <Stats>
              <Header>Header</Header>
              <br />
              Body
            </Stats>
          </StatsContainer>
        </div>
        <div>
          <StatsContainer>
            <Stats secondary>
              <Button secondary>Generate 1#</Button>
            </Stats>
            <Stats secondary>
              <Button secondary>Generate 2#</Button>
            </Stats>
            <Stats secondary>
              <Button secondary>Generate 3#</Button>
            </Stats>
          </StatsContainer>
        </div>
      </Carousel>
    </div>
  );
}

export default SquadCarousel;
