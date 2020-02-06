import React, { useState } from "react";
//Packages
import styled from "styled-components";
//LocalComponents
import ViewAccountability from "./Views/ViewAccountability";
import ViewZaps from "./Views/ViewZaps";
import ViewBody from "./Views/ViewBody";
import ViewWeapons from "./Views/ViewWeapons";
import Flex from "../../../../components/Flex";

function SquadTable() {
  const [tableView, setTableView] = useState("accountability");

  const handleSetTableView = evt => {
    setTableView(evt.currentTarget.value);
  };

  const Select = styled.select`
    text-align: center;
    justify-content: center;
    margin: 0.5rem;
    padding: 1rem;
    width: 95vw;
    align-content: center;
    color: #000;
    border: 4px solid #aebd38;
    font-size: 20;
  `;

  const Option = styled.option`
    font-size: 26px;
    font-weight: 600;
    color: #000;
    display: flex;
    justify-content: center;
    overflow: auto;
    float: center;
    text-transform: uppercase;
  `;

  return (
    <>
      <Flex justifyCenter>
        <Select name="choice" onChange={handleSetTableView}>
          <Option
            value="accountability"
            selected={tableView === "accountability"}
          >
            Accountability
          </Option>
          <Option value="weapons" selected={tableView === "weapons"}>
            Weapons
          </Option>
          <Option value="gear" selected={tableView === "gear"}>
            Gear
          </Option>
          <Option value="body" selected={tableView === "body"}>
            Body
          </Option>
          <Option value="zaps" selected={tableView === "zaps"}>
            Zaps
          </Option>
        </Select>
      </Flex>

      {tableView === "accountability" && <ViewAccountability />}
      {tableView === "zaps" && <ViewZaps />}
      {tableView === "weapons" && <ViewWeapons />}
      {tableView === "body" && <ViewBody />}
    </>
  );
}

export default SquadTable;
