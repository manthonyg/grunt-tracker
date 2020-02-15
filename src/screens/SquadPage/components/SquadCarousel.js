import React from "react";
import styled from "styled-components";
//Packages
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//Global components
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import { SquadPageContext } from "../SquadPage";
//Media
import View from "../../../images/external-link-blue.svg";

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
width: 33.33333%;
float:left;
background-color: red;
padding: 10px;
background: ${props => {
  if (props.secondary) return "#aebd38";
  return "#505160";
}}
&:nth-child(even) {
  background-color: #505160;
}
border-top: 4px solid #505160;
text-align:center
display:block;
height: 10rem;
color:#505160;
font-size:13px;
font-weight:300;
&:nth-child(3) {
border-right: none
}
&:hover {
  border-top: 8px solid #aebd38;
}
`;
const StatsContainer = styled.div`
  overflow: auto;
  font-size: 16px;
  color: #aebd38;
  font-weight: 600;
`;

function SquadCarousel() {
  const dataProvider = React.useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const squadData = dataProvider.squadData;
  const setCurrentView = dataProvider.setCurrentView;

  const handleSetCurrentView = evt => {
    setCurrentView(evt.currentTarget.id);
  };

  const totalAppointments = marineData
    .map(
      marine => marine.appointments.map(appointment => appointment.type).length
    )
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <br />
      <br />
      <Banner secondary>{squadData.callsign}overview</Banner>
      <Carousel
        showStatus={true}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        emulateTouch
      >
        <div>
          <StatsContainer>
            <Stats id="accountability" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>Accountability</Header>

              <br />

              {marineData && !!marineData.length ? (
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
                <Banner white>-</Banner>
              )}
            </Stats>

            <Stats id="appointments" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>Appointments</Header>
              <br />
              <Banner white>
                {!!totalAppointments ? totalAppointments : "-"}
              </Banner>
            </Stats>
            <Stats id="discrepancies" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>Discrepancies</Header>
              <br />
              <Banner white>-</Banner>
            </Stats>
          </StatsContainer>
        </div>
        <div>
          <StatsContainer>
            <Stats id="weapons" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>EDL</Header>
              <br />
            </Stats>
            <Stats id="gear" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>Gear</Header>
              <br />
            </Stats>
            <Stats id="body" onClick={handleSetCurrentView}>
              {/* <img src={View} style={{ width: "2rem" }} /> */}
              <Header>Body</Header>
              <br />
            </Stats>
          </StatsContainer>
        </div>
      </Carousel>
    </div>
  );
}

export default SquadCarousel;
