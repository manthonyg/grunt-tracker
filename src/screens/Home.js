import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Flex from '../components/Flex'
import Heading from '../components/Heading'
import ArrowTab from '../components/ArrowTab'
import {Container, Alert} from 'reactstrap';
import Loader from '../components/Loader'
function Home() {

  const [squadList,
    setSquadList] = useState()
  const [ deletedSquad, setDeletedSquad ] = useState()
  
  useEffect(() => {
    axios
      .get('http://localhost:8082/api/squads')
      .then(res => setSquadList(res.data))
  }, [])


  const onDeleteClick = (evt) => {
    evt.persist();
    const squad = evt.target.id
    axios
      .delete(`http://localhost:8082/api/squads/${squad}`)
      .then(res => {
        setDeletedSquad(evt.target.name)
        const updatedSquadList = squadList.filter(m => m._id !== evt.target.id);
        setSquadList(updatedSquadList)
        setVisible(true)
      })
      .catch(err => {
        console.log("Error from Home_deleteClick");
      })
  };

  const [visible,
    setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  return ( <> <Container>

    

  </Container>Your Squads : <Flex contentCenter justifyCenter>
    {squadList
      ? squadList.map(squad => <ArrowTab
        link={`/show-squad/${squad._id}`}
        id={squad._id}
        onClick={onDeleteClick}
        squad={squad}
        key={squad.callsign}>{squad.unit} {squad.platoon}/{squad.squad}

        <Heading h4>{squad.callsign}</Heading>

      </ArrowTab>)
      : <Loader></Loader>
}
  </Flex> < Alert color = "success" isOpen = {
    visible
  }
  toggle = {
    onDismiss
  } > {deletedSquad} Successfully Deleted </Alert>
    </>)
}

export default Home