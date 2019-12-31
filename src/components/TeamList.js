import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {
  Container,
  Row,
  Col,
  Badge
} from 'reactstrap';

function TeamList({id}) {

  const BadgeOuter = styled.div `
  align-items: center;
  background-color: #fff;
	border: 2px solid #00a0b0;
	border-radius: 99em;
	color: #00a0b0;
	display: flex;
	font-size: 0.77em;
	font-weight: 400;
	height: 2em;
	justify-content: center;
	line-height: 1;
	min-width: 2em;
	position: absolute;
	right: -2px;
	top: -2px;
  `
  const BadgeInner = styled.span `
  border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	height: 1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
  width: 1px !important;
  `

  const Button = styled.div `
  background: transparent;
	border: 0;
	border-radius: 0;
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
  background: #fff;
  border: #65737e 1px solid;
	border-radius: 4px;
	color: #000;
	display: flex;
	font-weight: 600;
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
    color: '#696969',
    background: isDragging
      ? '#fff'
      : '#fff',
    ...draggableStyle
  });

  const getUnplacedListStyle = isDraggingOver => ({
    background: isDraggingOver
      ? '#00a0b0'
      : '#fff',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    width: '100%',
    border: isDraggingOver
      ? '2px dotted black'
      : 'none'
  });


  const teamsURI = `http://localhost:8082/api/squads/${id}/teams`
  const [state, setState] = useState({
    unplaced: [], 
    team_one: [], 
    team_two: [], 
    team_three: [], 
    team_hq: []})

  useEffect(() => {
    axios
      .get(teamsURI)
      .then(res => setState({
        unplaced: res.data.teams.unplaced, 
        team_one: res.data.teams.team_one, 
        team_two: res.data.teams.team_two, 
        team_three: res.data.teams.team_three, 
        team_hq: res.data.teams.team_hq}))
  }, [teamsURI, id])


  const onDragEnd = useCallback((result) => {

    const _getList = id => {
      if (id === 'unplaced') {
        return state.unplaced
      }
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
          [source.droppableId]: reorderedItems
        }
      }))
      setRoute(true)

    } else {

      const result = _move(_getList(source.droppableId), _getList(destination.droppableId), source, destination);

      setState((prevState => {
        return {
          ...prevState,
          ...result
        }
      }))
      setRoute(true)

    }
  }, [state.team_hq, state.team_one, state.team_two, state.team_three, state.unplaced])

  const [route, setRoute] = useState(false)

  useEffect(() => {
    if (route === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/teams/update`, state)
        .then(res => console.log(res))
        .then(setRoute(!route))
    }
  }, [ onDragEnd, state, route, id ])

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <Container fluid={true}>
        <Row>
          <Col>
          <Badge color="none">Unplaced ({state.unplaced.length})</Badge>
            <Droppable droppableId="unplaced" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                  {state
                    .unplaced
                    .map((item, index) => (
                      <Link to={`/show-marine/${item._id}`}>
                        <Draggable key={item.last} draggableId={item.last} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getUnplacedItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                              {item.last}
                            </div>
                          )}
                        </Draggable>
                      </Link>
                    ))}
                  {provided.placeholder}
                </div>
              )}

            </Droppable>

          </Col>
        </Row>
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
                      <Link to={`/show-marine/${item._id}`}>

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
                                      : index === 3
                                        ? 'R'
                                        : null}
                              </BadgeOuter>
                            </Button>

                          )}
                        </Draggable>
                      </Link>

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
                    
                      <Link to={`/show-marine/${item._id}`}>

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
                                      : index === 3
                                        ? 'R'
                                        : null}
                              </BadgeOuter>
                            </Button>

                          )}
                        </Draggable>
                      </Link>

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
                                    : index === 3
                                      ? 'R'
                                      : null}
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
                                    : index === 3
                                      ? 'R'
                                      : null}
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