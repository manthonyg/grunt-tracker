import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Badge, Collapse, ListGroupItem, Container, Row, Col} from 'reactstrap';
import Flex from '../components/Flex'

function TeamListV3({id}) {

    const teamOneURL = `http://localhost:8082/api/squads/${id}/team-one`
    const teamTwoURL = `http://localhost:8082/api/squads/${id}/team-two`
    const teamThreeURL = `http://localhost:8082/api/squads/${id}/team-three`
    const teamHqURL = `http://localhost:8082/api/squads/${id}/team-hq`

    const [state, setState] = useState({
        teamOne: [],
        teamTwo: [],
        teamThree: [],
        teamHq: []
      })

      console.log(state)
    
  useEffect(() => {
    axios
      .get(teamOneURL)
      .then(res => setState((prevState) => {
        return {
          ...prevState,
          teamOne: res.data.team_one
        }
      }))
  }, [id])
 
  useEffect(() => {
    axios
      .get(teamTwoURL)
      .then(res => setState((prevState) => {
        return {
          ...prevState,
          teamTwo: res.data.team_two
        }
      }))
  }, [id])

  useEffect(() => {
    axios
      .get(teamThreeURL)
      .then(res => setState((prevState) => {
        return {
          ...prevState,
          teamThree: res.data.team_three
        }
      }))
  }, [id])

  useEffect(() => {
    axios
      .get(teamHqURL)
      .then(res => setState((prevState) => {
        return {
          ...prevState,
          teamHq: res.data.team_hq
        }
      }))
  }, [id])

  // a little function to help us with reordering the result

  const grid = 4;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging
      ? '#F2F2F2'
      : '#FFFFFF',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver
      ? '#DBF3FA'
      : '#F2F2F2',
    padding: grid,
    width: '120%'

  });

    const _reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
    };

    const _move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const _getList = id => {
    if (id === 'teamOne') {
      return state.teamOne
    }
    if (id === 'teamTwo') {
      return state.teamTwo
    } 
    if (id === 'teamThree') {
      return state.teamThree
    } 
    if (id === 'teamHq') {
      return state.teamHq
    } else {
      return null
    }
  };

  const onDragEnd = result => {
    const {source, destination} = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {

      const reorderedItems = 
      _reorder(_getList(source.droppableId),
      source.index,
      destination.index);
console.log(source.droppableId)
      if (source.droppableId === 'teamOne') {
        setRoute((prevState) => {
            return {
              ...prevState,
              teamOne: true
            }
          })
        setState((prevState) => {
          return {
            ...prevState,
            teamOne: reorderedItems
          }
        })
      } else if (source.droppableId === 'teamTwo') {

        setRoute((prevState) => {
            return {
              ...prevState,
              teamTwo: true
            }
          })

        setState((prevState) => {
          return {
            ...prevState,
            teamTwo: reorderedItems
          }
        })
    } else if (source.droppableId === 'teamThree') {

        setRoute((prevState) => {
            return {
              ...prevState,
              teamThree: true
            }
          })

        setState((prevState) => {
          return {
            ...prevState,
            teamThree: reorderedItems
          }
        })
      }
      else if (source.droppableId === 'teamHq') {

        setRoute((prevState) => {
            return {
              ...prevState,
              teamHq: true
            }
          })

        setState((prevState) => {
          return {
            ...prevState,
            teamHq: reorderedItems
          }
        })
      }

    } else {

      const result = 
      _move(_getList(source.droppableId), 
      _getList(destination.droppableId),
      source,
      destination);
      
      setState((prevState => {
          return {
                ...prevState,
                ...result,

          }}))
        }}
      

  const [route, setRoute] = useState({
    teamOne: false, 
    teamTwo: false, 
    teamThree: false, 
    teamHq: false})

  useEffect(() => {
    if (route.teamOne === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-one`, state.teamOne)
        .then(res => console.log(res))
        .then(setRoute((prevState => {
          return {
          ...prevState,
            teamOne: !state.teamOne}})))
    }
    if (route.teamTwo === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/team-two`, state.teamTwo)
        .then(res => console.log(res))
        .then(setRoute((prevState => {
          return {
          ...prevState,
            teamTwo: !state.teamTwo}})))
    } 
    if (route.teamThree === true) {
        axios
          .put(`http://localhost:8082/api/squads/${id}/team-three`, state.teamThree)
          .then(res => console.log(res))
          .then(setRoute((prevState => {
            return {
            ...prevState,
              teamThree: !state.teamThree}})))
      }
      if (route.teamHq === true) {
        axios
          .put(`http://localhost:8082/api/squads/${id}/team-hq`, state.teamHq)
          .then(res => console.log(res))
          .then(setRoute((prevState => {
            return {
            ...prevState,
              teamHq: !state.teamHq}})))
      } else 
      return undefined
  }, [onDragEnd])

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
     
    <DragDropContext onDragEnd={onDragEnd}>
        <Container fluid={true}>
            <Row>
                <Col xs='4'>
                <Badge color="secondary">1</Badge>
      <Droppable droppableId="teamOne">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {state
              .teamOne
              .map((item, index) => (
        
                <Draggable key={item.last} draggableId={item.last} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                      {item.last}
                    </div>
                  )}
                </Draggable>
          
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </Col>
      <Col xs='4'>
      <Badge color="secondary">2</Badge>
      <Droppable droppableId="teamTwo">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {state
              .teamTwo
              .map((item, index) => (
                <Draggable key={item.last} draggableId={item.last} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                      {item.last}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </Col>
      <Col xs='4'>
      <Badge color="secondary" >3</Badge>
      <Droppable droppableId="teamThree">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {state
              .teamThree
              .map((item, index) => (
                <Draggable key={item.last} draggableId={item.last} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                      {item.last}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </Col>
      </Row>
      <Row>
      <Col xs='12'>
      <Badge color="secondary">HQ</Badge>
      <Droppable droppableId="teamHq">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {state
              .teamHq
              .map((item, index) => (
                <Draggable key={item.last} draggableId={item.last} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                      {item.last}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </Col>
      </Row>
      </Container>
    </DragDropContext>

  );
}

export default TeamListV3