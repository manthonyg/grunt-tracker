import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Flex from './Flex'
import {Link} from 'react-router-dom';

const SortableContainer = sortableContainer(({ 
  children}) => 
<ListGroup>{children}</ListGroup>
);

const Sortable = sortableElement(({
  team, 
  marine }) => 
<ListGroupItem>
    {team}
    <Flex justifyBetween alignCenter>
        <Link to={`/show-marine/${marine}`}>
            <i class="material-icons">visibility</i>
        </Link>
  </Flex>
</ListGroupItem>);





function TeamList({ squad_id }) {

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

  useEffect(() => {
    axios 
    .get(`http://localhost:8082/api/marines/`)
    .then(res => setTeamOne(res.data))
    return axios
    .get(`http://localhost:8082/api/marines/`)
    .then(res => setTeamTwo(res.data))
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
    .put(`http://localhost:8082/api/squads/${squad_id}/team-one`, teamOne)
    .then(res => console.log(res))
    .then(setRoute(!route.teamOne ))
  }
  if (route.teamTwo === true) {
    axios 
    .put(`http://localhost:8082/api/squads/${squad_id}/team-two`, teamTwo)
    .then(res => console.log(res))
    .then(setRoute(!route.teamTwo ))
  }
  
  else (console.log('nah boy'))
}, [onSortEnd] )


  return (
  
      <div

      >
    
      <SortableContainer 
            axis="y"
            onSortEnd={onSortEnd}
            pressDelay='100'
            onSortStart={(_, event) => event.preventDefault()}
            isDragging={isDragging}
            updateBeforeSortStart={updateBeforeSortStart}
            setIsHoveringTeamOne={setIsHoveringTeamOne}
            >

        {teamOne.map((marine, i) =>
        <Sortable
            index={i}
            key={marine._id}
            team={marine.last}
            marine={marine._id}
            collection="teamOne"
            />
        )}
      </SortableContainer>
      <SortableContainer 
            axis="y"
            onSortEnd={onSortEnd}
            pressDelay='100'
            onSortStart={(_, event) => event.preventDefault()}
            isDragging={isDragging}
            updateBeforeSortStart={updateBeforeSortStart}
            setIsHoveringTeamOne={setIsHoveringTeamOne}
            >
  
        {teamTwo.map((marine, i) => 
      
        <Sortable
            index={i} 
            key={marine._id} 
            team={marine.rank} 
            marine={marine._id}
            collection="teamTwo"
            />
            
        )}

      </SortableContainer>
   
   
  </div>
  );
}

export default TeamList