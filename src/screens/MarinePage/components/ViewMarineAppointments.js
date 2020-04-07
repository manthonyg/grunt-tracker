import React, { useContext } from "react";
//Global Components
import Card from "../../../components/Card";
import Flex from "../../../components/Flex";
//Context
import { MarinePageContext } from "../MarinePage";
//Packages
import Moment from "react-moment";
import "moment-timezone";
import { appointmentStrings } from "../../../constants/calendarStrings";

function ViewMarineAppointments() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;
  console.log(marineData);
  return (
    <Flex justifyCenter>
      {marineData &&
        marineData.appointments.map(appointment => (
          <>
            <Card noAnimation inverted key={appointment.id}>
              <strong style={{ color: "#aebd38" }}>When: </strong>
              <Moment calendar={appointmentStrings}>{appointment.date}</Moment>
              {appointment.time}
              <br />
              <strong style={{ color: "#aebd38" }}>Where: </strong>{" "}
              {appointment.location}
              <br />
              <strong style={{ color: "#aebd38" }}>Why: </strong>{" "}
              {appointment.appointment_type}
            </Card>
          </>
        ))}
    </Flex>
  );
}

export default ViewMarineAppointments;
