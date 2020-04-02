import React, { useContext } from "react";
//Packages
import styled from "styled-components";
//Global Components
import TableTemplate from "../../../components/Table";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
import Flex from "../../../components/Flex";
//LocalComponents
import SquadAccountability from "./SquadAccountability";
//Context
import { SquadPageContext } from "../SquadPage";

const StyledIcon = styled.i`
  color: #505160;
  font-size: 2em;
`;

function SquadTable() {
  const dataProvider = useContext(SquadPageContext);
  const marineData = dataProvider.marineData;
  const currentView = dataProvider.currentView;

  const zapHeaders = ["Test", "testOne", "testTwo", "testThree"];

  const allWeapons = marineData.map(marine => Object.keys(marine.primary));
  const allOptics = marineData.map(marine => Object.keys(marine.optics));
  const allSupplementary = marineData.map(marine =>
    Object.keys(marine.supplementary)
  );

  const totalWeapons = marineData.map(marine =>
    Object.values(marine.primary)
      .reduce((acc, curr, ind, arr) => acc.concat(curr), [])
      .map(item => (!!item ? 1 : 0))
  );

  const totalOptics = marineData.map(marine =>
    Object.values(marine.optics)
      .reduce((acc, curr, ind, arr) => acc.concat(curr), [])
      .map(item => (!!item ? 1 : 0))
  );

  const totalSupplementary = marineData.map(marine =>
    Object.values(marine.supplementary)
      .reduce((acc, curr, ind, arr) => acc.concat(curr), [])
      .map(item => (!!item ? 1 : 0))
  );

  const totalWeaponsCounts = totalWeapons.reduce((acc, curr, ind, arr) => {
    let tempVal;
    let tempArr = [];
    for (let i = 0; i < acc.length; i++) {
      tempVal = acc[i] + curr[i];
      tempArr.push(tempVal);
    }
    return tempArr;
  });

  const totalOpticsCounts = totalOptics.reduce((acc, curr, ind, arr) => {
    let tempVal;
    let tempArr = [];
    for (let i = 0; i < acc.length; i++) {
      tempVal = acc[i] + curr[i];
      tempArr.push(tempVal);
    }
    return tempArr;
  });

  const totalSupplementaryCounts = totalSupplementary.reduce((acc, curr) => {
    let tempVal;
    let tempArr = [];
    for (let i = 0; i < acc.length; i++) {
      tempVal = acc[i] + curr[i];
      tempArr.push(tempVal);
    }
    return tempArr;
  });

  const weapons = {
    headers: allWeapons[0],
    data: totalWeaponsCounts
  };

  const optics = {
    headers: allOptics[0],
    data: totalOpticsCounts
  };

  const supplementary = {
    headers: allSupplementary[0],
    data: totalSupplementaryCounts
  };

  const gearHeaders = ["Test", "testOne", "testTwo", "testThree"];
  const bodyHeaders = ["Test", "testOne", "testTwo", "testThree"];

  return (
    <>
      {currentView === "accountability" && <SquadAccountability />}

      {currentView === "zaps" && (
        <TableTemplate
          bannerText="ZAPs"
          marineData={marineData}
          tableHeaders={zapHeaders}
          tableData={["zap", "last", "first", "bloodType", "religion"]}
        ></TableTemplate>
      )}
      {currentView === "weapons" && (
        <>
          <Flex justifyCenter>
            <Button>
              <Banner small green>
                download edl excel sheet
              </Banner>
              <StyledIcon className="material-icons">save_alt</StyledIcon>
            </Button>
          </Flex>

          <TableTemplate
            bannerText="Primary"
            marineData={marineData}
            tableHeaders={weapons.headers}
            tableData={weapons.data}
          ></TableTemplate>
          <TableTemplate
            bannerText="Optics"
            marineData={marineData}
            tableHeaders={optics.headers}
            tableData={optics.data}
          ></TableTemplate>
          <TableTemplate
            bannerText="Supplementary"
            marineData={marineData}
            tableHeaders={supplementary.headers}
            tableData={supplementary.data}
          ></TableTemplate>
        </>
      )}
    </>
  );
}

export default SquadTable;
