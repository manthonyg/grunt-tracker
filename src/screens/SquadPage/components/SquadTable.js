import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Packages
import { Table } from "reactstrap";
import styled from "styled-components";
//Global components
import Banner from "../../../components/Banner";
//Services
import { updateMarineById } from "../../../services/marineServices";

const Switch = styled.input.attrs({ type: "checkbox" })`
	-webkit-appearance: none;
	   -moz-appearance: none;
	        appearance: none;
	width: 3.5em;
	height: 1.5em;
	background: #ddd;
	border-radius: 3em;
	position: relative;
	cursor: pointer;
	outline: none;
	-webkit-transition: all .2s ease-in-out;
	transition: all .2s ease-in-out;

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

function SquadTable({ marines }) {

const [ accountability, setAccountability ] = 
useState(marines
  .map(marine => 
({id: marine._id, checked: marine.accountability.accountedFor})))

  const handleChange = evt => {
    const id = evt.target.id
    const checked = evt.target.checked

    setAccountability(prevState => {
      return {
        ...prevState,
        id: id,
        checked: checked
      }
    })
    console.log(accountability)
  }

  useEffect(() => {
const current_datetime = new Date()
let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() 
console.log(formatted_date)
const data = {
  id: accountability.id,
  accountedFor: accountability.checked,
  date: formatted_date
}
updateMarineById(data.id, data)
.then(res => console.log(res))
.catch(err => console.log(err))

return () => {console.log('cleanup')}

  }, [accountability])
  return (
    <Table responsive>
      {!!marines && marines.length ? (
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
      <tbody>
        {marines.map((marine, i) => (
          <tr>
            <th scope="row">
           
                {i + 1}
         
            </th>
            <td>{marine.rank}</td>
            <td>{marine.last}</td>
            <td>
            <Switch
              defaultChecked={marine.accountability.accountedFor}
              id={marine._id}
              // checked={isChecked}
              onChange={handleChange}
            />
            </td>
            <td> <StyledLink
                key={`${marine._id}`}
                to={`/show-marine/${marine._id}`}
              >
               
                <i class="material-icons">exit_to_app</i>
              </StyledLink></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SquadTable;
