import React, { useContext } from "react";
//Global Components
import Banner from "../../../components/Banner";
import Flex from "../../../components/Flex";
import Pill from "../../../components/Pill";
//Context
import { MarinePageContext } from "../MarinePage";

function ViewMarineEDL() {
  const dataProvider = useContext(MarinePageContext);

  const marineData = dataProvider.marineData;

  const primaryEDL =
    marineData &&
    !!marineData.primary &&
    Object.entries(marineData.primary)
      .filter(object => !!object[1])
      .map(object => object[0]);

  const opticsEDL =
    marineData &&
    !!marineData.optics &&
    Object.entries(marineData.optics)
      .filter(object => !!object[1])
      .map(object => object[0]);

  const supplementaryEDL =
    marineData &&
    !!marineData.supplementary &&
    Object.entries(marineData.supplementary)
      .filter(object => !!object[1])
      .map(object => object[0]);

  //Create a UI with the current Marines EDL checked or unchecked based
  //on its existence in the db

  return (
    <>
      <Banner small white>
        Primary
      </Banner>
      <Flex justifyAround alignCenter>
        {primaryEDL.map(item => (
          <Pill key={item}>{item}</Pill>
        ))}
      </Flex>
      <hr />
      <Banner small white>
        Optics
      </Banner>
      <Flex justifyAround alignCenter>
        {opticsEDL.map(item => (
          <Pill key={item}>{item}</Pill>
        ))}
      </Flex>
      <hr />
      <Banner small white>
        Supplementary
      </Banner>
      <Flex justifyAround alignCenter>
        {supplementaryEDL.map(item => (
          <Pill key={item}>{item}</Pill>
        ))}
      </Flex>
    </>
  );
}

export default ViewMarineEDL;
