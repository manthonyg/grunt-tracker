import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
//Packages
import Moment from "react-moment";
import "moment-timezone";
//Local components
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
//Global components
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
//Services
import { getMarineById } from "../../services/marineServices";

export const MarinePageContext = React.createContext();

function MarinePage(props) {
  const componentIsMounted = useRef(true);

  const location = useLocation();

  const [marineData, setMarineData] = useState([]);

  useEffect(() => {
    if (componentIsMounted.current) {
      getMarineById(props.match.params.id)
        .then(res => setMarineData(res))
        .catch(err => console.log("Error in MarinePage: ", err));
    }
    return () => {
      componentIsMounted.current = false;
    };
  }, [location, props.match.params.id]);

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
      <MarinePageContext.Provider value={providerValue}>
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
      </MarinePageContext.Provider>
    </>
  );
}

export default MarinePage;
