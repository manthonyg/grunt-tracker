import React, { useContext, useState, useEffect } from "react";
//Packages
import styled from "styled-components";
//Global Components
import Banner from "../../../components/Banner";
import Flex, { Column } from "../../../components/Flex";
import Button from "../../../components/Button";
//Context
import { MarinePageContext } from "../MarinePage";
//Services
import { updateMarineEDL } from "../../../services/marineServices";

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
  const setMarineData = dataProvider.setMarineData;
  const [edlList, setEdlList] = useState({
    primary: { ...marineData.primary },
    supplementary: { ...marineData.supplementary },
    optics: { ...marineData.optics }
  });

  const primaryEDLArray =
    marineData && !!marineData.primary && Object.entries(marineData.primary);

  const opticsEDLArray =
    marineData && !!marineData.optics && Object.entries(marineData.optics);

  const supplementaryEDLArray =
    marineData &&
    !!marineData.supplementary &&
    Object.entries(marineData.supplementary);

  const updateEdlList = evt => {
    let target = evt.currentTarget;
    let currItemObj = { [target.id]: target.checked };

    setEdlList(prevState => {
      return {
        ...prevState,
        [target.value]: {
          ...prevState[target.value],
          ...currItemObj
        }
      };
    });

    console.log("edlList", edlList);
  };

  const saveEdlChangesToDb = () => {
    if (typeof edlList === "object" && !!Object.keys(edlList).length) {
      updateMarineEDL(marineData._id, edlList).then(
        setMarineData(prevState => {
          return {
            ...prevState,
            ...edlList
          };
        })
      );
    } else console.log({ err: "Nothing to change or invalid type" });
  };
  // console.table("marineData", marineData);
  return (
    <Flex justifyAround>
      {primaryEDLArray.map(item => (
        <Column four key={item[0]}>
          <Banner small green>
            {item}
          </Banner>
          <Switch
            value="primary"
            id={item[0]}
            key={item[0]}
            defaultChecked={!!item[1]}
            onChange={updateEdlList}
          />
        </Column>
      ))}
      {opticsEDLArray.map(item => (
        <Column four key={item[0]}>
          <Banner small green>
            {item}
          </Banner>
          <Switch
            value="optics"
            id={item[0]}
            key={item[0]}
            defaultChecked={!!item[1]}
            onChange={updateEdlList}
          />
        </Column>
      ))}
      {supplementaryEDLArray.map(item => (
        <Column three key={item[0]}>
          <Banner small green>
            {item}
          </Banner>
          <Switch
            value="supplementary"
            id={item[0]}
            key={item[0]}
            defaultChecked={!!item[1]}
            onChange={updateEdlList}
          />
        </Column>
      ))}
      <Button onClick={saveEdlChangesToDb}>Save Changes</Button>
    </Flex>
  );
}

export default EditMarineEDL;
