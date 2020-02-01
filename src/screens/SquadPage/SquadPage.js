import React, { useState, useEffect, useRef } from "react";
//Local components
import SquadCarousel from "./components/SquadCarousel";
import SquadDND from "./components/SquadDND";
import CreateMarine from "../MarinePage/components/CreateMarine";
import SquadTable from "./components/SquadTable";
import SideNav from "../../components/SideNav";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSetMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    {
      title: "Generate Zaps",
      view: "generateZaps"
    },
    {
      title: "Do this",
      view: "doThis"
    },
    {
      title: "Task Organization",
      view: "dragAndDrop"
    },
    {
      title: "Add",
      view: "addMarine"
    },
    {
      title: "Accountability",
      view: "viewAll"
    }
  ];

  const providerValue = React.useMemo(
    () => ({
      marineData,
      setMarineData,
      squadData,
      setSquadData,
      currentView,
      setCurrentView
    }),
    [
      marineData,
      setSquadData,
      setMarineData,
      squadData,
      setCurrentView,
      currentView
    ]
  );

  const handleSetCurrentView = evt => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id);
      setMenuOpen(!menuOpen);
    }
  };

  useEffect(() => {
    getSquadById(props.match.params.id)
      .then(res => {
        setSquadData(res);
      })
      .catch(err => console.log("Error in getSquadById: ", err));

    getAllMarinesInSquad(props.match.params.id)
      .then(res => {
        setMarineData(res);
      })
      .catch(err => console.log("Error in getAllMarinesInSquad: ", err));
    return () => {
      componentIsMounted.current = false;
    };
  }, [props.match.params.id, currentView]);
  return (
    <>
      <SideNav
        onClick={handleSetMenu}
        navLinks={navLinks}
        open={menuOpen}
        handleView={handleSetCurrentView}
      ></SideNav>
      <SquadPageContext.Provider value={providerValue}>
        <SquadCarousel
          handleSetCurrentView={handleSetCurrentView}
          squadData={squadData}
          marineData={marineData}
        />
        {/* 
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
        </Flex> */}

        {currentView === "addMarine" && <CreateMarine id={squadData._id} />}
        {currentView === "viewAll" && <SquadTable id={squadData._id} />}
        {currentView === "dragAndDrop" && <SquadDND id={squadData._id} />}
      </SquadPageContext.Provider>
    </>
  );
}

export default SquadPage;
