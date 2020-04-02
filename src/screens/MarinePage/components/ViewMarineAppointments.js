import React, { useContext } from "react";
//Global Components
import Banner from "../../../components/Banner";
import Flex from "../../../components/Flex";
//Context
import { MarinePageContext } from "../MarinePage";

function ViewMarineAppointments() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  return (
    <Flex>
      {marineData && marineData.length ? (
        <Flex justifyCenter>
          {marineData.map(marine =>
            marine.appointments.map(appointment => (
              <>
                <h1>{appointment.time}</h1>
                <h1>{appointment.location}</h1>
                <h1>{appointment.date}</h1>
                <h1>{appointment.appointment_type}</h1>
              </>
            ))
          )}
        </Flex>
      ) : (
        <Flex justifyAround>
          <Banner white small>
            No appointments!
          </Banner>
        </Flex>
      )}
    </Flex>
  );
}

export default ViewMarineAppointments;
