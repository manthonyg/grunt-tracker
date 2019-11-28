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

  const [isOpen,
    setIsOpen] = useState({collapse: false, icon: 'keyboard_arrow_down'});
  const toggle = () => setIsOpen({
    collapse: !isOpen.collapse,
    icon: isOpen.collapse === true
      ? 'keyboard_arrow_down'
      : 'keyboard_arrow_up'
  })

  const teamOne = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '1')
  const teamTwo = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '2')
  const teamThree = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '3')

  const teamOneAppointments = teamOne
    .map(marine => marine.appointments.length)
    .reduce((total, currentValue) => total + currentValue, 0)
  const teamTwoAppointments = teamTwo
    .map(marine => marine.appointments.length)
    .reduce((total, currentValue) => total + currentValue, 0)
  const teamThreeAppointments = teamThree
    .map(marine => marine.appointments.length)
    .reduce((total, currentValue) => total + currentValue, 0)

  return (

    <Container full>
      <LogoSmall>
        GruntTracker
      </LogoSmall>

      {squadData
        ? <HeaderBanner>
            {squadData.company}
            CO {squadData.platoon}
            / {squadData.squad}
            OVERVIEW
          </HeaderBanner>
        : <Loader></Loader>
}

      {squadData
        ? <ListGroup flush>
            <ListGroupItem color='secondary' tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>
                <Badge>Team</Badge>
                <Badge># Marines</Badge>
                <Badge># Appointments</Badge>

              </Flex>
            </ListGroupItem>

            <ListGroupItem tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>1
                <Badge color='none'>{teamOne.length}
                  <i class="material-icons">account_circle</i>
                </Badge>
                <Badge color='none'>{teamOneAppointments}
                  <i class="material-icons">event_available</i>
                </Badge>

              </Flex>
            </ListGroupItem>

            {teamOne.map(marine => <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <Link to={`/show-marine/${marine._id}`}>{marine.rank} {marine.first}
                  {marine.last}</Link>
              </ListGroupItem>
            </Collapse>)}

            <ListGroupItem tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>2
                <Badge color='none'>{teamTwo.length}
                  <i class="material-icons">account_circle</i>
                </Badge>
                <Badge color='none'>{teamTwoAppointments}
                  <i class="material-icons">event_available</i>
                </Badge>

              </Flex>
            </ListGroupItem>

            {teamTwo.map(marine => <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <Link to={`/show-marine/${marine._id}`}>{marine.rank} {marine.first}
                  {marine.last}</Link>
              </ListGroupItem>
            </Collapse>)}

            <ListGroupItem tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>3
                <Badge color='none'>{teamThree.length}
                  <i class="material-icons">account_circle</i>
                </Badge>
                <Badge color='none'>{teamThreeAppointments}
                  <i class="material-icons">event_available</i>
                </Badge>

              </Flex>
            </ListGroupItem>

            {teamThree.map(marine => <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <Link to={`/show-marine/${marine._id}`}>{marine.rank} {marine.first}
                  {marine.last}</Link>
              </ListGroupItem>
            </Collapse>)}

          </ListGroup>

        : <Container center>
          Loading...
        </Container>
}
    </Container>

  )
}

export default ShowSquadDetails;