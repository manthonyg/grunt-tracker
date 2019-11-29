import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'
import {Alert} from 'reactstrap';

function CreatePFT(props) {
  const [marineData,
    setMarineData] = useState({pft_score: '', pft_date: ''});

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
      score: marineData.pft_score,
      last_updated: marineData.pft_date
    }

    axios
      .put(`http://localhost:8082/api/marines/${props.marine}/body/pft`, data)
      .then(res => {
        setMarineData({pft_score: '', pft_date: ''})
        setVisible(true)
      })
      .catch(err => {
        console.log("Error in CreateAppointment");
      })
  };

  const [visible,
    setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (

    <Container full>

      <form noValidate onSubmit={onSubmit}>

        <Input
          type='input'
          name='pft_score'
          placeholder='PFT Score'
          className='form-control'
          value={marineData.pft_score}
          helperText='e.g "275"'
          onChange={onChange}/>

        <Input
          type='date'
          name='pft_date'
          placeholder='Date'
          className='form-control'
          value={marineData.pft_date}
          helperText='e.g "2019/01/01"'
          onChange={onChange}/>


<br/>
<Alert color="success" isOpen={visible} toggle={onDismiss}>
          PFT Added
        </Alert>
        <Button type="submit">
          Add Appointment
        </Button>

       
      </form>

    </Container>

  )
}

export default CreatePFT;