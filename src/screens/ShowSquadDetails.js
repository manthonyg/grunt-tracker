import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Badge,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import Loader from '../components/Loader'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import {Card, Collapse} from 'reactstrap'
import Flex from '../components/Flex'

function ShowSquadDetails(props) {

  const [squadData,
    setSquadData] = useState()
  const [marineData,
    setMarineData] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/squads/` + props.match.params.id)
      .then(res => {
        setSquadData(res.data)
        return axios
          .get(`http://localhost:8082/api/marines`)
          .then(res => {
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

  const [isOpen, setIsOpen] = useState({collapse: false, icon: 'keyboard_arrow_down' });
  const toggle = () => setIsOpen({ collapse: !isOpen.collapse, icon: isOpen.collapse === true ? 'keyboard_arrow_down' : 'keyboard_arrow_up' })

  const matchingMarines = marineData && marineData.map(marine => marine.unit === squadData.unit)

  const teamOne = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '1')
  const teamTwo = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '2')
  const teamThree = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '3')

  return (

    <Container full>
      <LogoSmall>
        GruntTracker
      </LogoSmall>
      {squadData
        ? <HeaderBanner>
            <Badge color='primary'>{squadData.unit} {squadData.company}.CO {squadData.platoon}/{squadData.squad}
              
            </Badge>
          </HeaderBanner>
        : <Loader></Loader>
}
      {squadData
        ? <ListGroup flush>
            <ListGroupItem disabled>{squadData.platoon}PLT/{squadData.squad}SQD OVERVIEW</ListGroupItem>
         

          </ListGroup>
        : <Loader></Loader>
}

      <ListGroup flush>
                             <ListGroupItem color='secondary' tag="a" onClick={toggle}><Flex justifyBetween alignCenter>Team 1 <Badge>{teamOne.length}</Badge><i class="material-icons">keyboard_arrow_down</i> </Flex></ListGroupItem>
      {teamOne.map(marine => <Collapse isOpen={isOpen.collapse}>
                              <ListGroupItem tag="button" action><Link to={`/show-marine/${marine._id}`}>{marine.rank} {marine.first} {marine.last}</Link></ListGroupItem>
                              
                             </Collapse>)}
                             <ListGroupItem color='secondary' tag="a" onClick={toggle}><Flex justifyBetween alignCenter>Team 2 <Badge>{teamTwo.length}</Badge><i class="material-icons">{isOpen.icon}</i> </Flex></ListGroupItem>
      {teamTwo.map(marine => <Collapse isOpen={isOpen.collapse}>
                              <ListGroupItem tag="button" action><Link to={`/show-marine/${marine._id}`}>{marine.rank} {marine.first} {marine.last}</Link></ListGroupItem>
                             
                             </Collapse>)}
                             <ListGroupItem color='secondary' tag="a"><Flex justifyBetween alignCenter>Team 3 <Badge>{teamThree.length}</Badge><i class="material-icons">keyboard_arrow_down</i> </Flex></ListGroupItem>
      {teamThree.map(marine => <ListGroupItem>
                              <ListGroupItem tag="button" action>{marine.rank} {marine.first} {marine.last}</ListGroupItem>
                              
                             </ListGroupItem>)}
      </ListGroup>

    </Container>

  )
}

export default ShowSquadDetails;