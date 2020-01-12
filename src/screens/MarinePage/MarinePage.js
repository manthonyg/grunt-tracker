import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//Local
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
//Global
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import Banner from "../../components/Banner";
import Card from "../../components/Card";

function MarinePage(props) {
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

  return (
    <>
      <Banner>
        <strong>{marineData.rank}</strong>
        {marineData.last}
      </Banner>
      <Flex justifyAround>
        <Card primary noAnimation>
          <Banner secondary>Weapons</Banner>
        </Card>
        <Card primary noAnimation>
          <Banner secondary>Gear</Banner>
        </Card>
        <Card primary noAnimation>
          <Banner secondary>Body</Banner>

          <CreatePFT />
        </Card>
      </Flex>
    </>
  );
}

export default MarinePage;
