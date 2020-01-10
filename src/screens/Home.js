import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Flex from '../components/Flex'
import { Alert } from 'reactstrap';
import Toast from '../components/Toast'
import PulsingArrow from '../components/PulsingArrow'
import HeaderBanner from '../components/HeaderBanner'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { deleteSquadById } from '../services/squadServices';
function Home() {

  const [ squadList, setSquadList ] = useState([])

  
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/squads')
      .then(res => setSquadList(res.data))
  }, [])


  const deleteSquad = (evt) => {
    evt.persist();
    const id = evt.target.id
      deleteSquadById(id)
      .then(res => {
        setVisible(true)
        setSquadList(squadList.filter(squad => squad._id !== id))
      })
      .catch(err => {
        console.log("Error from Home_deleteClick");
      })
  };

  const [ visible, setVisible ] = useState(false);

  const onDismiss = () => setVisible(false);

  return ( 
  <> 


  <HeaderBanner>grunt<strong>tracker</strong></HeaderBanner>
  <HeaderBanner secondary>my squads</HeaderBanner>

  <Flex contentCenter justifyCenter>
    {squadList && squadList.length
      ? squadList.map(squad => 
        <>
        <Card toast 
              noAnimation
              handleClose={deleteSquad}
              link={`/show-squad/${squad._id}`}
              key={squad._id}
              id={squad._id}>
        <HeaderBanner secondary>
        <h3>{squad.company}/{squad.platoon}-{squad.squad}</h3>
         </HeaderBanner>
        </Card>
        </>)
      : <><PulsingArrow/>Add Squad to Start</>
}


  </Flex> 
 {/* <Toast visible={visible}
        message='Successfully Deleted'></Toast> */}
  <Alert color = "success" isOpen = {visible} toggle = {onDismiss}> 
    Squad Successfully Deleted 
  </Alert>
</>

)}

export default Home