import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import Input from '../components/Input'
import Button from '../components/Button'


function CreateSquad(props) {

  const [ squadData, setSquadData ] = useState(
  {
  unit: '',
  company:'',
  squad:'',
  platoon: '',
  callsign: '',
  });
console.log(squadData)


  const onChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setSquadData(prevState => {
      return { ...prevState, [name] : val }
  })
}


  const onSubmit = evt => {
    evt.preventDefault();

    const data = {
      unit: squadData.unit,
      company: squadData.company,
      squad: squadData.squad,
      platoon: squadData.platoon,
      callsign: squadData.callsign,
    }

    axios
      .post('http://localhost:8082/api/squads', data)
      .then(res => {
        setSquadData({
          unit: '',
          company:'',
          squad:'',
          platoon:'',
          callsign:'',
        })
        props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateSquad");
      })
  };


return (

<Container full>

    <LogoSmall>GruntTracker</LogoSmall>

    <HeaderBanner>Add Squad</HeaderBanner>

        <form noValidate onSubmit={onSubmit}>
            <Input
              type='text'
              placeholder='Unit'
              name='unit'
              className='form-control'
              value={squadData.unit}
              helperText='e.g "V1/5"'
              onChange={onChange}
            />
            <Input
              type='text'
              placeholder='Company'
              name='company'
              className='form-control'
              value={squadData.company}
              helperText='e.g "A"'
              onChange={onChange}
            />
            <Input
              type='text'
              placeholder='Platoon'
              name='platoon'
              className='form-control'
              value={squadData.platoon}
              helperText='e.g "2"'
              onChange={onChange}
            />
            <Input
              type='text'
              placeholder='Squad'
              name='squad'
              className='form-control'
              value={squadData.squad}
              helperText='e.g "3"'
              onChange={onChange}
            />
            <Input
              type='text'
              placeholder='Callsign'
              name='callsign'
              className='form-control'
              value={squadData.callsign}
              helperText='e.g "Apache"'
              onChange={onChange}
            />
              <Button type="submit" >
                  Submit
                </Button>

                <Button>
                  <Link to="/">
                  Back
                  </Link>
                </Button>
          </form>
    
             



            

            


            
            
      </Container>
       
      
  )
}


export default CreateSquad;