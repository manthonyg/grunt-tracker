import React, { useState, useEffect, useRef } from "react";
//Local components
import SquadCarousel from "./components/SquadCarousel";
import SquadDND from "./components/SquadDND";
import SquadGenerateZaps from "./components/SquadGenerateZaps";
import SquadTable from "./components/SquadTable";
import SquadAccountability from "./components/SquadAccountability";
import SquadAppointments from "./components/SquadAppointments";
import AddNewMarine from "./components/AddNewMarine";
import AddExistingMarine from "./components/AddExistingMarine";
import SideNav from "../../components/Nav/SideNav";
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
      <SquadPageContext.Provider value={providerValue}>
        <SideNav
          onClick={handleSetMenu}
          navLinks={[
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
          ]}
          open={menuOpen}
          handleView={handleSetCurrentView}
        />

        {marineData && !!marineData.length && <SquadCarousel />}

        {/* local components */}
        {currentView === "addMarine" && <AddNewMarine id={squadData._id} />}
        {currentView === "addExistingMarine" && (
          <AddExistingMarine id={squadData._id} />
        )}
        {currentView === "accountability" && (
          <SquadAccountability id={squadData._id} />
        )}
        {currentView === "appointments" && <SquadAppointments />}
        {/* table components */}
        {currentView === "viewAll" && <SquadTable id={squadData._id} />}
        {currentView === "weapons" && <SquadTable id={squadData._id} />}
        {currentView === "gear" && <SquadTable id={squadData._id} />}
        {currentView === "body" && <SquadTable id={squadData._id} />}
        {currentView === "discrepancies" && <SquadTable id={squadData._id} />}
        {/* menu features/generators */}
        {currentView === "dragAndDrop" && <SquadDND id={squadData._id} />}
        {currentView === "generateZaps" && (
          <SquadGenerateZaps id={squadData._id} />
        )}
      </SquadPageContext.Provider>
    </>
  );
}

export default SquadPage;
