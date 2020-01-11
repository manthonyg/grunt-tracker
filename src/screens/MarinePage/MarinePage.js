import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//Local
import CreatePFT from "./components/CreatePFT";
import CreateCFT from "./components/CreateCFT";
//Global
import Flex from "../../components/Flex";
import CreateAppointment from "./components/CreateAppointment";
import HeaderBanner from "../../components/HeaderBanner";
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
      <HeaderBanner>
        <strong>{marineData.rank}</strong>
        {marineData.last}
      </HeaderBanner>
      <Flex justifyAround>
        <Card primary noAnimation>
          <HeaderBanner secondary>Weapons</HeaderBanner>
        </Card>
        <Card primary noAnimation>
          <HeaderBanner secondary>Gear</HeaderBanner>
        </Card>
        <Card primary noAnimation>
          <HeaderBanner secondary>Body</HeaderBanner>

          <CreatePFT />
        </Card>
      </Flex>
    </>
  );
}

export default MarinePage;
