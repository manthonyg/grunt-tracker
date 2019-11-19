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

const matchingMarines = response.marineData && response.marineData && response.marineData.map(marine => marine.unit === response.squadData.unit).filter(Boolean).length
console.log(matchingMarines)
    return (
<>
<Container full>
    <LogoSmall>
    GruntTracker
    </LogoSmall>
{response.squadData ?  
    <HeaderBanner>{response.squadData.unit} {response.squadData.company}.CO {response.squadData.platoon}/{response.squadData.squad} ({matchingMarines})</HeaderBanner>
    :
    'Loading'
}

{response.marineData &&
response.marineData.map(marine => marine.unit === response.squadData.unit ?
<>
                  <table>
                    <thead>
                   <tr>
                     <th>{marine.first}, {marine.last} ({marine.unit}/{marine.company}/{marine.squad}/{marine.team})</th>
                   </tr>

                    <tr> 
                        <th><i className='fa fa-calendar'/></th>
                        <th><i className='fa fa-user'/></th>
                        <th><i className='fa fa-check'/></th>
                    </tr>
                    </thead>

                    <tbody>
                      <td>{marine.appointments.length ? marine.appointments.map(appointment => appointment) : 'None'}</td>
<td>{marine.accounted ? <div style={{color: 'green'}}>Accounted for</div> : <><div style={{color: 'red'}}>Unaccounted</div></>}</td>
                      <td>A string</td>
                    </tbody>
                </table>
</>
:
<>

</>)}


</Container>

    </>
    )
}


export default ShowSquadDetails;