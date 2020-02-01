import React, { useState } from "react";
//Packages
import { FormGroup, Label, Input, Container } from "reactstrap";
import { Alert } from "reactstrap";
import styled from "styled-components";
//Global components
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Flex from "../components/Flex";
import Logo from "../components/Logo";
//Services
import { createSquad } from "../services/squadServices";
//Media
import BG from "../images/GT_Bg.png";

const StyledAlert = styled(Alert)`
  background-color: ${props => {
    if (props.success) return "#AED33880 !important";
    return "#505160 !important";
  }};
`;

const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  wrap: no-wrap;
  height: 12rem;
  margin-top: 2rem;
  width: 100vw;
  background-color: #fff;
  background-image: url(${BG});
  background-size: 150%, 25%, 25%;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0.04em;
`;

function CreateSquad(props) {
  const [squadData, setSquadData] = useState({
    company: "",
    squad: "",
    platoon: "",
    callsign: ""
  });

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

    createSquad(data)
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
      <Banner>Grunttracker</Banner>
      <Header id="header">
        <Flex justifyCenter alignEnd>
          <Logo size="3" />
          <Logo inverted size="1" />
          <Logo inverted size="1" />
          <Logo inverted size="1" />
        </Flex>
      </Header>
      <Banner>
        <strong>Create Squad</strong>
      </Banner>
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

          <StyledAlert success isOpen={successVisible} toggle={onSucDismiss}>
            <Flex justifyAround>Squad added!</Flex>
          </StyledAlert>
          <StyledAlert
            color="danger"
            isOpen={errorVisible}
            toggle={onErrDismiss}
          >
            Failed to add squad
          </StyledAlert>
        </Container>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
}

export default CreateSquad;
