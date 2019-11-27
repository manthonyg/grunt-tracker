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
      date: '',
      type: ''
      }
    );
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
      appointments: [
        {
        date: marineData.date,
        type: marineData.type
      }
    ]       
      }

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}`, data)
      .then(res => {
        setMarineData({
            date: '',
            type: ''
        })
        props
          .history
          .push('/');
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
          name='date'
          placeholder='Appointments'
          className='form-control'
          value={marineData.appointments}
          helperText='e.g "02/11/19"'
          onChange={onChange}/>

<Input
          type='input'
          name='type'
          placeholder='Type of Appointment'
          className='form-control'
          value={marineData.type}
          helperText='e.g "Dental"'
          onChange={onChange}/>


        <Button type="submit">
          Add Appointment
        </Button>
        {/* {dateArray.map(appointment =>
          <h1>appointment</h1>)} */}

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