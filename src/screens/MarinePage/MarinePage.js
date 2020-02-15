import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
//Packages
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";
//Local components
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
//Global components
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Pill from "../../components/Pill";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import SideNav from "../../components/SideNav";
//Services
import { getMarineById } from "../../services/marineServices";
//Media
import Unaccounted from "../../images/warning.svg";
import Accounted from "../../images/check.svg";

export const MarinePageContext = React.createContext();

const FlexBox = styled.div`
  display: flex;
  height: 86.5vh;
  justify-content: space-around;
  flex-flow: column nowrap;
  align-items: stretch;
  box-sizing: border-box;
  transition: 3000ms;
  overflow: scroll;
`;

const FlexItem = styled.div`
  transition: all 150ms;
  padding: 1rem;
  justify-content: center;
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
    if (props.selected) return "200";
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

  // const testEdl =
  //   marineData &&
  //   !!marineData.primary &&
  //   Object.getOwnPropertyNames(marineData.primary);

  const primaryEdl =
    marineData &&
    !!marineData.primary &&
    Object.entries(marineData.primary)
      .filter(object => !!object[1])
      .map(object => object[0]);

  console.log(primaryEdl);
  const opticsEdl =
    marineData &&
    !!marineData.optics &&
    Object.entries(marineData.optics)
      .filter(object => !!object[1])
      .map(object => object[0]);

  const supplementaryEdl =
    marineData &&
    !!marineData.supplementary &&
    Object.entries(marineData.supplementary)
      .filter(object => !!object[1])
      .map(object => object[0]);

  const [selectedCategory, setSelectedCategory] = useState({
    weapons: false,
    gear: false,
    body: false,
    appointments: false,
    accountability: true
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState("viewAll");

  const navLinks = [
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
  ];

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

  const calendarStrings = {
    lastDay: "[Yesterday at] HHmm",
    sameDay: "[Today at] HHmm",
    nextDay: "[Tomorrow at] HHmm",
    lastWeek: "[last] dddd [at] HHmm",
    nextWeek: "dddd [at] HHmm",
    sameElse: "HHmm"
  };

  return (
    <>
      <SideNav
        onClick={handleSetMenu}
        navLinks={navLinks}
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
            <Banner white>
              Accountability
              {marineData.accountability && (
                <>
                  {marineData.accountability.accountedFor ? (
                    <>
                      {/* <img style={{ width: "2rem" }} src={Accounted}></img> */}
                    </>
                  ) : (
                    <>
                      {/* <img style={{ width: "2rem" }} src={Unaccounted}></img> */}
                    </>
                  )}
                </>
              )}
            </Banner>

            <Card selected={selectedCategory.accountability}>
              <Banner small header>
                <br />

                {marineData.accountability && (
                  <>
                    <strong>
                      {marineData.accountability.accountedFor ? (
                        <>
                          Accounted for
                          <img
                            style={{ width: "1.5rem" }}
                            src={Accounted}
                          ></img>
                          <br />
                        </>
                      ) : (
                        <>
                          Unaccounted for <br />
                          <img
                            style={{ width: "1rem" }}
                            src={Unaccounted}
                          ></img>
                          <br />
                        </>
                      )}

                      <Moment calendar={calendarStrings}>
                        {marineData.accountability.date}
                      </Moment>
                    </strong>
                  </>
                )}
              </Banner>
            </Card>
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
                  <Button id="add-appointment">Add</Button>
                </Flex>

                <Banner small white>
                  Primary
                </Banner>
                <Flex justifyAround alignCenter>
                  {primaryEdl.map(item => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </Flex>
                <hr />
                <Banner small white>
                  Optics
                </Banner>
                <Flex justifyAround alignCenter>
                  {opticsEdl.map(item => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </Flex>
                <hr />
                <Banner small white>
                  Supplementary
                </Banner>
                <Flex justifyAround alignCenter>
                  {supplementaryEdl.map(item => (
                    <Pill key={item}>{item}</Pill>
                  ))}
                </Flex>
              </>
            )}
          </FlexItem>
          <FlexItem
            id={"gear"}
            selected={selectedCategory.gear}
            onClick={handleSelectedCategory}
          >
            <Banner white>Gear</Banner>
          </FlexItem>
          <FlexItem
            id={"body"}
            selected={selectedCategory.body}
            onClick={handleSelectedCategory}
          >
            <Banner white>Body</Banner>
            {selectedCategory.body && (
              <Flex justifyBetween>
                <Button inverted id="add-appointment">
                  Create
                </Button>
                <Button inverted id="view-all">
                  View All
                </Button>
                <CreatePFT />
                <CreateCFT />
              </Flex>
            )}
          </FlexItem>
          <FlexItem
            id={"appointments"}
            selected={selectedCategory.appointments}
            onClick={handleSelectedCategory}
          >
            <Banner white>Appointments</Banner>
            {selectedCategory.appointments && (
              <Flex justifyBetween>
                <Button inverted id="add-appointment">
                  Create
                </Button>
                <Button inverted id="view-all">
                  View All
                </Button>
                <CreateAppointment />
              </Flex>
            )}
          </FlexItem>
        </FlexBox>
      </MarinePageContext.Provider>
      {/* <MarinePageContext.Provider value={providerValue}>
        <Banner secondary>
          {marineData.rank} {marineData.last}
        </Banner>
        <Flex justifyAround>
          <Card primary noAnimation>
            <Banner secondary>Accountability</Banner>
            <Banner small header>
              <br />

              {marineData.accountability && (
                <>
                  <strong>
                    {marineData.accountability.accountedFor ? (
                      <>
                        <Icon success>check_circle_outline</Icon> accounted
                      </>
                    ) : (
                      <>
                        <Icon danger>help_outline</Icon> unaccounted
                      </>
                    )}
                    <br />
                    <br />
                    since{" "}
                    <Moment calendar={calendarStrings}>
                      {marineData.accountability.date}
                    </Moment>
                  </strong>
                </>
              )}
            </Banner>
          </Card>
          <Card primary noAnimation>
            <Banner secondary>Weapons</Banner>
          </Card>
          <Card primary noAnimation>
            <Banner secondary>Gear</Banner>
          </Card>
          <Card primary noAnimation>
            <Banner secondary>Body</Banner>
            <CreatePFT />
            <CreateCFT />
          </Card>
          <Card primary noAnimation>
            <Banner secondary>Appointments</Banner>
            <CreateAppointment />
          </Card>
        </Flex>
      </MarinePageContext.Provider> */}
    </>
  );
}

export default MarinePage;
