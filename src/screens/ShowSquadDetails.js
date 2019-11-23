import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import MarineDataCard from '../components/MarineDataCard/MarineDataCard';
import Card from '../components/Card'
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
<Container full>
    <LogoSmall>
    GruntTracker
    </LogoSmall>
{squadData ?  
    <HeaderBanner>{squadData.unit} {squadData.company}.CO {squadData.platoon}/{squadData.squad} ({matchingMarines})</HeaderBanner>
    :
    'Loading'
}

{marineData && squadData &&
marineData.map(marine => marine.unit === squadData.unit ?

                  <MarineDataCard
                                id={marine._id}
                                onClick={deleteItem}
                                key={marine._id}
                                first={marine.first}
                                last={marine.last}
                                unit={marine.unit}
                                company={marine.company}
                                squad={marine.squad}
                                team={marine.team}
                                appointments={marine.appointments}
                                accounted={marine.accounted}
                                />
                                :
                                <Card>No matching Marines
                                </Card>

)}

</Container>

    )
}


export default ShowSquadDetails;