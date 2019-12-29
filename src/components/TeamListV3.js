import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';
import {
  Badge,
  Collapse,
  ListGroupItem,
  Container,
  Row,
  Col
} from 'reactstrap';
import Flex, {Column} from '../components/Flex'

function TeamListV3({id}) {
  const teamsURI = `http://localhost:8082/api/squads/${id}/teams`
  const [state,
    setState] = useState({
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
          team_hq: res.data.teams.team_hq
      }))
  }, [])

  console.log(state)

  const grid = 4;

  const getUnplacedItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '5px 8px',
  margin: `0 ${grid}px 0 0`,
  color: 'white',

  // change background colour if dragging
  background: isDragging ? '#29a8ab' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
  });

  const getUnplacedListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#eeeeee' : 'white',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
  width: '100%',
  border: isDraggingOver? '2px dotted black' : 'none'



  });



const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid,
  width: '100%',


  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'none',
  border: '1px solid grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({

  background: isDraggingOver ? "lightblue" : "none",
  padding: grid,
  textAlign: 'left',
  width: '30vw',

  borderRadius: '5px',
  border: isDraggingOver? '2px dotted black' : 'none'
});


  const onDragEnd = result => {

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
      console.log('result', result)
      
      setState((prevState => {
        return {
          ...prevState,
          ...result
          // [source.droppableId]: result[Object.keys(result)[0]],
          // [destination.droppableId]: result[Object.keys(result)[1]]
        }
      }))
      setRoute(true)
     
     
    }}

  const [route,
    setRoute] = useState(false)

  useEffect(() => {
    if (route === true) {
      axios
        .put(`http://localhost:8082/api/squads/${id}/teams/update`, state)
        .then(res => console.log(res))
        .then(setRoute(!route))
    }
  }, [onDragEnd])

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      
      <Container fluid={true}>
      {!!state.unplaced.length &&
          <Row>
            <Col>
            <Badge color="none">Unplaced</Badge>
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
      </Row>}
      
        
    
          <Row>
            <Col>
            <Badge color="none">1st Team</Badge>
              <Droppable droppableId="team_one" direction="horizontal">
                {(provided, snapshot) => (
                  
                  <div ref={provided.innerRef} style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                    {state
                      .team_one
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
                        </Draggable></Link>

                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            </Row>
            <Row>
            <Col>
            <Badge color="none">2nd Team</Badge>
              <Droppable droppableId="team_two" direction="horizontal">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                    {state
                      .team_two
                      .map((item, index) => (
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
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
            </Row>
            <Row>
            <Col>
            <Badge color="none">3rd Team</Badge>
              <Droppable droppableId="team_three" direction="horizontal">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} style={getUnplacedListStyle(snapshot.isDraggingOver)}>

                    {state
                      .team_three
                      .map((item, index) => (
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
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Col>
          </Row>
        </Container>
      </DragDropContext>

  )}

  export default TeamListV3