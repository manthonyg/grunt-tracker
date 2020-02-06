import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
//Packages
import { Table } from "reactstrap";
import styled from "styled-components";
//Global components
import Banner from "../../../../../components/Banner";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Button";
//Services
import { updateMarineById } from "../../../../../services/marineServices";
import { getAllMarinesInSquad } from "../../../../../services/squadServices";
//Context
import { SquadPageContext } from "../../../SquadPage";
//Media
import View from "../../../../../images/external-link-blue.svg";
import AddUser from "../../../../../images/add-user.svg";

const Switch = styled.input.attrs({ type: "checkbox" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3.5em;
  height: 1.5em;
  background: #505160;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;

  &::after {
    position: absolute;
    content: "";
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
    transform: scale(0.7);
    left: 0;
    transition: all 0.2s ease-in-out;
  }

  &:checked {
    background: #aebd38;
  }

  &:checked:after {
    left: calc(100% - 1.5em);
  }
`;

const StyledLink = styled(Link)`
  color: #68829e;
`;

function ViewAccountability() {
  const dataProvider = useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const setMarineData = dataProvider.setMarineData;
  const squadData = dataProvider.squadData;
  const setCurrentView = dataProvider.setCurrentView;

  const handleSetCurrentView = () => {
    setCurrentView("addMarine");
  };

  const accountabilitySwitches = Array.from(
    document.querySelectorAll(".switch")
  );
  const accountabilityButtons = Array.from(
    document.querySelectorAll(".accountability-button")
  );

  document.querySelectorAll(".accountability-button");

  const handleMarkAll = evt => {
    accountabilityButtons.map(
      accountabilityButton => (accountabilityButton.disabled = true)
    );
    const data = {
      accountedFor: evt.currentTarget.id === "accounted" ? true : false
    };

    accountabilitySwitches.map(
      accountabilitySwitch =>
        (accountabilitySwitch.checked =
          evt.currentTarget.id === "accounted" ? true : false)
    );

    getAllMarinesInSquad(squadData._id)
      .then(res => {
        setMarineData(res);
        accountabilityButtons.map(
          accountabilityButton => (accountabilityButton.disabled = false)
        );
      })
      .catch(err => console.log("Error in getAllMarinesInSquad: ", err));

    marineData.map(marine => {
      updateMarineById(marine._id, data)
        .then(res => console.log(res))
        .catch(err => console.log("Error while updating marine by id: ", err));
    });
  };

  const handleChange = evt => {
    const id = evt.target.id;
    const checked = evt.target.checked;
    const current_date = new Date();

    const data = {
      id: id,
      accountedFor: checked,
      date: current_date
    };

    updateMarineById(data.id, data)
      .then(res => console.log(res))
      .catch(err => console.log("Error while updating marine by id: ", err));

    getAllMarinesInSquad(squadData._id)
      .then(res => {
        setMarineData(res);
      })
      .catch(err => console.log("Error in getAllMarinesInSquad: ", err));
  };

  return (
    <>
      <Flex justifyBetween>
        <Button
          inverted
          small
          className="accountability-button"
          onClick={handleMarkAll}
          id="accounted"
        >
          All Accounted
        </Button>
        <Button
          inverted
          small
          className="accountability-button"
          onClick={handleMarkAll}
          id="unaccounted"
        >
          All Unaccounted
        </Button>
      </Flex>
      <Table responsive>
        {!!marineData && !!marineData.length ? (
          <thead>
            <tr>
              <th>View</th>
              <th>Rank</th>
              <th>Last</th>
              <th>Accountability</th>
              <th>Billet</th>
            </tr>
          </thead>
        ) : (
          <Flex justifyAround>
            <Banner secondary>Add Members to Squad</Banner>
            <img
              onClick={handleSetCurrentView}
              src={AddUser}
              style={{ width: "3rem" }}
            />
          </Flex>
        )}

        {!!marineData && !!marineData.length && (
          <tbody>
            {marineData.map((marine, i) => (
              <tr key={marine._id}>
                <th scope="row">
                  <StyledLink
                    key={`${marine._id}`}
                    to={`/show-marine/${marine._id}`}
                  >
                    <img src={View} style={{ width: "1.5rem" }} />
                  </StyledLink>
                </th>
                <td>{marine.rank}</td>
                <td>{marine.last}</td>
                <td>
                  <Switch
                    key={marine._id}
                    className={"switch"}
                    defaultChecked={marine.accountability.accountedFor}
                    id={marine._id}
                    onChange={handleChange}
                  />
                </td>
                <td>{marine.billet}</td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </>
  );
}

export default ViewAccountability;
