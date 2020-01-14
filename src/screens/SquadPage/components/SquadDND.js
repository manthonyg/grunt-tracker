import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
//Packages
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled, { keyframes, css } from "styled-components";
import { Alert } from "reactstrap";
//Global components
import Badge from "../../../components/Badge";
import Flex from "../../../components/Flex";
//Services
import { getSquadsTeamsById, updateSquadById } from "../../../services/squadServices";


function SquadDND({ id }) {
  const wobble = keyframes`
  {
    0% {
              transform: translate(0);
    }
    20% {
              transform: translate(-2px, 2px);
    }
    40% {
              transform: translate(-2px, -2px);
    }
    60% {
              transform: translate(2px, 2px);
    }
    80% {
              transform: translate(2px, -2px);
    }
    100% {
              transform: translate(0);
    }
  }
  `;

  const wobbleEffect = css`
    animation: ${wobble} 0.5s infinite;
  `;

  const BadgeOuter = styled.div`
  align-items: center;
  background-color: ${props => {
    if (props.remove) return "crimson";
    return "#fff";
  }}
	border: ${props => {
    if (props.remove) return "none";
    return "2px solid #AEBD38";
  }}
	border-radius: 99em;
	color: ${props => {
    if (props.remove) return "#fff";
    return "#000";
  }}
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
      if (props.remove) return "X";
      return "";
    }}
  }
  ${props => props.remove && wobbleEffect}
  
  `;
  const BadgeInner = styled.span`
  border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	height: 1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
  width: 1px !important;
  animation: ${props => {
    if (props.remove) return `$wobble 4s infinite`;
    return "";
  }}
  &:nth-of-type(4) {
    display: none;
  }
  `;

  const ButtonOuter = styled.div`
    background: transparent;
    color: inherit;
    display: inline-block;
    font: inherit;
    height: 1rem;
    line-height: 1;
    margin: 0;
    padding: 0;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
  `;

  const ButtonInner = styled.span`
    align-items: center;
    border-radius: .10rem;
    background: #AEBD38;
    border: #505160 2px solid;
    color: #000;
    display: flex;
    font-weight: 300;
    height: 1rem;
    min-width: 2.5em;
    padding: 1em 1em;
    position: relative;
    transition: 0.2s ease;
    width: 100%;
  `;

  const StyledIcon = styled.h1`
  color: #05668d;
  `

  const StyledAlert = styled(Alert)`
    z-index: 10000;
    background-color: #AEBD38
  `;
  const grid = 4;

  const billet = {
    squadLeader: "SL",
    assistantSquadLeader: "A/",
    teamLeader: "TL",
    designatedMarksman: "DM",
    radioOperator: "R",
    grenadier: "G",
    autoRifleman: "AR",
    rifleman: "R"
  };

  const getUnplacedItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: "2px 8px",
    margin: `0 ${grid}px 0 0`,
    borderRadius: ".25rem",
    background: isDragging ? "none" : "none",
    ...draggableStyle
  });

  const getUnplacedListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#fff" : "#fff",
    display: "flex",
    padding: grid,
    height: '4rem',
    overflow: "auto",
    width: "100%",
    border: isDraggingOver ? "4px dashed #AEBD38" : "4px dashed #eee"
  });

  const [state, setState] = useState({
    teamOne: [],
    teamTwo: [],
    teamThree: [],
    teamHq: []
  });

  const componentIsMounted = useRef(true);

  useEffect(() => {
    getSquadsTeamsById(id)
      .then(res => {
        if (componentIsMounted.current) {
          setState({
            teamHq: res.teams.teamHq,
            teamOne: res.teams.teamOne,
            teamTwo: res.teams.teamTwo,
            teamThree: res.teams.teamThree
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    return () => {
      componentIsMounted.current = false;
    };
  }, [id]);

  const onDragEnd = useCallback(
    result => {
      const _getList = id => {
        if (id === "teamOne") {
          return state.teamOne;
        }
        if (id === "teamTwo") {
          return state.teamTwo;
        }
        if (id === "teamThree") {
          return state.teamThree;
        }
        if (id === "teamHq") {
          return state.teamHq;
        } else {
          return null;
        }
      };

      const _reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      const _move = (
        source,
        destination,
        droppableSource,
        droppableDestination
      ) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;
        return result;
      };

      const { source, destination } = result;
      if (!destination) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedItems = _reorder(
          _getList(source.droppableId),
          source.index,
          destination.index
        );

        setState(prevState => {
          return {
            ...prevState,
            [source.droppableId]: reorderedItems
          };
        });
        setRoute(true);
      } else {
        const result = _move(
          _getList(source.droppableId),
          _getList(destination.droppableId),
          source,
          destination
        );

        setState(prevState => {
          return {
            ...prevState,
            ...result
          };
        });
        setRoute(true);
        console.log(state);
      }
    },
    [
      state.teamHq,
      state.teamOne,
      state.teamTwo,
      state.teamThree,
      state.unplaced
    ]
  );

  const [route, setRoute] = useState(false);

  useEffect(() => {
    if (route === true) {
      updateSquadById(id, state);
    }
  }, [onDragEnd, state, route, id]);

  const [removeStyle, setRemoveStyle] = useState(false);
  const handleRemoveStyle = () => setRemoveStyle(!removeStyle);
  const [toastVisible, setToastVisible] = useState(false);
  const onDismiss = () => setToastVisible(false);

  const removeMarine = evt => {
    evt.persist();
    const marineId = evt.target.id;
    axios
      .delete(`http://localhost:8082/api/marines/${marineId}/${id}`)
      .then(res => {
        console.log(res);
        setToastVisible(true);
        setState(prevState => {
          return {
            ...prevState,
            teamHq: state.teamHq.filter(m => m._id != marineId),
            teamOne: state.teamOne.filter(m => m._id != marineId),
            teamTwo: state.teamTwo.filter(m => m._id != marineId),
            teamThree: state.teamThree.filter(m => m._id != marineId)
          };
        });
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledAlert color="success" isOpen={toastVisible} toggle={onDismiss}>
        Marine Successfully Deleted
      </StyledAlert>
      <Flex justifyAround>
     
      <StyledIcon>
        <i className="material-icons" onClick={handleRemoveStyle}>
          {removeStyle ? 'delete_forever' : 'delete'}
        </i>
      </StyledIcon>
      
      <StyledIcon>
        <i className="material-icons">
          save_alt
        </i>
      </StyledIcon>
      

      </Flex>
    <Flex>
            <Badge color="none">HQ ({state.teamHq.length})</Badge>
            <Droppable droppableId="teamHq" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}
                >
                  {state.teamHq.map((item, index) => (
                    <Draggable
                      key={item.last}
                      draggableId={item.last}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ButtonOuter
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getUnplacedItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ButtonInner>{item.last}</ButtonInner>
                          <BadgeOuter
                            remove={removeStyle}
                            onClick={removeMarine}
                          >
                            <BadgeInner></BadgeInner>
                            {!!removeStyle ? (
                              <i className="material-icons" id={item._id}>
                                remove
                              </i>
                            ) : index === 0 ? (
                              billet.squadLeader
                            ) : index === 1 ? (
                              billet.assistantSquadLeader
                            ) : index === 2 ? (
                              billet.designatedMarksman
                            ) : (
                              billet.radioOperator
                            )}
                          </BadgeOuter>
                        </ButtonOuter>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
      
       
            <Badge color="none">Team One ({state.teamOne.length})</Badge>
            <Droppable droppableId="teamOne" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}
                >
                  {state.teamOne.map((item, index) => (
                    <Draggable
                      key={item.last}
                      draggableId={item.last}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ButtonOuter
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getUnplacedItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ButtonInner>{item.last}</ButtonInner>
                          <BadgeOuter
                            remove={removeStyle}
                            onClick={removeMarine}
                          >
                            <BadgeInner {...index}></BadgeInner>
                            {!!removeStyle ? (
                              <i className="material-icons" id={item._id}>
                                remove
                              </i>
                            ) : index === 0 ? (
                              billet.teamLeader
                            ) : index === 1 ? (
                              billet.autoRifleman
                            ) : index === 2 ? (
                              billet.grenadier
                            ) : (
                              billet.rifleman
                            )}
                          </BadgeOuter>
                        </ButtonOuter>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
        
      
            <Badge color="none">Team Two ({state.teamTwo.length})</Badge>
            <Droppable droppableId="teamTwo" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}
                >
                  {state.teamTwo.map((item, index) => (
                    <Draggable
                      key={item.last}
                      draggableId={item.last}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ButtonOuter
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getUnplacedItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ButtonInner>{item.last}</ButtonInner>
                          <BadgeOuter
                            remove={removeStyle}
                            onClick={removeMarine}
                          >
                            <BadgeInner {...index}></BadgeInner>
                            {!!removeStyle ? (
                              <i className="material-icons" id={item._id}>
                                remove
                              </i>
                            ) : index === 0 ? (
                              billet.teamLeader
                            ) : index === 1 ? (
                              billet.autoRifleman
                            ) : index === 2 ? (
                              billet.grenadier
                            ) : (
                              billet.rifleman
                            )}
                          </BadgeOuter>
                        </ButtonOuter>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
      
       
            <Badge color="none">Team Three ({state.teamThree.length})</Badge>
            <Droppable droppableId="teamThree" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getUnplacedListStyle(snapshot.isDraggingOver)}
                >
                  {state.teamThree.map((item, index) => (
                    <Draggable
                      key={item.last}
                      draggableId={item.last}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ButtonOuter
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getUnplacedItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <ButtonInner>{item.last}</ButtonInner>
                          <BadgeOuter
                            remove={removeStyle}
                            onClick={removeMarine}
                          >
                            <BadgeInner {...index}></BadgeInner>
                            {!!removeStyle ? (
                              <i className="material-icons" id={item._id}>
                                remove
                              </i>
                            ) : index === 0 ? (
                              billet.teamLeader
                            ) : index === 1 ? (
                              billet.autoRifleman
                            ) : index === 2 ? (
                              billet.grenadier
                            ) : (
                              billet.rifleman
                            )}
                          </BadgeOuter>
                        </ButtonOuter>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
       
            </Flex>
    </DragDropContext>
  );
}

export default SquadDND;
