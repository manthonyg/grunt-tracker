import React, { useState } from "react";
//Packages
import TimeField from "react-simple-timefield";
import { FormGroup, Label, Input, Container } from "reactstrap";
import { Alert, Form } from "reactstrap";
import { Link } from "react-router-dom";
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

function CreateSquad() {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleAlert = () => setAlertVisible(!alertVisible);

  const [inputData, setInputData] = useState({
    currentStep: 1,
    company: "",
    platoon: "",
    squad: "",
    callsign: "",
    morningFormation: "",
    afternoonFormation: ""
  });

  console.log(inputData);

  const handleChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setInputData(prevState => {
      return {
        ...prevState,
        [name]: val
      };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    createSquad(inputData)
      .then(res => {
        setInputData({
          company: "",
          squad: "",
          platoon: "",
          callsign: "",
          morningFormation: "",
          afternoonFormation: ""
        });
        console.log("Squad created successfully");
        setAlertVisible(true);
      })
      .catch(err => {
        console.log("Error in CreateSquad");
      });
  };

  const _next = () => {
    let currentStep = inputData.currentStep;
    currentStep = currentStep === 1 ? 2 : currentStep;
    setInputData(prevState => {
      return {
        ...prevState,
        currentStep: currentStep
      };
    });
  };

  const _prev = () => {
    let currentStep = inputData.currentStep;
    currentStep = currentStep === 2 ? 1 : currentStep;
    setInputData(prevState => {
      return {
        ...prevState,
        currentStep: currentStep
      };
    });
  };

  function previousButton() {
    let currentStep = inputData.currentStep;
    if (currentStep === 2) {
      return <Button onClick={_prev}>Previous</Button>;
    }
  }

  function nextButton() {
    let currentStep = inputData.currentStep;
    if (currentStep === 1) {
      return <Button onClick={_next}>Next</Button>;
    }
  }

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

      <Form onSubmit={handleSubmit}>
        <SquadInformation
          currentStep={inputData.currentStep}
          handleChange={handleChange}
          company={inputData.company}
          platoon={inputData.platoon}
          squad={inputData.squad}
          callsign={inputData.callsign}
        />

        <ScheduleInformation
          currentStep={inputData.currentStep}
          handleChange={handleChange}
          morningFormation={inputData.morningFormation}
          afternoonFormation={inputData.afternoonFormation}
        />

        <Container>
          <Flex justifyBetween>
            {previousButton()}
            {nextButton()}
          </Flex>
        </Container>
      </Form>

      <StyledAlert success isOpen={alertVisible} toggle={handleAlert}>
        <Flex justifyAround>
          <Link to="/">
            <Button>View Squad</Button>
          </Link>
        </Flex>
      </StyledAlert>
    </>
  );
}

function SquadInformation({
  currentStep,
  handleChange,
  company,
  platoon,
  squad
}) {
  if (currentStep !== 1) {
    return null;
  }
  return (
    <Container>
      <FormGroup>
        <Label for="company">Company</Label>
        <Input
          type="select"
          name="company"
          id="company"
          onChange={handleChange}
          value={company}
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
          bsSize="sm"
          name="platoon"
          type="select"
          id="platoon"
          onChange={handleChange}
          value={platoon}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>HQ</option>
          <option>WPNS</option>
        </Input>

        <Label for="squad">Squad</Label>
        <Input
          bsSize="sm"
          name="squad"
          type="select"
          id="squad"
          onChange={handleChange}
          value={squad}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>WPNS</option>
          <option>HQ</option>
        </Input>
      </FormGroup>
    </Container>
  );
}

function ScheduleInformation({
  currentStep,
  handleChange,
  morningFormation,
  afternoonFormation
}) {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <Container>
      <FormGroup>
        <Label for="morningFormation">What time is morning formation?</Label>

        <TimeField
          name="morningFormation"
          id="morningFormation"
          value={morningFormation}
          onChange={handleChange}
          input={<Input />}
          colon=":"
        />

        <Label for="afternoonFormation">
          What time is afternoon formation?
        </Label>

        <TimeField
          name="afternoonFormation"
          id="afternoonFormation"
          value={afternoonFormation}
          onChange={handleChange}
          input={<Input />}
          colon=":"
        />
      </FormGroup>

      <Flex justifyAround>
        <Button type="submit">Create Squad</Button>
      </Flex>
    </Container>
  );
}

export default CreateSquad;
