import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FormGroup, Label, Input, Container } from "reactstrap";
import { Alert } from "reactstrap";
import Loader from "../components/Loader";
import HeaderBanner from "../components/HeaderBanner";
import Button from "../components/Button";
import Flex from "../components/Flex";
function CreateSquad(props) {
  const [squadData, setSquadData] = useState({
    company: "",
    squad: "",
    platoon: "",
    callsign: ""
  });
  console.log(squadData);

  const handleChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setSquadData(prevState => {
      return { ...prevState, [name]: val };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const data = {
      company: squadData.company,
      squad: squadData.squad,
      platoon: squadData.platoon,
      callsign: squadData.company + squadData.platoon + squadData.squad
    };

    axios
      .post("http://localhost:8082/api/squads", data)
      .then(res => {
        setSquadData({
          company: "",
          squad: "",
          platoon: "",
          callsign: ""
        });
        setSuccessVisible(true);
      })
      .catch(err => {
        console.log("Error in CreateSquad");
        setErrorVisible(true);
      });
  };

  const [successVisible, setSuccessVisible] = useState(false);
  const onSucDismiss = () => setSuccessVisible(false);

  const [errorVisible, setErrorVisible] = useState(false);
  const onErrDismiss = () => setErrorVisible(false);

  return (
    <>
      <HeaderBanner>
        <strong>Create Squad</strong>
      </HeaderBanner>
      {squadData ? (
        <Container>
          <FormGroup>
            <Label for="company">Company</Label>
            <Input
              type="select"
              name="company"
              id="company"
              onChange={handleChange}
              value={props.company}
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
              <option>F</option>
              <option>G</option>
              <option>H</option>
              <option>I</option>
              <option>J</option>
              <option>K</option>
              <option>L</option>
              <option>M</option>
              <option>W</option>
            </Input>

            <Label for="platoon">Platoon</Label>
            <Input
              type="select"
              name="platoon"
              id="platoon"
              onChange={handleChange}
              value={props.platoon}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>WPNS</option>
              <option>HQ</option>
            </Input>

            <Label for="squad">Squad</Label>
            <Input
              type="select"
              name="squad"
              id="squad"
              onChange={handleChange}
              value={props.squad}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>HQ</option>
            </Input>

            <Button onClick={handleSubmit}>Submit</Button>
          </FormGroup>

          <Alert color="success" isOpen={successVisible} toggle={onSucDismiss}>
            <Flex justifyAround>
              Squad added
              <Button>
                <Link to={"/"}>View</Link>
              </Button>
            </Flex>
          </Alert>
          <Alert color="danger" isOpen={errorVisible} toggle={onErrDismiss}>
            Failed to add squad
          </Alert>
        </Container>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default CreateSquad;
