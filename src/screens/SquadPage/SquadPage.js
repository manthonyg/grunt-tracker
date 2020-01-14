import React, { useState, useEffect, useRef } from "react";
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

function SquadPage(props) {

  
  const componentIsMounted = useRef(true);

  const [squadData, setSquadData] = useState([]);
  const [marineData, setMarineData] = useState([]);

  const [currentView, setCurrentView] = useState("viewAll");
  const handleSetCurrentView = evt => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id);
    }
  };

  useEffect(() => {
    getSquadById(props.match.params.id).then(res => {
      if (componentIsMounted.current) {
        setSquadData(res);
      }
    });
    return () => {
      componentIsMounted.current = false;
    };
  }, [props.match.params.id, currentView]);

  useEffect(() => {
    getAllMarinesInSquad(props.match.params.id).then(res => {
      setMarineData(res);
    });
  }, [props.match.params.id, squadData, currentView]);
  console.table("marine data is now", marineData);

  const [toggleRemove, setToggleRemove] = useState(false);
  const handleSetToggleRemove = () => {
    setToggleRemove(!toggleRemove);
  };

  return (
    <>

{!!squadData && (
        <SquadCarousel callsign={squadData.callsign} 
                        data={marineData} 
                        handleSetCurrentView={handleSetCurrentView}
                        />
      )}
      
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
      {currentView === "viewAll" && (
      <SquadTable id={squadData._id} marines={marineData} />)}
      {currentView === "dragAndDrop" && 
      <SquadDND id={squadData._id} />}
      
      
    </>
  );
}

export default SquadPage;
