import React, { useState, useEffect, useRef } from "react";
//Local components
import SquadCarousel from "./components/SquadCarousel";
import SquadDND from "./components/SquadDND";
import SquadGenerateZaps from "./components/SquadGenerateZaps";
import SquadTable from "./components/SquadTable";
import SquadAccountability from "./components/SquadAccountability";
import SquadAppointments from "./components/SquadAppointments";
import CreateMarine from "../MarinePage/components/CreateMarine";
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
  const [currentView, setCurrentView] = useState("accountability");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSetMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    {
      title: "Morning Report",
      view: "generateZaps"
    },
    {
      title: "Kill Cards",
      view: "generateZaps"
    },
    {
      title: "Edit Squad",
      view: "dragAndDrop"
    },
    {
      title: "Add",
      view: "addMarine"
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
        <SquadCarousel />

        {/* local components */}
        {currentView === "addMarine" && <CreateMarine id={squadData._id} />}
        {currentView === "accountability" && (
          <SquadAccountability id={squadData._id} />
        )}
        {currentView === "appointments" && <SquadAppointments />}
        {/* table components */}
        {currentView === "weapons" && <SquadTable id={squadData._id} />}
        {currentView === "gear" && <SquadTable id={squadData._id} />}
        {currentView === "body" && <SquadTable id={squadData._id} />}
        {currentView === "discrepancies" && <SquadTable id={squadData._id} />}
        {/* menu features/generators */}
        {currentView === "viewAll" && <SquadTable id={squadData._id} />}
        {currentView === "dragAndDrop" && <SquadDND id={squadData._id} />}
        {currentView === "generateZaps" && (
          <SquadGenerateZaps id={squadData._id} />
        )}
      </SquadPageContext.Provider>
    </>
  );
}

export default SquadPage;
