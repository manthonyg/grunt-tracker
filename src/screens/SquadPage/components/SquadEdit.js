import React, { useState, useEffect, useCallback } from "react";
//Packages
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled, { keyframes, css } from "styled-components";
import { Alert } from "reactstrap";
//Global components
import Badge from "../../../components/Badge";
import Flex from "../../../components/Flex";
import Banner from "../../../components/Banner";
//Services
import { updateSquadById } from "../../../services/squadServices";
import {
  deleteMarineById,
  updateBillet
} from "../../../services/marineServices";
//Context
import { SquadPageContext } from "../SquadPage";
//Media
import Plus from "../../../images/plus.svg";

const pulsate = keyframes`
  {
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
    50% {
      -webkit-transform: scale(0.9);
              transform: scale(0.9);
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
  }
  `;

const wobbleEffect = css`
  animation: ${pulsate} 0.8s infinite;
`;

const BadgeOuter = styled.div`
  align-items: center;
  background-color: ${props => {
    if (props.remove) return "red";
    return "#fff";
  }}
	border: ${props => {
    if (props.remove) return "none";
    return "2px solid #aebd38";
  }}
	border-radius: 99em;
	color: ${props => {
    if (props.remove) return "#fff";
    return "#000";
  }}
  display: flex;
	font-size: 0.77em;
	font-weight: 700;
	height: 2.5em;
	justify-content: center;
	line-height: 1;
	min-width: 2.5em;
	position: absolute;
  right: -15px;
  top: -6px;
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
    if (props.remove) return `$wobble 2s infinite`;
    return "none";
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
  margin-left: 10px;
  height: 2.5rem;
  line-height: 1;
  margin: 0em 0.75em;
  padding: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
`;

const ButtonInner = styled.span`
  padding: 4px 12px;
  border-radius: 5px;
  font-size: 14px;
  text-transform: uppercase;
  front-weight: 800;
  position: relative;
  border: 0;
  padding: 15px 25px;
  display: inline-block;
  text-align: center;
  color: white;
  background: #aebd38;
`;

const StyledAlert = styled(Alert)`
  background-color: ${props => {
    if (props.success) return "#aebd38 !important";
    return "#505160 !important";
  }};
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

function SquadEdit({ id }) {
  const dataProvider = React.useContext(SquadPageContext);

  const marineData = dataProvider.marineData;
  const setMarineData = dataProvider.setMarineData;

  const squadData = dataProvider.squadData;
  const setSquadData = dataProvider.setSquadData;

  const getUnplacedListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#fff" : "#fff",
    display: "flex",
    alignItems: "center",
    padding: grid,
    height: "4.2rem",
    overflow: "auto",
    width: "100%",
    border: isDraggingOver ? "6px dashed #AEBD38" : "6px dashed #ddd",
    borderRadius: "10px",
    margin: "0px 5px"
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
  const toggleRemoveStyle = () => setRemoveStyle(!removeStyle);
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
      <Banner small green>
        Drag Marines to change T/O
      </Banner>
      <Flex justifyAround>
        <i className="material-icons" onClick={toggleRemoveStyle}>
          {removeStyle ? "delete_forever" : "delete"}
        </i>

        <i className="material-icons">save_alt</i>
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
                      >
                        <ButtonInner>{item.last}</ButtonInner>
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
                          <BadgeInner></BadgeInner>
                          {!!removeStyle ? (
                            <img
                              src={Plus}
                              style={{
                                width: "1rem",
                                transform: "rotate(45deg)",
                                fill: "#fff"
                              }}
                              id={item._id}
                            ></img>
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
                      >
                        <ButtonInner>{item.last}</ButtonInner>
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
                          <BadgeInner {...index}></BadgeInner>
                          {!!removeStyle ? (
                            <img
                              src={Plus}
                              style={{
                                width: "1rem",
                                transform: "rotate(45deg)",
                                fill: "#fff"
                              }}
                              id={item._id}
                            ></img>
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
                      >
                        <ButtonInner>{item.last}</ButtonInner>
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
                          <BadgeInner {...index}></BadgeInner>
                          {!!removeStyle ? (
                            <img
                              src={Plus}
                              style={{
                                width: "1rem",
                                transform: "rotate(45deg)",
                                fill: "#fff"
                              }}
                              id={item._id}
                            ></img>
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
                      >
                        <ButtonInner>{item.last}</ButtonInner>
                        <BadgeOuter remove={removeStyle} onClick={removeMarine}>
                          <BadgeInner {...index}></BadgeInner>
                          {!!removeStyle ? (
                            <img
                              src={Plus}
                              style={{
                                width: "1rem",
                                transform: "rotate(45deg)",
                                fill: "#fff"
                              }}
                              id={item._id}
                            ></img>
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
      <StyledAlert success isOpen={toastVisible} toggle={onDismiss}>
        Marine Successfully Deleted
      </StyledAlert>
    </DragDropContext>
  );
}

export default SquadEdit;
