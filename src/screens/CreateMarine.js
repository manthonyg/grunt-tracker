import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import MasterForm from '../components/MasterForm'
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
    team: '',
    edipi: '',
    religion: '',
    blood_type: ''
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
      team: marineData.team,
      edpip: marineData.edipi,
      religion: marineData.religion,
      blood_type: marineData.blood_type

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
          team: '',
          edipi: '',
          religion: '',
          blood_type: ''
        })
        setVisible(true)

      })
      .catch(err => {
        console.log("Error in CreateMarine");
      })
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);

  return (

    <Container>

      <HeaderBanner>Create New Marine</HeaderBanner>
        <MasterForm/>
        <Alert color="success" isOpen={visible} toggle={onDismiss}>
          Marine added
        </Alert>
    </Container>

  )
}

export default CreateMarine;