import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {sortableContainer, sortableElement, sortableHandle} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {ListGroup, ListGroupItem, Container, Row, Col} from 'reactstrap';
import Flex from './Flex'
import {Link} from 'react-router-dom';
import styled from 'styled-components'
const teamOneURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-one`
const teamTwoURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-two`

const DropzoneContainer = styled.div `
border: ${props => (props.active
  ? '2px dotted black'
  : 'white')}
background-color: ${props => (props.active
  ? 'gray'
  : 'white')}`

const DragHandle = sortableHandle(() =>
<span>
  <i class="material-icons">drag_indicator</i>
</span>);

const SortableContainer = sortableContainer(({children}) =>
<ListGroup flush>{children}</ListGroup>)

const Sortable = sortableElement(({value, marine}) =>
<ListGroupItem>
<Flex justifyAround alignCenter>
  <DragHandle/>
  {value}
    <Link to={`/show-marine/${marine}`}>
      {/* <i class="material-icons">visibility</i> */}
    </Link>
  </Flex>
</ListGroupItem>);

function TeamList({id, isLoading}) {

  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);
  const [route, setRoute] = useState({
    teamOne: false, 
    teamTwo: false, 
    teamThree: false, 
    teamHq: false})

  const [isHoveringTeamOne, setIsHoveringTeamOne] = useState(false);
  const [isHoveringTeamTwo, setIsHoveringTeamTwo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    axios
      .get(teamOneURL)
      .then(res => setTeamOne(res.data.team_one))
  }, [teamOneURL])

  useEffect(() => {
    axios
      .get(teamTwoURL)
      .then(res => setTeamTwo(res.data.team_two))
  }, [teamTwoURL])


  const onSortMove = (evt) => {
 
  }

  const onSortOver = ({oldIndex, newIndex, collection})=> {
   
  }


  const onSortEnd = ({oldIndex, newIndex, collection}) => {
    const allItems = [
      ...teamOne,
      ...teamTwo
    ];
    const currentItem = isHoveringTeamOne? allItems[oldIndex] : allItems[oldIndex + teamOne.length];
    console.log(currentItem, oldIndex, newIndex, collection)
    switch(collection) {

      case 'teamOne': 
      if (isHoveringTeamOne) {
       
        if (teamOne.includes(currentItem)) {
          setRoute((prevState => {
            return {
            ...prevState,
              teamOne: true}}))
         setTeamOne(arrayMove(teamOne, oldIndex, newIndex));
          } else { 
            console.log('next options')
           
          }}
    break
    case 'teamTwo': 
      if (isHoveringTeamTwo) {
        if (teamTwo.includes(currentItem)) {
         setTeamTwo(arrayMove(teamTwo, oldIndex, newIndex));
          setRoute((prevState => {
              return {
              ...prevState,
                teamTwo: true}}))
              } else {
                console.log('next options')}}
    break
              }}

//while dragging, if container is being hovered, separate the items

// on dropping, if container is hovered and contains the current item, splice the current item into the current index.

//if container hovered does not contain the current item, slice the item from the original list and splice the current item into the current list.


  const updateBeforeSortStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (route.teamOne === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-one`, teamOne)
        .then(res => console.log(res))
        .then(console.log(`teamOne route is ${route.teamOne}. teamTwo route is${route.teamTwo}`))
        .then(setRoute((prevState => {
          return {
          ...prevState,
            teamOne: !teamOne}})))
    }
    if (route.teamTwo === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-two`, teamTwo)
        .then(res => console.log(res))
        .then(console.log(`teamTwo route is ${route.teamTwo}`))
        .then(setRoute((prevState => {
          return {
          ...prevState,
            teamTwo: !teamTwo}})))
    } else 
      return undefined
  }, [onSortEnd])

  return (

    <SortableContainer
      helperContainer={isHoveringTeamOne? 'f' : 'd'}
      useDragHandle
      hovering={isDragging}
      axis="y"
      onSortEnd={onSortEnd}
      pressDelay='100'
      onSortStart={(_, event) => event.preventDefault()}
      isDragging={isDragging}
      updateBeforeSortStart={updateBeforeSortStart}
      onSortMove={onSortMove}
      onSortOver={onSortOver}
      setIsHoveringTeamOne={setIsHoveringTeamOne}
      setIsHoveringTeamTwo={setIsHoveringTeamTwo}>

      <Container>

        <Row>

          <Col
            xs='6'
            onMouseEnter={() => setIsHoveringTeamOne(true)}
            onMouseLeave={() => setIsHoveringTeamOne(false)}>
            <DropzoneContainer active={isDragging && isHoveringTeamOne}>
              <ListGroupItem color='secondary'>Team One</ListGroupItem>
              {teamOne.map((marine, i) => <Sortable
                index={i}
                key={marine._id}
                value={`${marine.last} ${i}`}
                marine={marine._id}
                collection="teamOne"/>)}
            </DropzoneContainer>
          </Col>

          <Col
            xs='6'
            onMouseEnter={() => setIsHoveringTeamTwo(true)}
            onMouseLeave={() => setIsHoveringTeamTwo(false)}>
            <DropzoneContainer active={isDragging && isHoveringTeamTwo}>
              <ListGroupItem color='secondary'>Team Two</ListGroupItem>
              {teamTwo.map((marine, i) => 
              <Sortable
                index={i}
                key={marine._id}
                value={`${marine.last}copy ${i}`}
                marine={marine._id}
                collection="teamTwo"/>)}
            </DropzoneContainer>
          </Col>

        </Row>

      </Container>

    </SortableContainer>

  );
}

export default TeamList