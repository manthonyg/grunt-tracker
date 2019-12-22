import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Badge,
  Collapse
} from 'reactstrap';
import Loader from '../components/Loader'
import HeaderBanner from '../components/HeaderBanner'
import Flex from '../components/Flex'
import SquadOverviewCard from '../components/SquadOverviewCard'
import QuoteApp from '../components/QuoteApp'
function ShowSquadDetails(props) {

  const [ squadData, setSquadData ] = useState([])
  const [ marineData, setMarineData ] = useState([])


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

  const [ isOpen, setIsOpen ] = useState({collapse: false, icon: 'keyboard_arrow_down'});
  const toggle = () => setIsOpen({
    collapse: !isOpen.collapse,
    icon: isOpen.collapse === true
      ? 'keyboard_arrow_down'
      : 'keyboard_arrow_up'
  })

  const teamOne = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '1')
  const teamTwo = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '2')
  const teamThree = marineData.filter(marine => marine.unit === squadData.unit && marine.team === '3')
  const fullSquad = marineData.filter(marine => marine.squad === squadData.callsign)

  const squadLength = [ ...teamOne, ...teamTwo, ...teamThree ].length

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

<Container>
 
    
      {squadData
        ? <HeaderBanner>SQUAD OVERVIEW</HeaderBanner>
        : <Loader/>
}

{squadData &&
<SquadOverviewCard
                  company={squadData.company}
                  platoon={squadData.platoon}
                  squad={squadData.squad}
                  totalMarines={fullSquad.length}
                  appointments={squadLength.appointments}
                  unit={squadData.unit}
                  />}

<QuoteApp squad_id={squadData._id}/>
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
                <Badge color='none'>
                  {teamOne.length}
                </Badge>
                <Badge color='none'>
                  {teamOneAppointments}
                </Badge>
              </Flex>
            </ListGroupItem>

           {teamOne.map(marine => 

            <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <ListGroup flush>
                  <ListGroupItem tag="a" onClick={toggle}>
                    <Flex justifyBetween alignCenter>
                      <Badge color='none'>Billet</Badge>
                      <Badge color='none'>L.Name</Badge>
                      <Badge color='none'>Status</Badge>
                      <Badge color='none'>View</Badge>
                    </Flex>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Flex justifyBetween alignCenter>
                      <p>TL</p>
                      <p>{marine.last}</p>
                      <p>Present</p>
                      <Link to={`/show-marine/${marine._id}`}>
                      <i class="material-icons">visibility</i>
                      </Link>
                    </Flex>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </Collapse>)}

            <ListGroupItem tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>2
                <Badge color='none'>
                  {teamTwo.length}
                </Badge>
                <Badge color='none'>
                  {teamTwoAppointments}
                </Badge>
              </Flex>
            </ListGroupItem>

            {teamTwo.map(marine => 

            <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <ListGroup flush>
                  <ListGroupItem tag="a" onClick={toggle}>
                    <Flex justifyBetween alignCenter>
                      <Badge color='none'>Billet</Badge>
                      <Badge color='none'>L.Name</Badge>
                      <Badge color='none'>Status</Badge>
                      <Badge color='none'>View</Badge>
                    </Flex>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Flex justifyBetween alignCenter>
                      <p>TL</p>
                      <p>{marine.last}</p>
                      <p>Present</p>
                      <Link to={`/show-marine/${marine._id}`}>
                      <i class="material-icons">visibility</i>
                      </Link>
                    </Flex>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </Collapse>)}

            {teamOne.map(marine => 

            <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <ListGroup flush>
                  <ListGroupItem tag="a" onClick={toggle}>
                    <Flex justifyBetween alignCenter>
                      <Badge color='none'>Billet</Badge>
                      <Badge color='none'>L.Name</Badge>
                      <Badge color='none'>Status</Badge>
                      <Badge color='none'>View</Badge>
                    </Flex>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Flex justifyBetween alignCenter>
                      <p>TL</p>
                      <p>{marine.last}</p>
                      <p>Present</p>
                      <Link to={`/show-marine/${marine._id}`}>
                      <i class="material-icons">visibility</i>
                      </Link>
                    </Flex>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </Collapse>)}

            <ListGroupItem tag="a" onClick={toggle}>
              <Flex justifyBetween alignCenter>3
                <Badge color='none'>
                  {teamTwo.length}
                </Badge>
                <Badge color='none'>
                  {teamTwoAppointments}
                </Badge>
              </Flex>
            </ListGroupItem>

            

             {teamThree.map(marine => 

            <Collapse isOpen={isOpen.collapse}>
              <ListGroupItem tag="button" action>
                <ListGroup flush>
                  <ListGroupItem tag="a" onClick={toggle}>
                    <Flex justifyBetween alignCenter>
                      <Badge color='none'>Billet</Badge>
                      <Badge color='none'>L.Name</Badge>
                      <Badge color='none'>Status</Badge>
                      <Badge color='none'>View</Badge>
                    </Flex>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Flex justifyBetween alignCenter>
                      <p>TL</p>
                      <p>{marine.last}</p>
                      <p>Present</p>
                      <Link to={`/show-marine/${marine._id}`}>
                      <i class="material-icons">visibility</i>
                      </Link>
                    </Flex>
                  </ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </Collapse>)}

          </ListGroup>

        : <Container>
          Loading...
        </Container>
}
    </Container>

  )
}

export default ShowSquadDetails;