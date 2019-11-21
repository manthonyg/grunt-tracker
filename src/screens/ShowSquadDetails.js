import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function ShowSquadDetails(props) {



    const [squadData, setSquadData] = useState()
    const [marineData, setMarineData] = useState([])

    useEffect(() => {
      axios
      .get(`http://localhost:8082/api/squads/`+props.match.params.id)
      .then (res=> {
        setSquadData(res.data)

        return axios.get(`http://localhost:8082/api/marines`)
        .then (res=> {
          setMarineData(res.data)
        })
      })
      
    }, []);

    const deleteItem = (evt) => {
      evt.persist()
      const marine = evt.target.id
      axios
          .delete(`http://localhost:8082/api/marines/${marine}`)
          .then(res => {
            const updatedMarineData = marineData.filter(m => m._id !== evt.target.id)
            setMarineData(updatedMarineData)
          })
          .catch(err => {
              console.log("Error from Home_deleteClick");
          })
  };

const matchingMarines = marineData && marineData.map(marine => marine.unit === squadData.unit).filter(Boolean).length
console.log(matchingMarines)
    return (
<>
<Container full>
    <LogoSmall>
    GruntTracker
    </LogoSmall>
{squadData ?  
    <HeaderBanner>{squadData.unit} {squadData.company}.CO {squadData.platoon}/{squadData.squad} ({matchingMarines})</HeaderBanner>
    :
    'Loading'
}

{marineData &&
marineData.map(marine => marine.unit === squadData.unit ?
<>
                  <table key={marine._id}>
                    <thead>
                   <tr>
                     <th><i class="fa fa-remove" onClick={deleteItem} id={marine._id}></i></th>
                     <th>{marine.first}, {marine.last} ({marine.unit}/{marine.company}/{marine.squad}/{marine.team})</th>
                     <th><Link to={`/show-marine/${marine._id}`}><Button noMargin>View Marine</Button></Link></th>
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