import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Badge,
  Collapse,
  Button,
  ButtonGroup
} from 'reactstrap';
import Loader from '../components/Loader'
import HeaderBanner from '../components/HeaderBanner'
import Flex from '../components/Flex'
import SquadOverviewCard from '../components/SquadOverviewCard'
import TeamListV3 from '../components/TeamListV3'
import CreateMarine from '../screens/CreateMarine'

function ShowSquadDetails(props) {

  const [ squadData, setSquadData ] = useState([])
  const [ marineData, setMarineData ] = useState([])
  const [ dndVisible, setDndVisible] = useState(false)
  const handleSetDndVisible = () => {
    setDndVisible(!dndVisible)
  }

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

  const [ toggleAdd, setToggleAdd] = useState(false)
  const handleSetToggleAdd = () => {
    setToggleAdd(!toggleAdd)
  }
  const [ toggleRemove, setToggleRemove] = useState(false)
  const handleSetToggleRemove = () => {
    setToggleRemove(!toggleRemove)
  }

  return (

<Container>
 
    
      {squadData
        ? <HeaderBanner>SQUAD OVERVIEW</HeaderBanner>
        : <Loader/>
}
{toggleAdd && 
<CreateMarine id={squadData._id}/>}
{/* //CREATE MARINE NEEDS TO PASS THE ID OF THE SQUAD SO IT CAN POST IT. 
IT ALSO HAS SOME STUFF WRONG WITH IT AS FAR AS FOR SELECTING THE SQUAD.
 THE SQUAD NAME SHOULD BE AUTOMATIC, NAD PERHAPS IT SHOULD SPECIFY
THAT YOU ARE ADDING A MARINE TO 'X' SQUAD */}
{squadData &&
<SquadOverviewCard
                  callsign={squadData.callsign}
                  // totalMarines={fullSquad.length}
                  // appointments={squadLength.appointments}
                  // unit={squadData.unit}
                  onClick={handleSetDndVisible}
                  toggleAdd={handleSetToggleAdd}
                  toggleRemove={handleSetToggleRemove}
                  
                  />}





{dndVisible &&
<TeamListV3 id={squadData._id}/>
}
    </Container>

  )
}

export default ShowSquadDetails;



      {/* {squadData
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
} */}