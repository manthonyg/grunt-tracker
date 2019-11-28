import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'

function CreateAppointment(props) {
  const [marineData,
    setMarineData] = useState({date: '', type: ''});
  console.log(marineData)

  const onChange = evt => {
    const name = evt.target.name;
    const val = evt.target.value;
    setMarineData(prevState => {

      return {
        ...prevState,
        [name]: val
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault();

    const data = {
      date: marineData.date,
      appointment_type: marineData.appointment_type
    }

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}`, data)
      .then(res => {
        setMarineData({date: '', appointment_type: ''})
        props
          .history
          .push(`/${props.marine}`);
      })
      .catch(err => {
        console.log("Error in CreateAppointment");
      })
  };

  return (

    <Container full>

      <form noValidate onSubmit={onSubmit}>

        <Input
          type='date'
          name='date'
          placeholder='Appointments'
          className='form-control'
          value={marineData.date}
          helperText='e.g "02/11/19"'
          onChange={onChange}/>

        <Input
          type='input'
          name='appointment_type'
          placeholder='Type of Appointment'
          className='form-control'
          value={marineData.appointment_type}
          helperText='e.g "Dental"'
          onChange={onChange}/>

        <Button type="submit">
          Add Appointment
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

export default CreateAppointment;