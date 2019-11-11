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
console.log(currentSquad)


    return (
        <>
        <h1>{currentSquad.unit}</h1>
        <h1>{currentSquad.company}</h1>
        <h1>{currentSquad.platoon}</h1>
        <h1>{currentSquad.squad}</h1>
        <h1>{currentSquad.callsign}</h1>
        </>
    )
}


export default ShowSquadDetails;