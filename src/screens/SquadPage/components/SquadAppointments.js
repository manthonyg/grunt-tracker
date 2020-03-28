import React, { useContext, useState } from "react";
//Packages
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
//Global Components
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
//Context
import { SquadPageContext } from "../SquadPage";
//Constants
import { appointmentStrings } from "../../../constants/calendarStrings";

function SquadAppointments() {
  const dataProvider = useContext(SquadPageContext);
  const marineData = dataProvider.marineData;

  const currentDate = marineData.map(marine =>
    marine.appointments.map(appointment => <Moment>{appointment.date}</Moment>)
  );

  console.log(currentDate);

  const [selectedCategory, setSelectedCategory] = useState({
    today: true,
    week: false
  });

  const handleSelectedCategory = evt => {
    const id = evt.currentTarget.id;
    setSelectedCategory({
      today: false,
      week: false,
      [id]: !selectedCategory.id
    });
  };

  const FlexBox = styled.div`
    display: flex;
    height: 67vh;
    margin: 3px 0px;
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
  border-bottom: 4px solid #aebd38;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: auto;
  background-color: #68829e;
  color: #000;
  border-bottom: 4px solid #fff;
  filter: ${props => {
    if (props.selected) return ``;
    return `opacity(40%);`;
  }}
  box-sizing: border-box;
  flex-grow: ${props => {
    if (props.selected) return "4";
    return "1";
  }};
  &:nth-child(2n) {
    background-color: #68829e;
  }
`;
  return (
    <FlexBox>
      <Banner secondary>Appointments</Banner>
      <FlexItem
        id={"today"}
        selected={selectedCategory.today}
        onClick={handleSelectedCategory}
      >
        <Banner white>Today</Banner>

        {selectedCategory.today &&
          marineData.map(marine =>
            marine.appointments.map(appointment => (
              <Card noAnimation inverted key={appointment}>
                <strong style={{ color: "#aebd38" }}>Who: </strong>
                {marine.rank} {marine.last}
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
          )}
      </FlexItem>
      <FlexItem
        id={"week"}
        selected={selectedCategory.week}
        onClick={handleSelectedCategory}
      >
        <Banner white>This Week</Banner>
        {selectedCategory.week &&
          marineData.map(marine =>
            marine.appointments.map(appointment => (
              <Card inverted key={appointment}>
                <strong style={{ color: "#aebd38" }}>Who: </strong>
                {marine.rank} {marine.last}
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
          )}
      </FlexItem>
    </FlexBox>
  );
}

export default SquadAppointments;
