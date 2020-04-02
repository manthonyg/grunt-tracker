import React, { useContext, useState } from "react";
//Packages
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
//Global Components
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
import Pill from "../../../components/Pill";
import Flex from "../../../components/Flex";
//Context
import { SquadPageContext } from "../SquadPage";
//Constants
import { appointmentStrings } from "../../../constants/calendarStrings";
var moment = require("moment");

const FlexBox = styled.div`
  display: flex;
  height: 67.5vh;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: stretch;
  box-sizing: border-box;
  transition: 3000ms;
  overflow: scroll;
`;

const FlexItem = styled.div`
  transition: all 150ms;
  padding: 1rem;
  text-transform: uppercase;
  justify-content: center;
  flex-direction: column; 
  border-bottom: 4px solid white;
  align-items: center;
  align-content: center;
  overflow: auto;
  background-color: #68829e;
  color: #000;

  filter: ${props => {
    if (props.selected) return ``;
    return `opacity(40%);`;
  }}
  box-sizing: border-box;
  flex-grow: ${props => {
    if (props.selected) return "2";
    return "1";
  }};
`;

function SquadAppointments() {
  const dataProvider = useContext(SquadPageContext);
  const marineData = dataProvider.marineData;

  function formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const currentDate = formatDate(Date.now());

  const allAppointments = marineData
    .map(marine =>
      marine.appointments.map(appointment => {
        return {
          ...appointment,
          id: appointment._id,
          name: marine.last,
          rank: marine.rank,
          date: appointment.date.substr(0, 10)
        };
      })
    )
    .flat();

  const thisWeeksAppointments = allAppointments.filter(appointment =>
    moment(appointment.date).isSame(currentDate, "week")
  );
  const todaysAppointments = allAppointments.filter(appointment =>
    moment(appointment.date).isSame(currentDate, "day")
  );

  const [appointmentView, setSelectedCategory] = useState({
    today: false,
    week: false,
    all: false
  });

  const changeAppointmentView = evt => {
    const id = evt.currentTarget.id;
    setSelectedCategory({
      today: false,
      week: false,
      [id]: !appointmentView.id
    });
  };

  return (
    <>
      <FlexBox>
        <FlexItem
          id={"today"}
          selected={appointmentView.today}
          onClick={changeAppointmentView}
        >
          <Banner white>Today</Banner>
          {appointmentView.today &&
          todaysAppointments &&
          !!todaysAppointments.length ? (
            todaysAppointments.map(appointment => (
              <Card noAnimation inverted key={appointment.id}>
                <strong style={{ color: "#aebd38" }}>Who: </strong>
                {appointment.rank} {appointment.last}
                <br />
                <strong style={{ color: "#aebd38" }}>When: </strong>
                <Moment calendar={appointmentStrings}>
                  {appointment.date}
                </Moment>
                {appointment.time}
                <br />
                <strong style={{ color: "#aebd38" }}>Where: </strong>{" "}
                {appointment.location}
                <br />
                <strong style={{ color: "#aebd38" }}>Why: </strong>{" "}
                {appointment.appointment_type}
              </Card>
            ))
          ) : (
            <Flex justifyCenter>
              <Pill>{todaysAppointments.length}</Pill>
            </Flex>
          )}
        </FlexItem>
        <FlexItem
          id={"week"}
          selected={appointmentView.week}
          onClick={changeAppointmentView}
        >
          <Banner white>This Week</Banner>
          {appointmentView.week &&
          thisWeeksAppointments &&
          !!thisWeeksAppointments.length ? (
            thisWeeksAppointments.map(appointment => (
              <Card inverted key={appointment.id}>
                <strong style={{ color: "#aebd38" }}>Who: </strong>
                {appointment.rank} {appointment.last}
                <br />
                <strong style={{ color: "#aebd38" }}>When: </strong>
                <Moment
                  date={appointment.date}
                  calendar={appointmentStrings}
                ></Moment>
                <br />
                <strong style={{ color: "#aebd38" }}>Where: </strong>{" "}
                {appointment.location}
                <br />
                <strong style={{ color: "#aebd38" }}>Why: </strong>{" "}
                {appointment.appointment_type}
              </Card>
            ))
          ) : (
            <Flex justifyCenter>
              <Pill>{thisWeeksAppointments.length}</Pill>
            </Flex>
          )}
        </FlexItem>
        <FlexItem
          id={"all"}
          selected={appointmentView.all}
          onClick={changeAppointmentView}
        >
          <Banner white>All</Banner>
          {appointmentView.all &&
          allAppointments &&
          !!allAppointments.length ? (
            allAppointments.map(appointment => (
              <Card noAnimation inverted key={appointment.id}>
                <strong style={{ color: "#aebd38" }}>Who: </strong>
                {appointment.rank} {appointment.last}
                <br />
                <strong style={{ color: "#aebd38" }}>When: </strong>
                <Moment calendar={appointmentStrings}>
                  {appointment.date}
                </Moment>
                {appointment.time}
                <br />
                <strong style={{ color: "#aebd38" }}>Where: </strong>{" "}
                {appointment.location}
                <br />
                <strong style={{ color: "#aebd38" }}>Why: </strong>{" "}
                {appointment.appointment_type}
              </Card>
            ))
          ) : (
            <Flex justifyCenter>
              <Pill>{allAppointments.length}</Pill>
            </Flex>
          )}
        </FlexItem>
      </FlexBox>
    </>
  );
}

export default SquadAppointments;
