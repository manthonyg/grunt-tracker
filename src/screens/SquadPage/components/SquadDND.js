import React, { useState, useEffect, useCallback } from "react";
//Packages
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled, { keyframes, css } from "styled-components";
import { Alert } from "reactstrap";
//Global components
import Badge from "../../../components/Badge";
import Flex from "../../../components/Flex";
import Button from "../../../components/Button";
//Services
import { updateSquadById } from "../../../services/squadServices";
import {
  deleteMarineById,
  updateBillet
} from "../../../services/marineServices";
//Context
import { SquadPageContext } from "../SquadPage";

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
  height: 2.8rem;
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
  border-radius: 0.1rem;
  background: #aebd38;
  color: #000;
  display: flex;
  font-weight: 300;
  height: 2.8rem;
  border-radius: 5px;
  min-width: 2.5em;
  padding: 1em 1em;
  position: relative;
  transition: 0.2s ease;
  width: 100%;
`;

const StyledIcon = styled.h1`
  color: #05668d;
`;

const grid = 4;

const billet = {
  squadLeader: "SL",
  assistantSquadLeader: "A/",
  teamLeader: "TL",
  designatedMarksman: "DM",
  radioOperator: "RO",
  grenadier: "G",
  autoRifleman: "AR",
  rifleman: "R"
};

function SquadDND({ id }) {
  const dataProvider = React.useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const setMarineData = dataProvider.setMarineData;

  const squadData = dataProvider.squadData;
  const setSquadData = dataProvider.setSquadData;
  console.log(squadData);

  console.log(marineData);
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
    height: "4rem",
    overflow: "auto",
    width: "100%",
    border: isDraggingOver ? "4px dashed #AEBD38" : "4px dashed #ddd"
  });

  const onDragEnd = useCallback(
    result => {
      const _getList = id => {
        if (id === "teamOne") {
          return squadData.teams.teamOne;
        }
        if (id === "teamTwo") {
          return squadData.teams.teamTwo;
        }
        if (id === "teamThree") {
          return squadData.teams.teamThree;
        }
        if (id === "teamHq") {
          return squadData.teams.teamHq;
        } else {
          return null;
        }
      };
      //TODO -  switch case
      const _getBillet = (teamType, index) => {
        if (teamType === "teamHq") {
          if (index === 0) {
            return billet.squadLeader;
          }
          if (index === 1) {
            return billet.assistantSquadLeader;
          }
          if (index === 2) {
            return billet.radioOperator;
          }
          if (index === 3) {
            return billet.designatedMarksman;
          }
        } else if (teamType !== "teamHq") {
          if (index === 0) {
            return billet.teamLeader;
          }
          if (index === 1) {
            return billet.autoRifleman;
          }
          if (index === 2) {
            return billet.grenadier;
          }
          if (index === 3) {
            return billet.rifleman;
          }
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

        updateBillet(result.draggableId, {
          billet: _getBillet(destination.droppableId, destination.index)
        });

        setSquadData(prevState => {
          return {
            ...prevState,
            [source.droppableId]: reorderedItems
          };
        });
        setRoute(true);
      } else {
        const updatedTeams = _move(
          _getList(source.droppableId),
          _getList(destination.droppableId),
          source,
          destination
        );

        updateBillet(result.draggableId, {
          billet: _getBillet(destination.droppableId, destination.index)
        });

        setSquadData(prevState => {
          return {
            ...prevState,
            teams: {
              teamOne: squadData.teams.teamOne,
              teamTwo: squadData.teams.teamTwo,
              teamThree: squadData.teams.teamThree,
              teamHq: squadData.teams.teamHq,
              ...updatedTeams
            }
          };
        });
        setRoute(true);
      }
    },
    [
      squadData.teams.teamHq,
      squadData.teams.teamOne,
      squadData.teams.teamTwo,
      squadData.teams.teamThree
    ]
  );

  const [route, setRoute] = useState(false);

  useEffect(() => {
    if (route === true) {
      updateSquadById(id, squadData);
    }
  }, [onDragEnd, squadData, route, id]);

  const [removeStyle, setRemoveStyle] = useState(false);
  const handleRemoveStyle = () => setRemoveStyle(!removeStyle);
  const [toastVisible, setToastVisible] = useState(false);
  const onDismiss = () => setToastVisible(false);

  const removeMarine = evt => {
    evt.persist();
    const idToDelete = evt.target.id;
    deleteMarineById(idToDelete, id).then(res => {
      setToastVisible(true);
      setSquadData(prevState => {
        return {
          ...prevState,
          teams: {
            teamOne: squadData.teams.teamOne.filter(
              marine => marine._id !== idToDelete
            ),
            teamTwo: squadData.teams.teamTwo.filter(
              marine => marine._id !== idToDelete
            ),
            teamThree: squadData.teams.teamThree.filter(
              marine => marine._id !== idToDelete
            ),
            teamHq: squadData.teams.teamHq.filter(
              marine => marine._id !== idToDelete
            )
          }
        };
      });
      setMarineData(marineData.filter(marine => marine._id !== idToDelete));
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Alert success isOpen={toastVisible} toggle={onDismiss}>
        Marine Successfully Deleted
      </Alert>
      <Flex justifyAround>
        {/* <StyledIcon>
          <i className="material-icons" onClick={handleRemoveStyle}>
            {removeStyle ? "delete_forever" : "delete"}
          </i>
        </StyledIcon> */}

        {/* <StyledIcon>
          <i className="material-icons">save_alt</i>
        </StyledIcon> */}
        <Button onClick={handleRemoveStyle}>Remove</Button>
        <Button>Save</Button>
      </Flex>
      {squadData && (
        <Flex>
          <Badge color="none">HQ ({squadData.teams.teamHq.length})</Badge>
          <Droppable droppableId="teamHq" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getUnplacedListStyle(snapshot.isDraggingOver)}
              >
                {squadData.teams.teamHq.map((item, index) => (
                  <Draggable
                    key={item.last}
                    draggableId={item._id}
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
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
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

          <Badge color="none">
            Team One ({squadData.teams.teamOne.length})
          </Badge>
          <Droppable droppableId="teamOne" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getUnplacedListStyle(snapshot.isDraggingOver)}
              >
                {squadData.teams.teamOne.map((item, index) => (
                  <Draggable
                    key={item.last}
                    draggableId={item._id}
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
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
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

          <Badge color="none">
            Team Two (
            {squadData.teams.teamTwo && squadData.teams.teamTwo.length})
          </Badge>
          <Droppable droppableId="teamTwo" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getUnplacedListStyle(snapshot.isDraggingOver)}
              >
                {squadData.teams.teamTwo.map((item, index) => (
                  <Draggable
                    key={item.last}
                    draggableId={item._id}
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
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
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

          <Badge color="none">
            Team Three ({squadData.teams.teamThree.length})
          </Badge>
          <Droppable droppableId="teamThree" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getUnplacedListStyle(snapshot.isDraggingOver)}
              >
                {squadData.teams.teamThree.map((item, index) => (
                  <Draggable
                    key={item.last}
                    draggableId={item._id}
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
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
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
      )}
    </DragDropContext>
  );
}

export default SquadDND;
