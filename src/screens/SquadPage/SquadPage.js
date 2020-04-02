import React, { useState, useEffect, useRef } from "react";
//Global components
import Banner from "../../components/Banner";
//Local components
import SquadCarousel from "./components/SquadCarousel";
import SquadEdit from "./components/SquadEdit";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const showCurrentView = evt => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id);
      setIsMenuOpen(!isMenuOpen);
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
          onClick={toggleMenuOpen}
          navLinks={[
            {
              title: "Morning Report",
              view: "generate-zaps"
            },
            {
              title: "Kill Cards",
              view: "generate-zaps"
            },
            {
              title: "Edit Squad",
              view: "edit-squad"
            }
          ]}
          open={isMenuOpen}
          handleView={showCurrentView}
        />
        <Banner header>{squadData.callsign}overview</Banner>
        {marineData && !!marineData.length && <SquadCarousel />}

        {/* local components */}
        {currentView === "add-new-marine" && (
          <AddNewMarine id={squadData._id} />
        )}
        {currentView === "add-existing-marine" && (
          <AddExistingMarine id={squadData._id} />
        )}
        {currentView === "accountability" && (
          <SquadAccountability id={squadData._id} />
        )}
        {currentView === "appointments" && <SquadAppointments />}
        {/* table components */}
        {currentView === "view-all" && <SquadTable id={squadData._id} />}
        {currentView === "weapons" && <SquadTable id={squadData._id} />}
        {currentView === "gear" && <SquadTable id={squadData._id} />}
        {currentView === "body" && <SquadTable id={squadData._id} />}
        {currentView === "discrepancies" && <SquadTable id={squadData._id} />}
        {/* menu features/generators */}
        {currentView === "edit-squad" && <SquadEdit id={squadData._id} />}
        {currentView === "generate-zaps" && (
          <SquadGenerateZaps id={squadData._id} />
        )}
      </SquadPageContext.Provider>
    </>
  );
}

export default SquadPage;
