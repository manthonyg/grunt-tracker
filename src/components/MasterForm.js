import React, {useState} from 'react'
import Input from '../components/Input'
import FormNavigation from '../components/FormNavigation'
import {Button} from 'reactstrap'
import axios from 'axios'
function MasterForm(props) {


    const [ data, setData ] = useState({
        currentStep: 1,
        first:  '',
        last: '',
        middle: '',
        birthdate: '',
        birthplace: '',
        rank: '',
        billet: '',
        edipi: '',
        blood_type: '',
        unit: '',
        company: '',
        platoon: '',
        squad: '',
        team: '',
        callsign: ''
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
      middle: '',
      birthdate: '',
      birthplace: '',
      rank: '',
      billet: '',
      edipi: '',
      blood_type: '',
      unit: '',
      company: '',
      platoon: '',
      squad: '',
      team: '',
      callsign: ''
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
          className="btn btn-secondary" 
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
            username={data.username}
          />
          <ZapInformation
            currentStep={data.currentStep} 
            handleChange={handleChange}
            password={data.password}
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
    return(

    <form noValidate>
       Basic
        <Input
          type='text'
          placeholder='First name'
          name='first'
          className='form-control'
          value={props.first}
          helperText=''
          onChange={props.handleChange}/>
        <Input
          type='text'
          placeholder='Last name'
          name='last'
          className='form-control'
          value={props.last}
          helperText=''
          onChange={props.handleChange}/>
        <Input
          type='text'
          placeholder='Middle Initial'
          name='middle'
          className='form-control'
          value={props.middle}
          helperText='e.g. "A"'
          onChange={props.handleChange}/>
        <Input
          type='date'
          placeholder='Birthdate'
          name='birthdate'
          className='form-control'
          value={props.birthdate}
          helperText='e.g. "03/26/1997"'
          onChange={props.handleChange}/>
        <Input
          type='text'
          placeholder='Rank'
          name='rank'
          className='form-control'
          value={props.rank}
          helperText='e.g. "LCpl"'
          onChange={props.handleChange}/>
        <Input
          type='text'
          placeholder='Billet'
          name='billet'
          className='form-control'
          value={props.billet}
          helperText='e.g. "Squad Leader"'
          onChange={props.handleChange}/>

    </form>
    
    );
  }
  
  function UnitInformation(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
    <form noValidate>
      Unit
        <Input
              type='text'
              placeholder='Unit'
              name='unit'
              className='form-control'
              value={props.unit}
              helperText='e.g "V1/5"'
              onChange={props.handleChange}
            />
            <Input
              type='text'
              placeholder='Company'
              name='company'
              className='form-control'
              value={props.company}
              helperText='e.g "A"'
              onChange={props.handleChange}
            />
            <Input
              type='text'
              placeholder='Platoon'
              name='platoon'
              className='form-control'
              value={props.platoon}
              helperText='e.g "2"'
              onChange={props.handleChange}
            />
            <Input
              type='text'
              placeholder='Squad'
              name='squad'
              className='form-control'
              value={props.squad}
              helperText='e.g "3"'
              onChange={props.handleChange}
            />
            
           
      </form>
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
              name='unit'
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
              value={props.company}
              helperText='e.g "O+"'
              onChange={props.handleChange}
            />
            
      <Button block type="submit">Add Marine</Button>
      </>
    );
  }

  export default MasterForm