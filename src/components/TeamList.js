import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import {ListGroup, ListGroupItem, Container, Row, Col} from 'reactstrap';
import Flex from './Flex'
import {Link} from 'react-router-dom';
import styled from 'styled-components'
const teamOneURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-one`
const teamTwoURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-two`

const ColorContainer = styled.div `
border: ${props => (props.hovering
  ? '2px dotted black'
  : 'white')}`

const SortableContainer = sortableContainer(({children, hovering}) => 
  <ListGroup flush><ColorContainer hovering={hovering}>{children}</ColorContainer></ListGroup>)

const Sortable = sortableElement(({value, marine}) => <ListGroupItem>
  {value}
  <Flex justifyBetween alignCenter>
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
    team_hq: false})

  const [isHoveringTeamOne, setIsHoveringTeamOne] = useState(false);
  const [isHoveringTeamTwo, setIsHoveringTeamTwo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [numbers, setNumbers] = useState([
    "Itema 1",
    "Itemb 2",
    "Itemc 3",
    "Itemd 4",
    "Iteme 5",
    "Itemf 6"
  ]);
  console.log(`hovering team one: ${isHoveringTeamOne} and dragging is ${isDragging}`)
  console.log(`hovering team two: ${isHoveringTeamTwo} and dragging is ${isDragging}`)

  useEffect(() => {
    axios
      .get(teamOneURL)
      .then(res => setTeamOne(res.data.team_one))
  }, [])

  useEffect(() => {
    axios
      .get(teamTwoURL)
      .then(res => setTeamTwo(res.data.team_two))
  }, [])

  const onSortEnd = ({oldIndex, newIndex, collection}) => {
    const allItems = [
      ...teamOne,
      ...teamTwo
    ];
    const currentItem = allItems[oldIndex];
    console.log(allItems)

    if (isHoveringTeamOne) {
      if (teamOne.includes(currentItem)) {
        setTeamOne(arrayMove(teamOne, oldIndex, newIndex))
        setRoute({teamOne: true})
       
      } else if (!teamOne.includes(currentItem)) {
        teamOne.splice(newIndex, 0, currentItem);
        teamTwo.splice(teamTwo.indexOf(currentItem), 1);
        setTeamOne([...teamOne]);
        setTeamTwo([...teamTwo]);
      }
    }
    console.log(currentItem)

    if (isHoveringTeamTwo) {
      if (teamTwo.includes(currentItem)) {
        setRoute({teamTwo: true})
        setTeamTwo(arrayMove(teamTwo, oldIndex, newIndex))
        
      } else if (!teamTwo.includes(currentItem)) {
        // teamOne.splice(newIndex, 0, currentItem);
        // teamTwo.splice(teamTwo.indexOf(currentItem), 1);
        // setTeamOne([...teamOne]);
        // setTeamTwo([...teamTwo]);
      }
    }
    setIsDragging(false);
  }

  const updateBeforeSortStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (route.teamOne === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-one`, teamOne)
        .then(res => console.log(res))
        .then(setRoute(!route.teamOne))
    }
    if (route.teamTwo === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-two`, teamTwo)
        .then(res => console.log(res))
        .then(setRoute(!route.teamTwo))
    } else 
      (console.log('nah boy'))
  }, [onSortEnd])

  return (

    <SortableContainer
      hovering={isDragging}
      axis="y"
      onSortEnd={onSortEnd}
      pressDelay='100'
      onSortStart={(_, event) => event.preventDefault()}
      isDragging={isDragging}
      updateBeforeSortStart={updateBeforeSortStart}>

      <Container>

        <Row>

          <Col
            xs='6'
            onMouseEnter={() => setIsHoveringTeamOne(true)}
            onMouseLeave={() => setIsHoveringTeamOne(false)}>
            <ListGroupItem color='secondary'>Team One</ListGroupItem>
            {teamOne.map((marine, i) => <Sortable
              index={i}
              key={marine._id}
              value={`${marine.last} ${i}`}
              marine={marine._id}
              collection="teamOne"/>)}
          </Col>

          <Col
            xs='6'
            onMouseEnter={() => setIsHoveringTeamTwo(true)}
            onMouseLeave={() => setIsHoveringTeamTwo(false)}>

            <ListGroupItem color='secondary'>Team Two</ListGroupItem>
            {numbers.map((marine, i) => <Sortable
              index={i}
              key={marine}
              value={`${marine} e ${i}`}
              marine={marine}
              collection="teamTwo"/>)}
          </Col>

        </Row>

      </Container>

    </SortableContainer>

  );
}

export default TeamList