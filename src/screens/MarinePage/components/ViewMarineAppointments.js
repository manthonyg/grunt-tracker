import React, { useState, useContext } from "react";
//Packages
import { Alert, Input, Container } from "reactstrap";
import styled from "styled-components";
//Global Components
import Button from "../../../components/Button";
import Banner from "../../../components/Banner";
import Flex, { Column } from "../../../components/Flex";
import Pill from "../../../components/Pill";
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
