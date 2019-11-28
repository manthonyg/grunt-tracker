import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import Input from '../components/Input'
import Button from '../components/Button'
import {Alert} from 'reactstrap';

function CreateMarine(props) {

  const [marineData,
    setMarineData] = useState({
    first: '',
    last: '',
    rank: '',
    unit: '',
    company: '',
    platoon: '',
    squad: '',
    team: ''
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
      first: marineData.first,
      last: marineData.last,
      rank: marineData.rank,
      unit: marineData.unit,
      company: marineData.company,
      platoon: marineData.platoon,
      squad: marineData.squad,
      team: marineData.team
    }

    axios
      .post('http://localhost:8082/api/marines', data)
      .then(res => {
        setMarineData({
          first: '',
          last: '',
          rank: '',
          unit: '',
          company: '',
          platoon: '',
          squad: '',
          team: ''
        })
        setVisible(true)

      })
      .catch(err => {
        console.log("Error in CreateMarine");
      })
  };

  const [visible,
    setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (

    <Container full>

      <LogoSmall>Tracker</LogoSmall>

      <HeaderBanner>Add Marine</HeaderBanner>

      <form noValidate onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder='First name'
          name='first'
          className='form-control'
          value={marineData.first}
          helperText=''
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Last name'
          name='last'
          className='form-control'
          value={marineData.last}
          helperText=''
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Rank'
          name='rank'
          className='form-control'
          value={marineData.rank}
          helperText='e.g. "LCpl"'
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Unit'
          name='unit'
          className='form-control'
          value={marineData.unit}
          helperText='e.g "V1/5"'
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Company'
          name='company'
          className='form-control'
          value={marineData.company}
          helperText='e.g "A"'
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Platoon'
          name='platoon'
          className='form-control'
          value={marineData.platoon}
          helperText='e.g "2"'
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Squad'
          name='squad'
          className='form-control'
          value={marineData.squad}
          helperText='e.g "3"'
          onChange={onChange}/>
        <Input
          type='text'
          placeholder='Team'
          name='team'
          className='form-control'
          value={marineData.team}
          helperText='e.g "2"'
          onChange={onChange}/>

        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          Marine added
        </Alert>
        <Button type="submit">
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

export default CreateMarine;