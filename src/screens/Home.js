import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Flex from '../components/Flex'
import Heading from '../components/Heading'
import SearchBar from '../components/SearchBar'
import ArrowTab from '../components/ArrowTab'
import {Button, Container, Jumbotron, ToastHeader, Alert} from 'reactstrap';
import Loader from '../components/Loader'
function Home(props) {

  const [squadList,
    setSquadList] = useState()

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/squads')
      .then(res => setSquadList(res.data))

  }, [])
  console.log(squadList)

  const onDeleteClick = (evt) => {
    evt.persist();
    const squad = evt.target.id
    axios
      .delete(`http://localhost:8082/api/squads/${squad}`)
      .then(res => {
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

  return ( <> <Jumbotron>

    GruntTracker

  </Jumbotron>Your Squads : <Flex>
    {squadList
      ? squadList.map(squad => <ArrowTab
        link={`/show-squad/${squad._id}`}
        id={squad._id}
        onClick={onDeleteClick}
        squad={squad}
        key={squad.callsign}>{squad.unit} {squad.platoon}/{squad.squad}

        <Heading h5>({squad.callsign})</Heading>

      </ArrowTab>)
      : <Loader></Loader>
}
  </Flex> < Alert color = "success" isOpen = {
    visible
  }
  toggle = {
    onDismiss
  } > Squad Deleted </Alert>
    </>)
}

export default Home