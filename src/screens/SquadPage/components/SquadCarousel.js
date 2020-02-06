import React from "react";
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
  margin-top: 2rem;
  font-weight: 700;
  font-size: 0.85rem;
  position: relative;
  line-height: 1;
`;
const Stats = styled.div`
border-right:2px solid #fff;
border-top:20px solid #AEBD38;
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
&:nth-child(1n) {
  background-color: #505160;
}
text-align:center
display:block;
height: 10rem;
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
  const dataProvider = React.useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const squadData = dataProvider.squadData;

  const totalAppointments = marineData.map(marine =>
    marine.appointments
      .map(appointment => appointment.date)
      .reduce((acc, cur) => acc + cur, 0)
  );

  return (
    <div>
      <br />
      <br />
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
                  <Banner white>
                    {
                      marineData.filter(
                        marine => marine.accountability.accountedFor
                      ).length
                    }
                    /{marineData.length}
                  </Banner>
                </>
              ) : (
                "-"
              )}
            </Stats>

            <Stats>
              <Header>Appointments</Header>
              <br />
              <Banner white>{totalAppointments[0]}</Banner>
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
