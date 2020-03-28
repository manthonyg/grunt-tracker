import React from "react";
import styled from "styled-components";
//Packages
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
//Global components
import Banner from "../../../components/Banner";
import { SquadPageContext } from "../SquadPage";

const Header = styled.h4`
  text-align: center;
  color: #fff;
  font-weight: 400;
  font-size: 0.8rem;
  position: relative;
`;
const Stats = styled.div`
border-right:2px solid #fff;
width: 33.33333%;
float:left;
text-transform: uppercase;
background-color: red;
padding: 10px;
background: ${props => {
  if (props.secondary) return "#aebd38";
  return "#505160";
}}
&:nth-child(even) {
  background-color: #505160;
}
display:block;
height: 5.6rem;
color:#505160;
font-size:13px;
font-weight:300;
&:nth-child(3) {
}
&:hover {
  border-top: 0px;
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
        <StatsContainer>
          <Stats id="accountability" onClick={handleSetCurrentView}>
            {/* <img src={View} style={{ width: "2rem" }} /> */}
            <Header>Accountability</Header>

            {marineData && !!marineData.length ? (
              <>
                <Banner white>
                  {
                    marineData.filter(
                      marine => !!marine.accountability.accountedFor
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

            <Banner white>
              {!!totalAppointments ? totalAppointments : "-"}
            </Banner>
          </Stats>
          <Stats id="weapons" onClick={handleSetCurrentView}>
            {/* <img src={View} style={{ width: "2rem" }} /> */}
            <Header>EDL</Header>
            <br />
          </Stats>
        </StatsContainer>

        <StatsContainer>
          <Stats id="discrepancies" onClick={handleSetCurrentView}>
            {/* <img src={View} style={{ width: "2rem" }} /> */}
            <Header>Discrepancies</Header>

            <Banner white>-</Banner>
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
      </Carousel>
    </div>
  );
}

export default SquadCarousel;
