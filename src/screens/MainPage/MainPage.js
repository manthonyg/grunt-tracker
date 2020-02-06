import React, { useState, useEffect } from "react";
//Packages
import styled from "styled-components";
//Global components
import Flex from "../../components/Flex";
import Alert from "../../components/Alert";
import PulsingArrow from "../../components/PulsingArrow";
import Banner from "../../components/Banner";
import Card from "../../components/Card";
import Logo from "../../components/Logo";
//Services
import { deleteSquadById, getAllSquads } from "../../services/squadServices";
//Media
import BG from "../../images/GT_Bg.png";

const StyledAlert = styled(Alert)`
  background-color: ${props => {
    if (props.success) return "#AED33880 !important";
    return "#505160 !important";
  }};
`;

const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  wrap: no-wrap;
  height: 12rem;
  margin-top: 2rem;
  width: 100vw;
  background-color: #fff;
  background-image: url(${BG});
  background-size: 150%, 25%, 25%;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0.04em;
`;

function MainPage() {
  const [squadList, setSquadList] = useState([]);

  useEffect(() => {
    getAllSquads().then(res => setSquadList(res));
  }, []);

  const deleteSquad = evt => {
    evt.persist();
    const id = evt.target.id;
    deleteSquadById(id)
      .then(res => {
        setAlertVisible(true);
        setSquadList(squadList.filter(squad => squad._id !== id));
      })
      .catch(err => {
        console.log("Error from Home_deleteClick");
      });
  };

  const [alertVisible, setAlertVisible] = useState(false);

  const handleDismiss = () => setAlertVisible(false);

  return (
    <>
      <Banner>Grunttracker</Banner>
      <Header id="header">
        <Flex justifyCenter alignEnd>
          <Logo size="3" />
        </Flex>
      </Header>
      <Banner secondary>my squads</Banner>

      <Flex contentCenter justifyCenter>
        {squadList && squadList.length ? (
          squadList.map(squad => (
            <>
              <Card
                toast
                noAnimation
                handleClose={deleteSquad}
                link={`/show-squad/${squad._id}`}
                key={squad._id}
                id={squad._id}
              >
                <Banner secondary>
                  <h3>
                    {squad.company}/{squad.platoon}-{squad.squad}
                  </h3>
                </Banner>
              </Card>
            </>
          ))
        ) : (
          <>
            <PulsingArrow />
            Add Squad to Start
          </>
        )}
      </Flex>
      <StyledAlert success isOpen={alertVisible} toggle={handleDismiss}>
        <Flex justifyAround>Squad Deleted</Flex>
      </StyledAlert>
    </>
  );
}

export default MainPage;
