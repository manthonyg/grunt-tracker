import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import Flex from './Flex'
import {Link} from 'react-router-dom';
const baseURI = 'http://localhost:8082/api/'
const teamOneURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-one`
const teamTwoURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-two`


const SortableContainer = sortableContainer(({ 
  children}) => 
<ListGroup flush>{children}</ListGroup>
);

const Sortable = sortableElement(({
  value, 
  marine }) => 
<ListGroupItem>
    {value}
    <Flex justifyBetween alignCenter>
        <Link to={`/show-marine/${marine}`}>
            {/* <i class="material-icons">visibility</i> */}
        </Link>
  </Flex>
</ListGroupItem>);

function TeamList({ id, isLoading }) {

  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [route, setRoute] = useState({
     teamOne: false, 
     teamTwo: false, 
     teamThree: false, 
     team_hq: false})

  const [isHoveringTeamOne, setIsHoveringTeamOne] = useState(false);
  const [isHoveringTeamTwo, setIsHoveringTeamTwo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
      axios 
      .get(teamOneURL)
      .then(res => {
        setTeamOne(res.data.team_one)
        console.log(res.data.team_one)
      })
}, [] )
  useEffect(() => {
    const abortController = new AbortController();

      axios 
      .get(teamTwoURL)
      .then(res => setTeamTwo(res.data.team_two))
 
}, [] )


  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    const allItems = teamOne.concat(teamTwo);
    const currentItem = allItems[oldIndex];

    switch (collection) {
      case 'teamOne':
            setTeamOne(arrayMove(teamOne, oldIndex, newIndex))
            setRoute({teamOne: true})
        setIsDragging(false);
        break;

      case 'teamTwo':
            setTeamTwo(arrayMove(teamTwo, oldIndex, newIndex))
            setRoute({teamTwo: true})
        setIsDragging(false);
        break;
      }
    }
  
    const updateBeforeSortStart = () => {
      setIsDragging(true);
    };

  useEffect(() => {
  if (route.teamOne === true) {
    axios 
    .put(`http://localhost:8082/api/squads/${id}/team-one`, teamOne)
    .then(res => console.log(res))
    .then(setRoute(!route.teamOne ))
  }
  if (route.teamTwo === true) {
    axios 
    .put(`http://localhost:8082/api/squads/${id}/team-two`, teamTwo)
    .then(res => console.log(res))
    .then(setRoute(!route.teamTwo ))
  }
  
  else (console.log('nah boy'))
}, [onSortEnd] )

  return (
  
<Container>
  <Row>
    <Col xs='6'>
      <SortableContainer 
            axis="y"
            onSortEnd={onSortEnd}
            pressDelay='100'
            onSortStart={(_, event) => event.preventDefault()}
            isDragging={isDragging}
            updateBeforeSortStart={updateBeforeSortStart}
            setIsHoveringTeamOne={setIsHoveringTeamOne}
            >
<ListGroupItem color='secondary'>Team One</ListGroupItem>
    {teamOne.map((marine, i) =>
        <Sortable
            index={i}
            key={marine._id}
            value={`${marine.last} ${i}`}
            marine={marine._id}
            collection="teamOne"
            />
        )}
      </SortableContainer>
      </Col>
      <Col xs='6'>
      <SortableContainer 
            axis="y"
            onSortEnd={onSortEnd}
            pressDelay='100'
            onSortStart={(_, event) => event.preventDefault()}
            isDragging={isDragging}
            updateBeforeSortStart={updateBeforeSortStart}
            setIsHoveringTeamOne={setIsHoveringTeamOne}
            >
<ListGroupItem color='secondary'>Team Two</ListGroupItem>
        {teamTwo.map((marine, i) => 
      
        <Sortable
            index={i} 
            key={marine._id} 
            value={`${marine.last}${i}`}
            marine={marine._id}
            collection="teamTwo"
            />
            
        )}

      </SortableContainer>
      </Col>
      </Row>
      </Container>
  

  );
}

export default TeamList