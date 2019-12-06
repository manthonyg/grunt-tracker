import React, {useState} from 'react'
import Input from '../components/Input'
import {Badge} from 'reactstrap'
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
  
    const handleChange = event => {
      const {name, val} = event.target
      setData(prevState => {
        return {
          ...prevState,
          [name]: val
        }
      })
    }
     
    const handleSubmit = event => {
      event.preventDefault()
      setData({   
      first:  data.first,
      last: data.last,
      middle: data.middle,
      birthdate: data.birthdate,
      birthplace: data.birthplace,
      rank: data.rank,
      billet: data.billet,
      edipi: data.edipi,
      blood_type: data.blood_type,
      unit: data.unit,
      company: data.company,
      platoon: data.platoon,
      squad: data.squad,
      team: data.team,
      callsign: data.callsign
    })
    }
    
    const _next = () => {
      let currentStep = data.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
      setData({
        currentStep: currentStep
      })
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
          <BodyInformation
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
        <Badge>Basic Information</Badge>
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
          name='rank'
          className='form-control'
          value={props.middle}
          helperText='e.g. "A"'
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
          name='rank'
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
        <Badge>Unit Information</Badge>
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
            <Input
              disabled
              type='text'
              placeholder={props.squad}
              name='callsign'
              className='form-control'
              value={props.unit}
              helperText='e.g "Apache"'
              onChange={props.handleChange}
            />
      </form>
    );
  }
  
  function BodyInformation(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={props.password}
          onChange={props.handleChange}
          />      
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
      </>
    );
  }

  export default MasterForm