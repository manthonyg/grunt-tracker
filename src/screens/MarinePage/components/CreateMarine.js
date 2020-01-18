import React, { useState, useContext } from "react";
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
import Banner from "../../../components/Banner";
//Services
import {
  addMarineToSquad
} from "../../../services/squadServices";
//Context
import { SquadPageContext } from "../../SquadPage/SquadPage";

function CreateMarine({ id }) {

  const dataProvider = useContext(SquadPageContext)

  const marineData = dataProvider.marineData
  const setMarineData = dataProvider.setMarineData
  const setStateIsUpdated = dataProvider.setStateIsUpdated
  const stateIsUpdated = dataProvider.stateIsUpdated


console.log('marineData', marineData)
  const squadData = dataProvider.squadData
  const setSquadData = dataProvider.setSquadData

  const [formVisible, setFormVisible] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const onDismiss = () => setAlertVisible(false);

  const [inputData, setInputData] = useState({
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

  const handleSubmit = event => {
    const data = {
      first: inputData.first,
      last: inputData.last,
      middle: '',
      rank: inputData.rank,
      unit: '',
      company: '',
      platoon: '',
      squad: inputData.squad,
      team: inputData.team,
      edipi: inputData.edipi,
      blood_type: inputData.blood_type,
      religion: '',
    }

    event.preventDefault();
    //Im optimistic
    // setMarineData(prevState => {
    //   return {
    //     ...prevState,
        
    //   }
    // })
    setStateIsUpdated(!stateIsUpdated)
 

    addMarineToSquad(id, data)
      .then(res => {
        setInputData({
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
      return() => {
      }
    }


  const _next = () => {
    let currentStep = inputData.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    setInputData(prevState => {
      return {
        ...prevState,
        currentStep: currentStep
      };
    });
  };

  const _prev = () => {
    let currentStep = inputData.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setInputData({
      currentStep: currentStep
    });
  };

  function previousButton() {
    let currentStep = inputData.currentStep;
    if (currentStep !== 1) {
      return <Button onClick={_prev}>Previous</Button>;
    }
  }

  function nextButton() {
    let currentStep = inputData.currentStep;
    if (currentStep < 3) {
      return <Button onClick={_next}>Next</Button>;
    }
  }

  return (
    <>
      {formVisible && (
        <Form onSubmit={handleSubmit}>
          <BasicInformation
            currentStep={inputData.currentStep}
            handleChange={handleChange}
            first={inputData.first}
            last={inputData.last}
            middle={inputData.middle}
            rank={inputData.rank}
            billet={inputData.billet}
          />

          <UnitInformation
            currentStep={inputData.currentStep}
            handleChange={handleChange}
            squad={inputData.squad}
            team={inputData.team}
            squadData={squadData}
          />
          <ZapInformation
            currentStep={inputData.currentStep}
            handleChange={handleChange}
            edipi={inputData.edipi}
            blood_type={inputData.blood_type}
            zap={inputData.zap}
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
     <Banner>{props.squadData.callsign}</Banner>
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
