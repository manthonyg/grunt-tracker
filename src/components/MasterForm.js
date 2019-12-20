import React, {useState, useEffect} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';
import axios from 'axios'
function MasterForm(props) {

  const [squadData, setSquadData] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/squads/`)
      .then(res => {
        setSquadData(res.data)
      })
  }, []);

    const [ data, setData ] = useState({
        currentStep: 1,
        first:  '',
        last: '',
        birthdate: '',
        rank: '',
        billet: '',
        edipi: '',
        blood_type: '',
        squad: '',
        team: '',
        callsign: '',
        zap: ''
    })
  
    const handleChange = evt => {
      const name = evt.target.name;
      const val = evt.target.value;
      setData(prevState => {
        return {
          ...prevState,
          [name]: val
        }
      })
    }
    console.log(data)
     
    const handleSubmit = event => {
      event.preventDefault()
      axios
      .post('http://localhost:8082/api/marines', data)
      .then(res => {

      setData({   
      first:  '',
      last: '',
      birthdate: '',
      rank: '',
      billet: '',
      edipi: '',
      blood_type: '',
      squad: '',
      team: '',
      callsign: '',
      zap: ''
    })
  })
  .catch(err => {
    console.log("Error in CreateMarine/MasterForm");
  })
};
  
   
    
    const _next = () => {
      let currentStep = data.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      setData(prevState => {
        return {
          ...prevState,
          currentStep: currentStep
      }})
    }
      
    const _prev = () => {
      let currentStep = data.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      setData({
        currentStep: currentStep
      })
    }
  

  function previousButton() {
    let currentStep = data.currentStep;
    if(currentStep !==1){
      return (
        <button 
          className="btn btn-primary" 
          type="button" onClick={_prev}>
        Previous
        </button>
      )
    }
  }
  
  function nextButton(){
    let currentStep = data.currentStep;
    if(currentStep <3){
      return (
        <button 
          className="btn btn-primary float-right" 
          type="button" onClick={_next}>
        Next
        </button>        
      )
    }
  }
       
      return (
        <>
        
        <form onSubmit={handleSubmit}>
       
          <BasicInformation 
            currentStep={data.currentStep} 
            handleChange={handleChange}
            first={data.first}
            last={data.last}
            middle={data.middle}
            rank={data.rank}
            billet={data.billet}
          />
          <UnitInformation 
            currentStep={data.currentStep} 
            handleChange={handleChange}
            squad={data.squad}
            team={data.team}
            squadData={squadData}

          />
          <ZapInformation
            currentStep={data.currentStep} 
            handleChange={handleChange}
            edipi={data.edipi}
            blood_type={data.blood_type}
            zap={data.zap}

          />

          {previousButton()}
          {nextButton()}
  
        </form>
        </>
      );
    }

  
  
  function BasicInformation(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return (

<Container>
  <Form>
    <FormGroup>
      <Label for="first">First</Label>
      <Input name="first" id="first" onChange={props.handleChange} value={props.first}/>
    </FormGroup>

    <FormGroup>
    <Label for="birthdate">Last</Label>
      <Input name="last" id="last" onChange={props.handleChange} value={props.last}/>
    </FormGroup>

    <FormGroup>
      <Label for="birthdate">Birthdate</Label>
      <Input type="date" name="birthdate" id="birthdate" onChange={props.handleChange} value={props.birthdate}/>
    </FormGroup>

    <FormGroup>
    <Label for="birthdate">Rank</Label>
      <Input type="select" name="rank" id="rank" onChange={props.handleChange} value={props.rank}>
        <option>PVT</option>
        <option>PFC</option>
        <option>LCPL</option>
        <option>CPL</option>
        <option>SGT</option>
      </Input>
    </FormGroup>

  </Form>
</Container>
    
    
    );
  }
  
  function UnitInformation(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
    <FormGroup>
      <Label for="company">Squad</Label>
      <Input type="select" name="squad" id="company" onChange={props.handleChange} value={props.company}>
        {props.squadData.map(squad=>
          <option>{squad.company} {squad.platoon}/{squad.squad}</option>)}
      </Input>
    </FormGroup>
    );
  }
  
  function ZapInformation(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <>
      Zap Information
     <Input
              type='text'
              placeholder='EDIPI'
              name='edipi'
              className='form-control'
              value={props.edipi}
              helperText='e.g "1234567890"'
              onChange={props.handleChange}
            />
            <Input
              type='text'
              placeholder='Blood Type'
              name='blood_type'
              className='form-control'
              value={props.blood_type}
              helperText='e.g "O+"'
              onChange={props.handleChange}
            />
            <Input
              type='text'
              placeholder='Zap #'
              name='zap'
              className='form-control'
              value={props.zap}
              onChange={props.handleChange}/>

            
      <Button block type="submit">Add Marine</Button>
      </>
    );
  }

  export default MasterForm