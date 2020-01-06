import React, { useState, useEffect, useCallback, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap';
import Badge from '../components/Badge'
import { getTeamsById } from '../services/get';
import { updateTeamsById } from '../services/put';
import axios from 'axios'

function TeamList({id}) {

  const BadgeOuter = styled.div `
  align-items: center;
  background-color: ${props => {
    if (props.remove) return 'red';
    return '#fff'}}
	border: ${props => {
    if (props.remove) return 'none';
    return '2px solid #AEBD38'}}
	border-radius: 99em;
	color: ${props => {
    if (props.remove) return '#fff';
    return '#000'}}
	display: flex;
	font-size: 0.77em;
	font-weight: 700;
	height: 2em;
	justify-content: center;
	line-height: 1;
	min-width: 2em;
	position: absolute;
	right: -2px;
  top: -2px;
  &:after {
    content: ${props => {
      if (props.remove) return 'X'
      return ''
    }}
  }
  
  `
  const BadgeInner = styled.span `
  border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	height: 1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
  width: 1px !important;
  &:nth-of-type(4) {
    display: none;
  }
  `

  const Button = styled.div `
  background: transparent;
	color: inherit;
	display: inline-block;
	font: inherit;
	height: auto;
	line-height: 1;
	margin: 0;
	padding: 0;
	position: relative;
	text-align: center;
	text-decoration: none;
	user-select: none;
  `

  const ButtonInner = styled.span `
  align-items: center;
  border-radius: .25rem;
  background: #fff;
  border: #000 1px solid;
	color: #000;
	display: flex;
	font-weight: 300;
	height: 1.75em;
	min-width: 2.5em;
	padding: 1em 1em;
	position: relative;
	transition: 0.2s ease;
  width: 100%;
  `
  const grid = 4;

  const getUnplacedItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: '5px 8px',
    margin: `0 ${grid}px 0 0`,
    borderRadius: '.25rem',
    background: isDragging
      ? '#68829e'
      : '#fff',
    ...draggableStyle
  });

  const getUnplacedListStyle = isDraggingOver => ({
    background: isDraggingOver
      ? '#fff'
      : '#fff',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    width: '100%',
    border: isDraggingOver
      ? '2px dashed black'
      : 'none'
  });

  const [state, setState] = useState({
      team_one: [], 
      team_two: [], 
      team_three: [], 
      team_hq: []})

  const componentIsMounted = useRef(true);

  useEffect(() => {
    getTeamsById(id)
    .then(res => {
      if (componentIsMounted.current) {
        setState({
          team_hq: res.teams.team_hq,
          team_one: res.teams.team_one, 
          team_two: res.teams.team_two, 
          team_three: res.teams.team_three, 
          })
      }
    })
    .catch(err => {
      console.log(err)
    });
    return () => {
      componentIsMounted.current = false
    }
  }, [id])
  console.log(state)

  const onDragEnd = useCallback((result) => {

    const _getList = id => {
      if (id === 'team_one') {
        return state.team_one
      }
      if (id === 'team_two') {
        return state.team_two
      }
      if (id === 'team_three') {
        return state.team_three
      }
      if (id === 'team_hq') {
        return state.team_hq
      } else {
        return null
      }
    };

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

    const {source, destination} = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {

      const reorderedItems = _reorder(_getList(source.droppableId), source.index, destination.index);

      setState((prevState => {
        return {
          ...prevState,
          [source.droppableId]: reorderedItems,
        }
      }))
      setRoute(true)
    } else {

      const result = _move(_getList(source.droppableId), _getList(destination.droppableId), source, destination);

      setState((prevState => {
        return {
          ...prevState,
          ...result,
        }
      }))
      setRoute(true)
      console.log(state)
    }
  }, [state.team_hq, state.team_one, state.team_two, state.team_three, state.unplaced])

  const [route, setRoute] = useState(false)

  useEffect(() => {
    if (route === true) {
      updateTeamsById(id, state)}
  }, [onDragEnd, state, route, id])

  const [removeStyle, setRemoveStyle] = useState(false)
  const handleRemoveStyle = () => setRemoveStyle(!removeStyle)
 
  const removeMarine = (evt) => {
    evt.persist();
    const marineId = evt.target.id
    axios
      .get(`http://localhost:8082/api/search/`)
      .then(res => {
        console.log(res)
      })
  }

  

 
  return (

  <DragDropContext onDragEnd={onDragEnd}>
    <Button onClick={handleRemoveStyle}>Remove</Button>
      <Container fluid={true}>
        <Row>
          <Col>
            <Badge color="none">HQ ({state.team_hq.length})</Badge>
            <Droppable droppableId="team_hq" direction="horizontal">
              {(provided, snapshot) => (

                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                  {state
                    .team_hq
                    .map((item, index) => (
                     
                        <Draggable key={item.last} draggableId={item.last} index={index}>
                          {(provided, snapshot) => (
                            <Button
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getUnplacedItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                              <ButtonInner>
                                {item.last}
                              </ButtonInner>
                              <BadgeOuter remove={removeStyle} onClick={removeMarine}>
                                <BadgeInner></BadgeInner>
                                {!!removeStyle ?
                                <i className="material-icons" id={item._id}>remove</i>
                                : index === 0
                                  ? 'SL'
                                  : index === 1
                                    ? 'A/'
                                    : index === 2
                                      ? 'DM'
                                        : 'RO'}
                              </BadgeOuter>
                            </Button>

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
          <Col>
            <Badge color="none">Team One ({state.team_one.length})</Badge>
            <Droppable droppableId="team_one" direction="horizontal">

              {(provided, snapshot) => (

                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                  {state
                    .team_one
                    .map((item, index) => (

                     

                        <Draggable key={item.last} draggableId={item.last} index={index}>
                          {(provided, snapshot) => (
                            <Button
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getUnplacedItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                              <ButtonInner>
                                {item.last}
                              </ButtonInner>
                              <BadgeOuter color={index}>
                                <BadgeInner {...index}></BadgeInner>
                                {index === 0
                                  ? 'TL'
                                  : index === 1
                                    ? 'G'
                                    : index === 2
                                      ? 'AR'
                                      : 'R' }
                              </BadgeOuter>
                            </Button>

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
          <Col>
            <Badge color="none">Team Two ({state.team_two.length})</Badge>
            <Droppable droppableId="team_two" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                  {state
                    .team_two
                    .map((item, index) => (
                      <Draggable key={item.last} draggableId={item.last} index={index}>
                        {(provided, snapshot) => (
                          <Button
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getUnplacedItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <ButtonInner>
                              {item.last}
                            </ButtonInner>
                            <BadgeOuter color={index}>
                              <BadgeInner {...index}></BadgeInner>
                              {index === 0
                                ? 'TL'
                                : index === 1
                                  ? 'G'
                                  : index === 2
                                    ? 'AR'
                                    : 'R'}
                            </BadgeOuter>
                          </Button>

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
          <Col>
            <Badge color="none">Team Three ({state.team_three.length})</Badge>
            <Droppable droppableId="team_three" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                  {state
                    .team_three
                    .map((item, index) => (
                      <Draggable key={item.last} draggableId={item.last} index={index}>
                        {(provided, snapshot) => (
                          <Button
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getUnplacedItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <ButtonInner>
                              {item.last}
                            </ButtonInner>
                            <BadgeOuter color={index}>
                              <BadgeInner {...index}></BadgeInner>
                              {index === 0
                                ? 'TL'
                                : index === 1
                                  ? 'G'
                                  : index === 2
                                    ? 'AR'
                                    : 'R' }
                            </BadgeOuter>
                          </Button>

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

  )
}

export default TeamList