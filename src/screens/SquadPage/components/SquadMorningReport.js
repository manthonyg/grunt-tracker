import React, { useState } from "react";
//Packages
import styled from "styled-components";
import ToggleButton from 'react-toggle-button'
//Global components
import Badge from "../../../components/Badge";
import Flex, { Column } from "../../../components/Flex";
import Button from "../../../components/Button";
import HeaderBanner from "../../../components/HeaderBanner";

function SquadMorningReport({ marines }) {
  const [checked, setChecked] = useState([]);
  const handleSetChecked = event => {
    console.log(event.target.value);
  };

  console.log(checked);
  return (
    <>
      <HeaderBanner>Accountability</HeaderBanner>
      {marines.map((marine, i) => (
        <>
          {marine.last}
          <ToggleButton
            inactiveLabel={''}
            activeLabel={''}
            value={false}
            onToggle={value => {
              console.log(!value)
            }}
          />
        </>
      ))}
    </>
  );
}

export default SquadMorningReport;
