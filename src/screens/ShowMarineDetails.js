import React, { useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'

function ShowMarineDetails(props) {

  const [marineData,
    setMarineData] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/marines/${props.match.params.id}`)
      .then(res => setMarineData(res.data))
  }, [])

  return (

    <Container full>
      <LogoSmall>
        GruntTracker
      </LogoSmall>
      {marineData
        ? <HeaderBanner>{marineData.rank} {marineData.last}, {marineData.first}</HeaderBanner>
        : 'Loading'
}
    </Container>

  )
}

export default ShowMarineDetails;