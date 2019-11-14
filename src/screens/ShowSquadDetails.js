import React, { Component, useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import ArrowTab from '../components/ArrowTab'
import { setPriority } from 'os';


function ShowSquadDetails(props) {


    const [response, setScreenData] = useState({ squadData: null, marineData: null });

    useEffect(() => {
      const fetchData = async () => {
        const respSquad = await axios(
          `http://localhost:8082/api/squads/`+props.match.params.id
        );
        const respMarines = await axios(
          `http://localhost:8082/api/marines`
        );
  
        setScreenData({ squadData: respSquad.data, marineData: respMarines.data });
      };
  
      fetchData();
    }, []);




console.log(response.squadData)
console.log(response.marineData)


    return (
<>
<Container full>
    <LogoSmall>
    GruntTracker
    </LogoSmall>
{response.squadData ?  
    <HeaderBanner>{response.squadData.unit} {response.squadData.company}.CO {response.squadData.platoon}/{response.squadData.squad}</HeaderBanner>
    :
    'Loading'
}

{response.marineData &&
response.marineData.map(marine => marine.unit === response.squadData.unit ?
<>
<Container><h1>{marine.first}</h1>
<h2>{marine.last}</h2></Container>

</>
:
<>

</>)}


</Container>

    </>
    )
}


export default ShowSquadDetails;