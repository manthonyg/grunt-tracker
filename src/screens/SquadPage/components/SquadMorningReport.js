import React, { useState, useCallback, useEffect } from "react";

//Packages
import styled from "styled-components";
//Global components
import Badge from "../../../components/Badge";
import Flex, { Column } from "../../../components/Flex";
import Button from "../../../components/Button";
import Banner from "../../../components/Banner";
import Loader from "../../../components/Loader";
//Services
import { updateMarineById } from "../../../services/marineServices";

function SquadMorningReport({ marines }) {

  const [, updateState] = useState();
const forceUpdate = useCallback(() => updateState({}), []);

  const Wrapper = styled.div`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 200px;
    margin: 50vh auto 0;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  `;


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
  const [checkedItems, setCheckedItems] = useState({
    id: "",
    checked: false,
    date: ""
  });

  const [isChecked, setIsChecked] = useState()
  const handleChange = evt => {
    evt.persist()
 
    const id = evt.target.id;
    const checked = evt.target.checked;
    setCheckedItems(prevState => {
      return {
        ...prevState,
        id: id,
        checked: checked
      };
    });
    setIsChecked(!evt.target.defaultChecked)
  };
  console.log(checkedItems);

  useEffect(() => {
    const date = new Date();
    const data = {
      id: checkedItems.id,
      accountedFor: checkedItems.checked,
      date: date
    };
    console.log(data);
    updateMarineById(data.id, data)
      .then(res => {})
      .catch(err => {
        console.log("Error in updateMarineById_SquadMorningReport", err);
      });
    return () => {}
  }, [checkedItems]);

  //get basic styling down that I am happy with atleast for now
  TODO: //get the state to represent an array of objcts with an _id field
  //read about mongoose/mongo $in operator anf see the fesiblibty of being able to update
  //the documents this way
  //update the schemas of marines to include an accountability field
  //updte the squad schema to also have an accountability field
  //create a service and a route for this action that will update both at once
  //the squad should have an array of marines IDs that are ccounted for
  //the marine should have a time and date stamp as well as a boolean value
  //for there accountability
  //test test test

  return (
  <>

      {marines.map((marine, i) => (
      <>
      {marine.last}
            <Switch
              defaultChecked={marine.accountability.accountedFor}
              id={marine._id}
              checked={isChecked}
              onChange={handleChange}
            />
         </>
       
      ))}
</>
  );
}

export default SquadMorningReport;
