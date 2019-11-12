import React, { Component, useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';


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
        <>
        <h1>{currentSquad.unit}</h1>
        <h1>{currentSquad.company}</h1>
        <h1>{currentSquad.platoon}</h1>
        <h1>{currentSquad.squad}</h1>
        <h1>{currentSquad.callsign}</h1>
        <h1>{currentSquad.marines}</h1>
        <h4>add new marine</h4>
        {/* <form noValidate onSubmit={onSubmit}>
           
           
           
            <input
              type='text'
              placeholder='First'
              name='first'
              className='form-control'
              value={currentSquad.marines.first}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Last'
              name='last'
              className='form-control'
              value={currentSquad.marines.last}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='Rank'
              name='rank'
              className='form-control'
              value={currentSquad.marines.first}
              onChange={onChange}
            />
          <input
              type="submit"
              className="btn btn-outline-warning btn-block mt-4"
          />
        </form> */}

       
        </>
    )
}


export default ShowSquadDetails;