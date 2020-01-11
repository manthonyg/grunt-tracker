import React, { useState, useEffect, useRef } from "react";
//Packages
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
//Global components
import Flex from "../../../components/Flex";
//Services
import { addMarineToSquad, getAllSquads } from "../../../services/squadServices";

function CreateMarine({ id }) {
  const [squadData, setSquadData] = useState([]);
  const componentIsMounted = useRef(true);

  useEffect(() => {
    getAllSquads()
      .then(res => {
        if (componentIsMounted.current) {
          setSquadData(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  const [formVisible, setFormVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const onDismiss = () => setAlertVisible(false);

  const [marineData, setMarineData] = useState({
    currentStep: 1,
    first: "",
    last: "",
    birthdate: "",
    rank: "",
    billet: "",
    edipi: "",
    blood_type: "",
    squad: "",
    team: "",
    zap: ""
  });
  console.log(marineData);

  const handleChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setMarineData(prevState => {
      return {
        ...prevState,
        [name]: val
      };
    });
  };

  const handleSubmit = event => {
    const data = {
      first: marineData.first,
      last: marineData.last,
      birthdate: marineData.birthdate,
      rank: marineData.rank,
      billet: marineData.billet,
      edipi: marineData.edipi,
      blood_type: marineData.blood_type,
      squad: marineData.squad,
      team: marineData.team,
      zap:
        marineData.first[0] +
        marineData.last[0] +
        marineData.edipi.substr(marineData.edipi.length - 5) +
        marineData.blood_type
    };

    event.preventDefault();

    addMarineToSquad(id, data)
      .then(res => {
        setMarineData({
          first: "",
          last: "",
          birthdate: "",
          rank: "",
          billet: "",
          edipi: "",
          blood_type: "",
          squad: "",
          team: "",
          callsign: "",
          zap: ""
        });
        setAlertVisible(true);
        setFormVisible(false);
      })
      .catch(err => {
        console.log("Error in CreateMarine", err);
      });
  };

  const _next = () => {
    let currentStep = marineData.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    setMarineData(prevState => {
      return {
        ...prevState,
        currentStep: currentStep
      };
    });
  };

  const _prev = () => {
    let currentStep = marineData.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setMarineData({
      currentStep: currentStep
    });
  };

  function previousButton() {
    let currentStep = marineData.currentStep;
    if (currentStep !== 1) {
      return <Button onClick={_prev}>Previous</Button>;
    }
  }

  function nextButton() {
    let currentStep = marineData.currentStep;
    if (currentStep < 3) {
      return <Button onClick={_next}>Next</Button>;
    }
  }

  return (
    <>
      {formVisible && (
        <Form onSubmit={handleSubmit}>
          <BasicInformation
            currentStep={marineData.currentStep}
            handleChange={handleChange}
            first={marineData.first}
            last={marineData.last}
            middle={marineData.middle}
            rank={marineData.rank}
            billet={marineData.billet}
          />

          <UnitInformation
            currentStep={marineData.currentStep}
            handleChange={handleChange}
            squad={marineData.squad}
            team={marineData.team}
            squadData={squadData}
          />
          <ZapInformation
            currentStep={marineData.currentStep}
            handleChange={handleChange}
            edipi={marineData.edipi}
            blood_type={marineData.blood_type}
            zap={marineData.zap}
          />
          <Container>
            <Flex justifyBetween>
              {previousButton()}
              {nextButton()}
            </Flex>
          </Container>
        </Form>
      )}

      <Alert color="success" isOpen={alertVisible} toggle={onDismiss}>
        <Flex justifyAround>Marine successfully added</Flex>
      </Alert>
    </>
  );
}

function BasicInformation(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <Container>
      <FormGroup>
        <Label for="first">First</Label>
        <Input
          bsSize="sm"
          name="first"
          id="first"
          onChange={props.handleChange}
          value={props.first}
        />
      </FormGroup>

      <FormGroup>
        <Label for="birthdate">Last</Label>
        <Input
          bsSize="sm"
          name="last"
          id="last"
          onChange={props.handleChange}
          value={props.last}
        />
      </FormGroup>

      <FormGroup>
        <Label for="birthdate">Birthdate</Label>
        <Input
          bsSize="sm"
          type="date"
          name="birthdate"
          id="birthdate"
          onChange={props.handleChange}
          value={props.birthdate}
        />
      </FormGroup>

      <FormGroup>
        <Label for="birthdate">Rank</Label>
        <Input
          type="select"
          name="rank"
          id="rank"
          onChange={props.handleChange}
          value={props.rank}
        >
          <option>PVT</option>
          <option>PFC</option>
          <option>LCPL</option>
          <option>CPL</option>
          <option>SGT</option>
        </Input>
      </FormGroup>
    </Container>
  );
}

function UnitInformation(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <Container>
      <FormGroup>
        <Label for="squad">Squad</Label>
        <Input
          bsSize="sm"
          type="select"
          name="squad"
          id="squad"
          onChange={props.handleChange}
          value={props.squad}
        >
          {props.squadData.map(squad => (
            <option>
              {squad.company}
              {squad.platoon}
              {squad.squad}
            </option>
          ))}
        </Input>
      </FormGroup>
    </Container>
  );
}

function ZapInformation(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <>
      <Container>
        <FormGroup>
          <Label for="edipi">EDIPI</Label>
          <Input
            bsSize="sm"
            name="edipi"
            id="edipi"
            onChange={props.handleChange}
            value={props.edipi}
          />
        </FormGroup>

        <FormGroup>
          <Label for="blood_type">Blood Type</Label>
          <Input
            bsSize="sm"
            type="select"
            name="blood_type"
            id="blood_type"
            onChange={props.handleChange}
            value={props.blood_type}
          >
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </Input>
        </FormGroup>
      </Container>

      <Container>
        <Flex justifyAround>
          <Button type="submit">Add Marine</Button>
        </Flex>
      </Container>
    </>
  );
}

export default CreateMarine;
