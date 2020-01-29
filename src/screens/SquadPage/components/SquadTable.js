import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//Packages
import { Table } from "reactstrap";
import styled from "styled-components";
//Global components
import Banner from "../../../components/Banner";
//Services
import { updateMarineById } from "../../../services/marineServices";
import { getAllMarinesInSquad } from "../../../services/squadServices";
//Context
import { SquadPageContext } from "../SquadPage";

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

function SquadTable() {
  const dataProvider = useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const setMarineData = dataProvider.setMarineData;
  const squadData = dataProvider.squadData;

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
      .then(console.log(marineData))
      .catch(err => console.log("Error while updating marine by id: ", err));

    getAllMarinesInSquad(squadData._id)
      .then(res => {
        setMarineData(res);
      })
      .catch(err => console.log("Error in getAllMarinesInSquad: ", err));
  };

  return (
    <Table responsive>
      {!!marineData && !!marineData.length ? (
        <thead>
          <tr>
            <th>#</th>
            <th>Rank</th>
            <th>Last</th>
            <th>Accountability</th>
          </tr>
        </thead>
      ) : (
        <Banner secondary>Add Members to Squad</Banner>
      )}

      {!!marineData && !!marineData.length && (
        <tbody>
          {marineData.map((marine, i) => (
            <tr
              key={marine._id}
              style={{
                backgroundColor: marine.accountability.accountedFor
                  ? "#505160"
                  : "#68829e60"
              }}
            >
              <th
                scope="row"
                style={{
                  color: marine.accountability.accountedFor ? "white" : "black"
                }}
              >
                {i + 1}
              </th>
              <td
                style={{
                  color: marine.accountability.accountedFor ? "white" : "black"
                }}
              >
                {marine.rank}
              </td>
              <td
                style={{
                  color: marine.accountability.accountedFor ? "white" : "black"
                }}
              >
                {marine.last}
              </td>
              <td>
                <Switch
                  key={marine._id}
                  defaultChecked={marine.accountability.accountedFor}
                  id={marine._id}
                  onChange={handleChange}
                />
              </td>
              <td>
                <StyledLink
                  key={`${marine._id}`}
                  to={`/show-marine/${marine._id}`}
                >
                  <i className="material-icons">exit_to_app</i>
                </StyledLink>
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
}

export default SquadTable;
