import React from "react";
import styled from "styled-components";
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
  if (props.selected) return "#aebd38";
  return "#505160";
}}
&:last-of-type {
  border-right: 0px;
}
display:block;
height: 7rem;
color:#505160;
font-size:13px;
margin-bottom: 5px;
font-weight:300;
transition: all 100ms;
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
  const currentView = dataProvider.currentView;

  const changeCurrentView = evt => {
    setCurrentView(evt.currentTarget.id);
  };

  const totalAppointments = marineData
    .map(marine => marine.appointments.map(appointment => appointment.type))
    .flat().length;

  return (
    <div>
      <StatsContainer>
        <Stats
          selected={currentView === "accountability"}
          id="accountability"
          onClick={changeCurrentView}
        >
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

        <Stats
          selected={currentView === "appointments"}
          id="appointments"
          onClick={changeCurrentView}
        >
          {/* <img src={View} style={{ width: "2rem" }} /> */}
          <Header>Appointments</Header>

          <Banner white>{!!totalAppointments ? totalAppointments : "-"}</Banner>
        </Stats>
        <Stats
          selected={currentView === "weapons"}
          id="weapons"
          onClick={changeCurrentView}
        >
          {/* <img src={View} style={{ width: "2rem" }} /> */}
          <Header>EDL</Header>
          <br />
        </Stats>
      </StatsContainer>
    </div>
  );
}

export default SquadCarousel;
