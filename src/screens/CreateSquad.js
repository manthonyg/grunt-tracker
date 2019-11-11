import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import Flex, {Column} from '../components/Flex'


function CreateSquad(props) {

  const [ squadData, setSquadData ] = useState(
  {
  unit: '',
  company:'',
  squad:'',
  platoon: '',
  callsign: ''
  });
console.log(squadData)
console.log(props.match.params.id)

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
      callsign: squadData.callsign
    }

    axios
      .post('http://localhost:8082/api/squads', data)
      .then(res => {
        setSquadData({
          unit: '',
          company:'',
          squad:'',
          platoon:'',
          callsign:''
        })
        props.history.push('/');
      })
      .catch(err => {
        console.log("Error in CreateSquad");
      })
  };


return (

  <Container>

      <Flex justifyAround>
        <Link to="/" className="btn btn-outline-warning float-left">
            Show Squad List
        </Link>
   
        <form noValidate onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='Unit'
              name='unit'
              className='form-control'
              value={squadData.unit}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Company'
              name='company'
              className='form-control'
              value={squadData.company}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Platoon'
              name='platoon'
              className='form-control'
              value={squadData.platoon}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Squad'
              name='squad'
              className='form-control'
              value={squadData.squad}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Callsign'
              name='callsign'
              className='form-control'
              value={squadData.callsign}
              onChange={onChange}
            />
          <input
              type="submit"
              className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
          </Flex>
        </Container>
  )
}


export default CreateSquad;