import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
//Packages
import { Table } from "reactstrap";
import styled from "styled-components";
//Global components
import Banner from "../../../components/Banner";
import Flex from "../../../components/Flex";
import Button from "../../../components/Button";
//Services
import { updateMarineById } from "../../../services/marineServices";
import { getAllMarinesInSquad } from "../../../services/squadServices";
//Context
import { SquadPageContext } from "../SquadPage";
//Media
import View from "../../../images/external-link-blue.svg";
import AddUser from "../../../images/addnew-user2.svg";
import AddExistingUser from "../../../images/addexisting-user.svg";

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

const FlexBox = styled.div`
  display: flex;
  height: 73.5vh;
  justify-content: space-around;
  flex-flow: column nowrap;
  align-items: stretch;
  box-sizing: border-box;
  overflow: scroll;
`;

const FlexItem = styled.div`
  justify-content: center;
  padding: .25rem;
  overflow: auto;
  background-color: #68829e;
  color: #000;
  border-bottom: 4px solid #fff;
  filter: ${props => {
    if (props.selected) return ``;
    return `opacity(40%);`;
  }}
  box-sizing: border-box;
  flex-grow: ${props => {
    if (props.selected) return "10";
    return "1";
  }};
  &:nth-child(2n) {
    background-color: #68829e;
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

  const changeCurrentView = evt => {
    setCurrentView(evt.currentTarget.id);
  };

  const [isSelected, setIsSelected] = useState({
    addNew: true,
    addExisting: false
  });
  const handleSelectedFlexItem = evt => {
    const id = evt.currentTarget.id;
    setIsSelected(prevState => {
      return {
        addNew: false,
        addExisting: false,
        [id]: !isSelected.id
      };
    });
  };
  const accountabilitySwitches = Array.from(
    document.querySelectorAll(".switch")
  );
  const accountabilityButtons = Array.from(
    document.querySelectorAll(".accountability-button")
  );

  document.querySelectorAll(".accountability-button");

  const toggleMarkAll = evt => {
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
      .then(wait(1000))
      .then(
        marineData.map(marine => {
          updateMarineById(marine._id, data)
            //"shim" the request to make sure it can update on UI when setMarineData get called
            .then(wait(200))
            .then(res => console.log(res))
            .catch(err =>
              console.log("Error while updating marine by id: ", err)
            );
        })
      )
      .catch(err => console.log("Error in getAllMarinesInSquad: ", err));
  };

  const wait = (ms = 0) => {
    return new Promise((res, rej) => setTimeout(res, ms));
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
      //"shim" the request to make sure it can update on UI when setMarineData get called
      .then(wait(200))
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
      {marineData && marineData.length ? (
        <>
          <Flex justifyAround>
            <Button
              className="accountability-button"
              onClick={toggleMarkAll}
              id="accounted"
            >
              All Accounted
            </Button>
            <Button
              className="accountability-button"
              onClick={toggleMarkAll}
              id="unaccounted"
            >
              All Unaccounted
            </Button>
          </Flex>

          <Table responsive>
            <thead>
              <tr>
                <th>
                  <i
                    className="material-icons"
                    onClick={changeCurrentView}
                    src={AddUser}
                    id={"add-new-marine"}
                    style={{ fontSize: "1.75rem", color: "#68829e" }}
                  >
                    person_add
                  </i>
                </th>
                <th>RANK</th>
                <th>LAST</th>
                <th>ACCOUNTED</th>
              </tr>
            </thead>

            <tbody
              style={{
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              {marineData.map((marine, i) => (
                <tr
                  style={{
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                  key={marine._id}
                >
                  <th
                    scope="row"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center"
                    }}
                  >
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
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <Flex alignCenter justifyCenter>
            <Banner secondary>Add members to start!</Banner>
          </Flex>

          <FlexBox>
            <FlexItem
              selected={isSelected.addNew}
              onClick={handleSelectedFlexItem}
              id="addNew"
            >
              <Banner white>
                add <strong>new</strong>
              </Banner>
              {isSelected.addNew && (
                <Flex justifyCenter>
                  <img
                    onClick={changeCurrentView}
                    src={AddUser}
                    id={"add-new-marine"}
                    style={{ height: "8rem" }}
                  />
                  <Banner small white>
                    Create a new Marine to add to the Squad
                  </Banner>
                </Flex>
              )}
            </FlexItem>

            <FlexItem
              selected={isSelected.addExisting}
              onClick={handleSelectedFlexItem}
              id="addExisting"
            >
              <Banner white>
                add <strong>existing</strong>
              </Banner>

              {isSelected.addExisting && (
                <Flex justifyCenter>
                  <img
                    onClick={changeCurrentView}
                    src={AddExistingUser}
                    id={"add-existing-marine"}
                    style={{ height: "8rem" }}
                  />
                  <Banner small white>
                    View existing Marines and add to the squad
                  </Banner>
                </Flex>
              )}
            </FlexItem>
          </FlexBox>
        </>
      )}
    </>
  );
}

export default ViewAccountability;
