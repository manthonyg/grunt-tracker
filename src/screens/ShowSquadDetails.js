import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import axios from 'axios';
import {Container} from 'reactstrap';
import Loader from '../components/Loader'
import SquadOverviewCard from '../components/SquadOverviewCard'
import TeamList from '../components/TeamList'
import CreateMarine from '../screens/CreateMarine'
import ShowMarineOverview from '../components/ShowMarineOverview'
import Button from '../components/Button'
import Flex from '../components/Flex'
import {getAllMarinesInSquad, getSquadById, getTeamsById} from '../services/get'

function ShowSquadDetails(props) {

  const componentIsMounted = useRef(true);

  const [squadData, setSquadData] = useState([])
  const [marineData, setMarineData] = useState([])
  
  const [currentView, setCurrentView] = useState('')
  const handleSetCurrentView = (evt) => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id)
    }
  }

  useEffect(() => {
   getSquadById(props.match.params.id)
      .then(res => {
        if (componentIsMounted.current) {
        setSquadData(res)
        }
      })
      return () => {
        componentIsMounted.current = false
      }
  }, [props.match.params.id, currentView]);


useEffect(() => {
  getAllMarinesInSquad(props.match.params.id)
    .then(res => {
        setMarineData(res)
    })
}, [props.match.params.id, squadData, currentView])
console.table('marine data is now', marineData)


  const [toggleRemove, setToggleRemove] = useState(false)
  const handleSetToggleRemove = () => {
    setToggleRemove(!toggleRemove)
  }

  return (

   <>

      {!!squadData &&
      <SquadOverviewCard 
      callsign={squadData.callsign}
      data={marineData}/>}

    <Container>
      <Flex justifyBetween>
        <Button id='addMarine' onClick={handleSetCurrentView}>Add Member</Button>
        <Button id='viewAll' onClick={handleSetCurrentView}>View All</Button>
        <Button id='dragAndDrop' onClick={handleSetCurrentView}>Change T/O</Button>
      </Flex>
     </Container>

      {currentView === 'addMarine' && <CreateMarine id={squadData._id}/>}

      {currentView === 'viewAll' && <ShowMarineOverview id={squadData._id} marines={marineData}/>}

      {currentView === 'dragAndDrop' && <TeamList id={squadData._id}/>}

    </>

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
} */
}