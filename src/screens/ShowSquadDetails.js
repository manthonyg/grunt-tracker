import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {
  Container,
} from 'reactstrap';
import Loader from '../components/Loader'
import SquadOverviewCard from '../components/SquadOverviewCard'
import TeamListV3 from '../components/TeamList'
import CreateMarine from '../screens/CreateMarine'

function ShowSquadDetails(props) {

  const [ squadData, setSquadData ] = useState([])
  // const [ marineData, setMarineData ] = useState([])
  const [ dndVisible, setDndVisible] = useState(false)
  const handleSetDndVisible = () => {
    setDndVisible(!dndVisible)
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/squads/` + props.match.params.id)
      .then(res => {
        setSquadData(res.data)
        // return axios
        //   .get(`http://localhost:8082/api/marines`)
        //   .then(res => {
        //     setMarineData(res.data)
        //     console.log(res.data)
        //   })
      })
  }, [props.match.params.id]);


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
        ? <></>
        : <Loader/>
}

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


{toggleAdd && 
<CreateMarine id={squadData._id}/>}


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