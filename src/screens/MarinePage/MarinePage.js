import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//Packages
import Moment from "react-moment";
import "moment-timezone";
//Local
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
//Global
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Icon from "../../components/Icon";

function MarinePage(props) {
  const calendarStrings = {
    lastDay: "[Yesterday at] LT",
    sameDay: "[Today at] HHmm",
    nextDay: "[Tomorrow at] LT",
    lastWeek: "[last] dddd [at] LT",
    nextWeek: "dddd [at] LT",
    sameElse: "L"
  };

  const componentIsMounted = useRef(true);
  const [marineData, setMarineData] = useState([]);
  const location = useLocation();
  console.log(marineData);
  useEffect(() => {
    if (componentIsMounted.current) {
      axios
        .get(`http://localhost:8082/api/marines/${props.match.params.id}`)
        .then(res => setMarineData(res.data))
        .catch(err => {
          console.log(err);
          console.log("Error in ShowMarineDetails.js on useEffect");
        });
    }
    return () => {
      componentIsMounted.current = false;
    };
  }, [location, props.match.params.id]);
  console.log(marineData);
  return (
    <>
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
                  {marineData.accountability.accountedFor
                    ? <><Icon success>check_circle_outline</Icon> accounted</>
                    : <><i className="material-icons">help_outline</i> unaccounted</>}
                    <br/>
                
                <br />
                since 
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
          <CreateAppointment/>
        </Card>
      </Flex>
    </>
  );
}

export default MarinePage;
