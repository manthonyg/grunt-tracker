import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
//Packages
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
//Local components
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
import EditMarineEDL from "./components/EditMarineEDL";
import ViewMarineEDL from "./components/ViewMarineEDL";
import ViewMarineBody from "./components/ViewMarineBody";
import ViewMarineAppointments from "./components/ViewMarineAppointments";
//Global components
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import Banner from "../../components/Banner";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import SideNav from "../../components/Nav/SideNav";
//Services
import { getMarineById } from "../../services/marineServices";
//Media
import Unaccounted from "../../images/plus.svg";
import Accounted from "../../images/check-solid.svg";
//Constants
import { calendarStrings } from "../../constants/calendarStrings";

export const MarinePageContext = React.createContext();

const FlexBox = styled.div`
  display: flex;
  height: 84.5vh;
  justify-content: space-around;
  flex-flow: column nowrap;
  align-items: stretch;
  box-sizing: border-box;
  overflow: scroll;
`;

const FlexItem = styled.div`
  justify-content: center;
  padding: .25rem;
  overflow: auto;
  background-color: #68829e;
  color: #000;
  border-bottom: 4px solid #fff;
  filter: ${props => {
    if (props.selected) return ``;
    return `opacity(40%);`;
  }}
  box-sizing: border-box;
  flex-grow: ${props => {
    if (props.selected) return "300";
    return "1";
  }};
  &:nth-child(2n) {
    background-color: #68829e;
  }
`;

function MarinePage(props) {
  const componentIsMounted = useRef(true);
  //Allows the back button to work properly
  const location = useLocation();

  const [marineData, setMarineData] = useState([]);

  /*TODO
  make a function that returns the array from the obj (DRY) */

  const [selectedCategory, setSelectedCategory] = useState({
    weapons: false,
    gear: false,
    body: false,
    appointments: false,
    accountability: true
  });

  const [categoryAction, setCategoryAction] = useState({
    weapons: {
      view: true,
      edit: false
    },
    body: {
      view: true,
      add: false
    },
    appointments: {
      view: true,
      add: false
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("viewAll");

  const handleSetCurrentView = evt => {
    if (!!evt.target.id) {
      setCurrentView(evt.target.id);
      setMenuOpen(!menuOpen);
    }
  };

  const handleSetMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSelectedCategory = evt => {
    const id = evt.currentTarget.id;
    setSelectedCategory({
      weapons: false,
      gear: false,
      body: false,
      appointments: false,
      accountability: false,
      [id]: !selectedCategory.id
    });
  };

  const handleCategoryAction = evt => {
    const id = evt.currentTarget.id;
    const category = evt.currentTarget.name;
    setCategoryAction({
      weapons: {
        view: true,
        edit: false
      },
      body: {
        view: true,
        edit: false
      },
      appointments: {
        view: true,
        add: false
      },
      [category]: {
        [id]: !selectedCategory[category].id
      }
    });
  };

  useEffect(() => {
    if (componentIsMounted.current) {
      getMarineById(props.match.params.id)
        .then(res => setMarineData(res))
        .catch(err => console.log("Error in MarinePage: ", err));
    }
    return () => {
      componentIsMounted.current = false;
    };
  }, [location, props.match.params.id, selectedCategory]);

  const providerValue = React.useMemo(
    () => ({
      marineData,
      setMarineData
    }),
    [marineData, setMarineData]
  );

  return (
    <>
      <SideNav
        onClick={handleSetMenu}
        navLinks={[
          {
            title: "Create Counseling",
            view: "createCounseling"
          },
          {
            title: "Do Good List",
            view: "doGoodList"
          },
          {
            title: "TAD/Leave",
            view: "tadLeave"
          }
        ]}
        open={menuOpen}
        handleView={handleSetCurrentView}
      ></SideNav>
      <MarinePageContext.Provider value={providerValue}>
        <Banner secondary>
          {marineData && marineData.last ? (
            `${marineData.rank} ${marineData.last}`
          ) : (
            <Loader />
          )}
        </Banner>
        <FlexBox>
          <FlexItem
            id={"accountability"}
            selected={selectedCategory.accountability}
            onClick={handleSelectedCategory}
          >
            <Banner white>Accountability</Banner>
            {selectedCategory.accountability && (
              <Banner small white>
                <br />

                {marineData.accountability && selectedCategory.accountability && (
                  <>
                    <strong>
                      {marineData.accountability.accountedFor ? (
                        <>
                          <Flex justifyCenter alignCenter>
                            Accounted for
                          </Flex>
                          <Flex justifyCenter alignCenter>
                            <img
                              style={{
                                width: "5rem"
                              }}
                              src={Accounted}
                            ></img>
                          </Flex>
                        </>
                      ) : (
                        <>
                          <Flex justifyCenter alignCenter>
                            Unaccounted for
                          </Flex>
                          <Flex justifyCenter alignCenter>
                            <img
                              style={{
                                width: "5rem",
                                transform: "rotate(45deg)"
                              }}
                              src={Unaccounted}
                            ></img>
                          </Flex>
                        </>
                      )}

                      <Moment calendar={calendarStrings}>
                        {marineData.accountability.date}
                      </Moment>
                    </strong>
                  </>
                )}
              </Banner>
            )}
          </FlexItem>

          <FlexItem
            id={"weapons"}
            selected={selectedCategory.weapons}
            onClick={handleSelectedCategory}
          >
            <Banner white>EDL</Banner>
            {selectedCategory.weapons && (
              <>
                <Flex justifyAround alignCenter>
                  <Button
                    small
                    name="weapons"
                    id="edit"
                    onClick={handleCategoryAction}
                  >
                    Edit
                  </Button>
                  <Button
                    small
                    name="weapons"
                    id="view"
                    onClick={handleCategoryAction}
                  >
                    View
                  </Button>
                </Flex>

                {!!categoryAction.weapons.edit && <EditMarineEDL />}
                {!!categoryAction.weapons.view && <ViewMarineEDL />}
              </>
            )}
          </FlexItem>
          <FlexItem
            id={"gear"}
            selected={selectedCategory.gear}
            onClick={handleSelectedCategory}
          >
            <Banner white>Gear</Banner>
            {selectedCategory.gear && (
              <>
                <Flex justifyAround alignCenter>
                  <Button small id="edit" onClick={handleCategoryAction}>
                    Edit
                  </Button>
                  <Button small id="view" onClick={handleCategoryAction}>
                    View
                  </Button>
                </Flex>

                {!!categoryAction.weapons.edit && <EditMarineEDL />}
                {!!categoryAction.weapons.view && <ViewMarineEDL />}
              </>
            )}
          </FlexItem>
          <FlexItem
            id={"body"}
            selected={selectedCategory.body}
            onClick={handleSelectedCategory}
          >
            <Banner white>Body</Banner>
            {selectedCategory.body && (
              <>
                <Flex justifyAround>
                  <Button
                    small
                    name="body"
                    id="view"
                    onClick={handleCategoryAction}
                  >
                    View
                  </Button>
                  <Button
                    small
                    name="body"
                    id="add"
                    onClick={handleCategoryAction}
                  >
                    Add
                  </Button>
                </Flex>

                {!!categoryAction.body.add && (
                  <>
                    <CreatePFT />
                    <CreateCFT />
                  </>
                )}
                {!!categoryAction.body.view && <ViewMarineBody />}
              </>
            )}
          </FlexItem>
          <FlexItem
            id={"appointments"}
            selected={selectedCategory.appointments}
            onClick={handleSelectedCategory}
          >
            <Banner white>Appointments</Banner>
            {selectedCategory.appointments && (
              <>
                <Flex justifyBetween>
                  <Button
                    small
                    name="appointments"
                    id="add"
                    onClick={handleCategoryAction}
                  >
                    Add
                  </Button>
                  <Button
                    small
                    name="appointments"
                    id="view"
                    onClick={handleCategoryAction}
                  >
                    View All
                  </Button>
                </Flex>

                {!!categoryAction.appointments.view && (
                  <ViewMarineAppointments />
                )}

                {!!categoryAction.appointments.add && <CreateAppointment />}
              </>
            )}
          </FlexItem>
        </FlexBox>
      </MarinePageContext.Provider>
    </>
  );
}

export default MarinePage;
