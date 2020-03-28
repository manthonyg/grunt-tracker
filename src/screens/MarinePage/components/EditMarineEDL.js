import React, { useContext } from "react";
//Packages
import styled from "styled-components";
//Global Components
import Banner from "../../../components/Banner";
import Flex, { Column } from "../../../components/Flex";
//Context
import { MarinePageContext } from "../MarinePage";

const Switch = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 1.5em;
  height: 1.5em;
  background: #505160;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;

  &:checked {
    background: #aebd38;
  }
`;

function EditMarineEDL() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  const primaryEDL =
    marineData && !!marineData.primary && Object.entries(marineData.primary);

  const opticsEDL =
    marineData && !!marineData.optics && Object.entries(marineData.optics);

  const supplementaryEDL =
    marineData &&
    !!marineData.supplementary &&
    Object.entries(marineData.supplementary);

  return (
    <Flex justifyAround>
      {primaryEDL.map(item => (
        <Column four>
          <Banner small green>
            {item}
          </Banner>
          <Switch defaultChecked={!!item[1]} />
        </Column>
      ))}
      {opticsEDL.map(item => (
        <Column four>
          <Banner small green>
            {item}
          </Banner>
          <Switch defaultChecked={!!item[1]} />
        </Column>
      ))}
      {supplementaryEDL.map(item => (
        <Column four>
          <Banner small green>
            {item}
          </Banner>
          <Switch defaultChecked={!!item[1]} />
        </Column>
      ))}
    </Flex>
  );
}

export default EditMarineEDL;
