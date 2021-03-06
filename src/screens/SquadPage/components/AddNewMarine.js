import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
//Packages
import { Alert, Form, FormGroup, Label, Input, Container } from "reactstrap";
import styled from "styled-components";
//Global components
import Flex, { Column } from "../../../components/Flex";
import Banner from "../../../components/Banner";
import Button from "../../../components/Button";
//Services
import { addMarineToSquad } from "../../../services/squadServices";
//Context
import { SquadPageContext } from "../SquadPage";

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

const SwitchLabel = styled.label`
  display: flex;
  justify-content: center;
  text-transform: uppercase;
`;

function AddNewMarine({ id }) {
  const dataProvider = useContext(SquadPageContext);

  const squadData = dataProvider.squadData;
  const setCurrentView = dataProvider.setCurrentView;

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
    zap: "",
    m4: false,
    m27: false,
    m38: false,
    m203: false,
    peq15: false,
    peq16: false,
    rco: false,
    sdo: false,
    leupold: false,
    pas28: false,
    pvs24: false,
    pvs14: false,
    foretrex: false,
    compass: false,
    binos: false
  });

  /*TODO
I think the reason I can't get this to work quite right is because I don't have a way to clone
an object deep without lodash .cloneDeep, or looking up an alternative method. When a box is
checked, the entire parent object is overwritten by it. prevState doesn't "fill in" the unaltered properties
like I want it to. For now I can keep the objects shallow (like in the inputData above) and massage the data to be what 
I need it to be, but I need to address this*/

  const handleCheck = evt => {
    const name = evt.currentTarget.name;
    const checked = evt.currentTarget.checked;
    console.log(inputData);
    setInputData(prevState => {
      return {
        ...prevState,
        [name]: checked
      };
    });
  };
  console.log(inputData);
  const handleChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;

    setInputData(prevState => {
      return {
        ...prevState,
        zap: `${inputData.first[0]}${inputData.last[0]}${inputData.edipi.slice(
          -5
        )}${inputData.blood_type}`,
        [name]: val
      };
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const massagedData = {
      currentStep: inputData.currentStep,
      first: inputData.first,
      last: inputData.last,
      birthdate: inputData.birthdate,
      rank: inputData.rank,
      billet: inputData.billet,
      edipi: inputData.edipi,
      blood_type: inputData.blood_type,
      squad: inputData.squad,
      team: inputData.team,
      zap: inputData.zap,

      primary: {
        m4: inputData.m4,
        m27: inputData.m27,
        m38: inputData.m38,
        m203: inputData.m203,
        peq15: inputData.peq15,
        peq16: inputData.peq16
      },

      optics: {
        rco: inputData.rco,
        sdo: inputData.sdo,
        leupold: inputData.leupold,
        pas28: inputData.pas28,
        pvs24: inputData.pvs24,
        pvs14: inputData.pvs14
      },

      supplementary: {
        peq15: inputData.peq15,
        peq16: inputData.peq16,
        foretrex: inputData.foretrex,
        compass: inputData.compass,
        binos: inputData.binos
      }
    };

    addMarineToSquad(id, massagedData)
      .then(res => {
        setInputData({
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
          zap: "",

          primary: {
            m4: false,
            m27: false,
            m38: false,
            m203: false,
            peq15: false,
            peq16: false
          },

          optics: {
            rco: false,
            sdo: false,
            leupold: false,
            pas28: false,
            pvs24: false,
            pvs14: false
          },

          supplementary: {
            peq15: false,
            peq16: false,
            foretrex: false,
            compass: false,
            binos: false
          }
        });
        setAlertVisible(true);
        setCurrentView("accountability");
      })
      .catch(err => {
        console.log("Error in AddNewMarine", err);
      });
  };

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
    setInputData(prevState => {
      return {
        ...prevState,
        currentStep: currentStep
      };
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
      <Banner header>
        <strong>Add New Marine</strong>
      </Banner>

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

        <EDLInformation
          currentStep={inputData.currentStep}
          handleCheck={handleCheck}
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
      </Form>

      <Flex justifyBetween>
        {previousButton()}
        {nextButton()}
        <hr></hr>
      </Flex>

      <Alert color="success" isOpen={alertVisible} toggle={onDismiss}>
        <Flex justifyAround>Marine successfully added</Flex>
        <Link to={`/show-squad/${id}`}>
          <Button>View</Button>
        </Link>
      </Alert>
    </>
  );
}

function BasicInformation({
  currentStep,
  handleChange,
  first,
  last,
  birthdate,
  rank
}) {
  if (currentStep !== 1) {
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
          onChange={handleChange}
          value={first}
        />

        <Label for="birthdate">Last</Label>
        <Input
          bsSize="sm"
          name="last"
          id="last"
          onChange={handleChange}
          value={last}
        />

        <Label for="birthdate">Birthdate</Label>
        <Input
          bsSize="sm"
          type="date"
          name="birthdate"
          id="birthdate"
          onChange={handleChange}
          value={birthdate}
        />

        <Label for="birthdate">Rank</Label>
        <Input
          type="select"
          name="rank"
          id="rank"
          onChange={handleChange}
          value={rank}
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

function EDLInformation({ currentStep, handleCheck }) {
  if (currentStep !== 2) {
    return null;
  }
  return (
    <>
      <Banner small green>
        Primary Weapon
      </Banner>
      <Flex justifyAround>
        <Column four>
          <Switch type="checkbox" id="m4" name="m4" onChange={handleCheck} />
          <SwitchLabel for="m4">M4</SwitchLabel>
        </Column>
        <Column four>
          <Switch type="checkbox" id="m27" name="m27" onChange={handleCheck} />
          <SwitchLabel for="m27">M27</SwitchLabel>
        </Column>
        <Column four>
          <Switch type="checkbox" id="m38" name="m38" onChange={handleCheck} />
          <SwitchLabel for="m38">M38</SwitchLabel>
        </Column>
        <Column four>
          <Switch type="checkbox" id="m32" name="m32" onChange={handleCheck} />
          <SwitchLabel for="m32">M32</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="m203"
            name="m203"
            onChange={handleCheck}
          />
          <SwitchLabel for="m203">M203</SwitchLabel>
        </Column>
        <Column four>
          <Switch type="checkbox" id="rco" name="rco" onChange={handleCheck} />
          <SwitchLabel for="rco">RCO</SwitchLabel>
        </Column>
        <Column four>
          <Switch type="checkbox" id="sdo" name="sdo" onChange={handleCheck} />
          <SwitchLabel for="sdo">SDO</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="peq15"
            name="peq15"
            onChange={handleCheck}
          />
          <SwitchLabel for="peq15">PEQ15</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="peq16"
            name="peq16"
            onChange={handleCheck}
          />
          <SwitchLabel for="peq16">peq16</SwitchLabel>
        </Column>
      </Flex>
      <hr />
      <Banner small green>
        Optics
      </Banner>
      <Flex justifyAround>
        <Column four>
          <Switch
            type="checkbox"
            id="pas28"
            name="pas28"
            onChange={handleCheck}
          />
          <SwitchLabel for="pas28">PAS28</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="pvs14"
            name="pvs14"
            onChange={handleCheck}
          />
          <SwitchLabel for="pvs14">PVS14</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="pvs24"
            name="pvs24"
            onChange={handleCheck}
          />
          <SwitchLabel for="pvs24">PVS24</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="leupold"
            name="leupold"
            onChange={handleCheck}
          />

          <SwitchLabel for="leupold">LPLD</SwitchLabel>
        </Column>
      </Flex>
      <hr />
      <Banner small green>
        Supplementary
      </Banner>
      <Flex justifyAround>
        <Column four>
          <Switch
            type="checkbox"
            id="suppressor"
            name="suppressor"
            onChange={handleCheck}
          />
          <SwitchLabel for="suppressor">SUPP</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="compass"
            name="compass"
            onChange={handleCheck}
          />
          <SwitchLabel for="compass">CMPS</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="fortrex"
            name="fortrex"
            onChange={handleCheck}
          />
          <SwitchLabel for="foretrex">FTRX</SwitchLabel>
        </Column>
        <Column four>
          <Switch
            type="checkbox"
            id="binos"
            name="binos"
            onChange={handleCheck}
          />
          <SwitchLabel for="binos">BINOS</SwitchLabel>
        </Column>
      </Flex>
    </>
  );
}

function ZapInformation({ currentStep, handleChange, edipi, blood_type }) {
  if (currentStep !== 3) {
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
            onChange={handleChange}
            value={edipi}
          />

          <Label for="blood_type">Blood Type</Label>
          <Input
            bsSize="sm"
            type="select"
            name="blood_type"
            id="blood_type"
            onChange={handleChange}
            value={blood_type}
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

      <Flex justifyBetween>
        <Button type="submit">Add Marine</Button>
      </Flex>
    </>
  );
}

export default AddNewMarine;
