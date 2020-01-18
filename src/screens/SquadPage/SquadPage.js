import React, { useState, useEffect, useRef, useContext } from "react";
import { Container } from "reactstrap";
//Local components
import SquadCarousel from "./components/SquadCarousel";
import SquadDND from "./components/SquadDND";
import CreateMarine from "../MarinePage/components/CreateMarine";
import SquadTable from "./components/SquadTable";
//Global components
import Button from "../../components/Button";
import Flex from "../../components/Flex";
//Services
import {
  getAllMarinesInSquad,
  getSquadById
} from "../../services/squadServices";

export const SquadPageContext = React.createContext();

function SquadPage(props) {
  const componentIsMounted = useRef(true);

  const [marineData, setMarineData] = useState([]);
  const [squadData, setSquadData] = useState([]);
  const [currentView, setCurrentView] = useState("viewAll");
  const [stateIsUpdated, setStateIsUpdated] = useState(true)

  const providerValue = React.useMemo(() => ({
    marineData, setMarineData,
    squadData, setSquadData,
    currentView, setCurrentView,
    stateIsUpdated, setStateIsUpdated
}), [marineData, squadData, currentView, stateIsUpdated]);
console.log(stateIsUpdated)
  

  const handleSetCurrentView = evt => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id);
      }}

  useEffect(() => {

    getSquadById(props.match.params.id).then(res => {
      if (componentIsMounted.current) {
        setSquadData(res);
      }
    })
    .catch(err => (console.log('Error in getSquadById: ', err)));

    getAllMarinesInSquad(props.match.params.id).then(res => {
      if (componentIsMounted.current) {
        setMarineData(res);
      }
    })
    .catch(err => (console.log('Error in getAllMarinesInSquad: ', err)));

    return () => {
      componentIsMounted.current = false;
      console.log('cleaned up in squad page')
    };
  }, [props.match.params.id, currentView, stateIsUpdated]);


  return (
    <>
      <SquadPageContext.Provider value={providerValue}>
        
        <SquadCarousel
          handleSetCurrentView={handleSetCurrentView}
          squadData={squadData}
          marineData={marineData}
        />

        <Container>
          <Flex justifyBetween>
            <Button id="addMarine" onClick={handleSetCurrentView}>
              Add Member
            </Button>
            <Button id="viewAll" onClick={handleSetCurrentView}>
              View All
            </Button>
            <Button id="dragAndDrop" onClick={handleSetCurrentView}>
              Change T/O
            </Button>
          </Flex>
        </Container>

        {currentView === "addMarine" && 
        <CreateMarine id={squadData._id} />}
        {currentView === "viewAll" &&
        <SquadTable id={squadData._id} />}
        {currentView === "dragAndDrop" &&
        <SquadDND id={squadData._id}/>
}
      </SquadPageContext.Provider>
    </>
  );
}

export default SquadPage;
