import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import Button from '../components/Button'
import TimeField from 'react-simple-timefield';
import {Alert, Input, Container} from 'reactstrap';

function CreateAppointment(props) {
  const [marineData,
    setMarineData] = useState({date: '', appointment_type: '', location: '', time: ''});

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
      appointment_type: marineData.appointment_type,
      location: marineData.location,
      time: marineData.time
    }

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}/appointments`, data)
      .then(res => {
        setMarineData({date: '', appointment_type: '', location: '', time: ''})
        setVisible(true)
      })
      .catch(err => {
        console.log("Error in CreateAppointment");
      })
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

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

        <Input
          type='input'
          name='location'
          placeholder='Location'
          className='form-control'
          value={marineData.location}
          helperText='e.g "CP Hospital"'
          onChange={onChange}/>

        <TimeField
        name='time'
    value={marineData.time}                     // {String}   required, format '00:00' or '00:00:00'
    onChange={onChange}      // {Function} required
    input={<Input className='form-control' helperText='Time' type='input'/>} // {Element}  default: <input type="text" />
    colon=":"  
                     // {String}   default: ":"
                    // {Boolean}  default: false
/>
<br/>
<Alert color="success" isOpen={visible} toggle={onDismiss}>
          Appointment Created
        </Alert>
        <Button type="submit">
          Add Appointment
        </Button>

       
      </form>

    </Container>

  )
}

export default CreateAppointment;