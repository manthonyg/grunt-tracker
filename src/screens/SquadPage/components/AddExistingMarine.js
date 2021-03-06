import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//Packages
import { Alert, Form } from "reactstrap";
import styled from "styled-components";
//Global components
import Flex, { Column } from "../../../components/Flex";
import Banner from "../../../components/Banner";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
//Services
import { addExistingMarine } from "../../../services/squadServices";
import { getAllMarines } from "../../../services/marineServices";
//Context
import { SquadPageContext } from "../../SquadPage/SquadPage";
//Media
import AddUserSquad from "../../../images/adduser-squad.svg";

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

function AddExistingMarine({ id }) {
  const dataProvider = useContext(SquadPageContext);

  const squadData = dataProvider.squadData;
  const setCurrentView = dataProvider.setCurrentView;
  const changeCurrentView = evt => {
    setCurrentView(evt.currentTarget.value);
  };
  const currentView = dataProvider.currentView;
  const [marines, setMarines] = useState([]);
  let selectedMarines = [];
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    getAllMarines().then(marines => {
      setMarines(marines);
    });
  }, []);

  const onDismiss = () => {
    setAlertVisible(!alertVisible);
  };
  const toggleCheck = evt => {
    console.log(evt.currentTarget.value);
    if (!!evt.currentTarget.checked) {
      selectedMarines.push(evt.currentTarget.value);
    }
  };

  const wait = (ms = 0) => {
    return new Promise((res, rej) => setTimeout(res, ms));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    let marineData = selectedMarines.map(marine => JSON.parse(marine));

    addExistingMarine(squadData._id, marineData)
      .then((res, err) => {
        if (res) console.log(res);
        if (err) console.log(err);
      })
      .then(wait(1000))
      .then(setCurrentView("accountability"))
      .then(wait(1000))
      .catch(err => console.log(err));
    marineData = [];
  };

  return (
    <>
      <Banner secondary header>
        Add Existing Marine(s)
      </Banner>
      <Card>
        {selectedMarines.map(marine => (
          <li>{marine}</li>
        ))}
      </Card>
      <Banner small green>
        there are
      </Banner>
      <Banner>{marines.length || 0}</Banner>
      <Banner small green>
        existing marines
      </Banner>
      <Form onSubmit={handleSubmit}>
        {marines && !!marines.length ? (
          <Flex justifyCenter>
            {marines.map(marine => (
              <Column three key={marine._id}>
                <Banner small green>
                  {marine.rank} {marine.last}
                </Banner>
                <Switch
                  value={JSON.stringify(marine._id)}
                  id={marine._id}
                  onChange={toggleCheck}
                />
              </Column>
            ))}
            <Flex justifyCenter>
              <Button type="submit">Add Marines</Button>
            </Flex>
          </Flex>
        ) : (
          <Flex justifyCenter>
            <Flex justifyCenter>
              <img src={AddUserSquad} style={{ width: "80vw" }}></img>
            </Flex>
            <Button value="add-new-marine" onClick={changeCurrentView}>
              create new
            </Button>
          </Flex>
        )}
      </Form>

      <Alert color="success" isOpen={alertVisible} toggle={onDismiss}>
        <Flex justifyAround>Marine successfully added</Flex>
        <Link to={`/show-squad/${id}`}>
          <Button>View</Button>
        </Link>
      </Alert>
    </>
  );
}

export default AddExistingMarine;
