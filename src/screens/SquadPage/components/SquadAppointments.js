import React, { useContext, useState } from "react";
//Packages
import styled from "styled-components";
//Global Components
import Banner from "../../../components/Banner";
//Context
import { SquadPageContext } from "../SquadPage";

function SquadAppointments() {
  const dataProvider = useContext(SquadPageContext);
  const marineData = dataProvider.marineData;

  const [selectedCategory, setSelectedCategory] = useState({
    today: true,
    week: false,
    month: false
  });

  const handleSelectedCategory = evt => {
    const id = evt.currentTarget.id;
    setSelectedCategory({
      today: false,
      week: false,
      month: false,
      [id]: !selectedCategory.id
    });
  };

  const FlexBox = styled.div`
    display: flex;
    height: 61vh;
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
              <div key={appointment}>
                {appointment.date} {appointment.location} {appointment.type}
              </div>
            ))
          )}
      </FlexItem>
      <FlexItem
        id={"week"}
        selected={selectedCategory.week}
        onClick={handleSelectedCategory}
      >
        <Banner white>This Week</Banner>
      </FlexItem>
      <FlexItem
        id={"month"}
        selected={selectedCategory.month}
        onClick={handleSelectedCategory}
      >
        <Banner white>This Month</Banner>
      </FlexItem>
    </FlexBox>
  );
}

export default SquadAppointments;
