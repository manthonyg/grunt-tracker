import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'


function CreateAppointment(props) {

  const [marineData,
    setMarineData] = useState({
    appointments: [],
  });
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
      appointments: marineData.appointments,
    }

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}`, data)
      .then(res => {
        setMarineData({
          appointments: [...marineData.appointments],
        })
        props
          .history
          .push('/:id');
      })
      .catch(err => {
        console.log("Error in CreateMarine");
      })
  };

  return (

    <Container full>

      <form noValidate onSubmit={onSubmit}>
       
        <Input
          type='date'
          placeholder='Appointments'
          name='appointments'
          className='form-control'
          value={marineData.appointments}
          helperText='e.g "02/11/19"'
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