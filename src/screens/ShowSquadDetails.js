import React, { Component, useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import ArrowTab from '../components/ArrowTab'


function ShowSquadDetails(props) {

const [ currentSquad, setCurrentSquad ] = useState('')

useEffect(() => {
    axios
    .get('http://localhost:8082/api/squads/'+props.match.params.id)
    .then(squad => setCurrentSquad(squad.data))
    }, []
)




// const onChange = evt => {
//     const name = evt.target.name;
//     const val = evt.target.value;
//     setSquadData(prevState => {
//       return { ...prevState, [name] : val }
//   })
// }

//   const onSubmit = evt => {
//     evt.preventDefault();

//     const data = {
//       marines.first: currentSquad.first,
//       marines.last: currentSquad.last,
//       marines.rank: currentSquad.rank
//     }

//     axios
//       .post('http://localhost:8082/api/squads', data)
//       .then(res => {
//         setSquadData({
//             marines.first: '',
//             marines.last: '',
//             marines.rank: ''
//         })
//         props.history.push('/');
//       })
//       .catch(err => {
//         console.log("Error in ShowSquadDetails");
//       })
//   };

console.log(currentSquad)


    return (
      <Container full>

      <LogoSmall>GruntTracker</LogoSmall>
  
      <HeaderBanner>{currentSquad.unit} {currentSquad.company}{currentSquad.platoon}/{currentSquad.squad} ({currentSquad.callsign})</HeaderBanner>
     
       

       
        </Container>
    )
}


export default ShowSquadDetails;