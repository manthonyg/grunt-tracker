import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Packages
import styled from "styled-components";
//Pages
import Home from "./screens/MainPage/MainPage";
import CreateSquad from "./screens/CreateSquad";
import CreateMarine from "./screens/MarinePage/components/CreateMarine";
import SquadPage from "./screens/SquadPage/SquadPage";
import MarinePage from "./screens/MarinePage/MarinePage";
//Local Components
import BottomNav from "./components/BottomNav";
import Logo from "./components/Logo";
import SearchBar from "./components/SearchBar";
import Flex from "./components/Flex";
import Banner from "./components/Banner";
import SearchResults from "./components/SearchResults";
//Services
import { getMarinesBySearchInput } from "./services/marineServices";
//Media

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  wrap: no-wrap;
  margin-bottom: 2rem;
  height: 5rem;
  width: 100vw;
  background-color: #505160;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='34' height='17' viewBox='0 0 34 17'%3E%3Cdefs%3E%3Crect stroke='%23505160' stroke-width='0.31' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='2' height='2' patternUnits='userSpaceOnUse'%3E%3Cg stroke='%23505160' stroke-width='0.31'%3E%3Crect fill='%23545463' width='1' height='1'/%3E%3Crect fill='%23505160' width='1' height='1' x='1' y='1'/%3E%3Crect fill='%23575866' width='1' height='1' y='1'/%3E%3Crect fill='%235b5b6a' width='1' height='1' x='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='b' width='5' height='11' patternUnits='userSpaceOnUse'%3E%3Cg fill='%235e5f6d'%3E%3Cuse xlink:href='%23s' x='2' y='0'/%3E%3Cuse xlink:href='%23s' x='4' y='1'/%3E%3Cuse xlink:href='%23s' x='1' y='2'/%3E%3Cuse xlink:href='%23s' x='2' y='4'/%3E%3Cuse xlink:href='%23s' x='4' y='6'/%3E%3Cuse xlink:href='%23s' x='0' y='8'/%3E%3Cuse xlink:href='%23s' x='3' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='7' height='7' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23626270'%3E%3Cuse xlink:href='%23s' x='1' y='1'/%3E%3Cuse xlink:href='%23s' x='3' y='4'/%3E%3Cuse xlink:href='%23s' x='5' y='6'/%3E%3Cuse xlink:href='%23s' x='0' y='3'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='11' height='5' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23505160'%3E%3Cuse xlink:href='%23s' x='1' y='1'/%3E%3Cuse xlink:href='%23s' x='6' y='3'/%3E%3Cuse xlink:href='%23s' x='8' y='2'/%3E%3Cuse xlink:href='%23s' x='3' y='0'/%3E%3Cuse xlink:href='%23s' x='0' y='3'/%3E%3C/g%3E%3Cg fill='%23656673'%3E%3Cuse xlink:href='%23s' x='8' y='3'/%3E%3Cuse xlink:href='%23s' x='4' y='2'/%3E%3Cuse xlink:href='%23s' x='5' y='4'/%3E%3Cuse xlink:href='%23s' x='10' y='0'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='23' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23aebd38'%3E%3Cuse xlink:href='%23s' x='2' y='5'/%3E%3Cuse xlink:href='%23s' x='23' y='13'/%3E%3Cuse xlink:href='%23s' x='4' y='18'/%3E%3Cuse xlink:href='%23s' x='35' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='61' height='31' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23aebd38'%3E%3Cuse xlink:href='%23s' x='16' y='0'/%3E%3Cuse xlink:href='%23s' x='13' y='22'/%3E%3Cuse xlink:href='%23s' x='44' y='15'/%3E%3Cuse xlink:href='%23s' x='12' y='11'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='34' height='17'/%3E%3Crect fill='url(%23b)' width='34' height='17'/%3E%3Crect fill='url(%23c)' width='34' height='17'/%3E%3Crect fill='url(%23d)' width='34' height='17'/%3E%3Crect fill='url(%23e)' width='34' height='17'/%3E%3Crect fill='url(%23f)' width='34' height='17'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: contain;


`;

const Footer = styled.div`
  padding: 1rem;
`;

const Main = styled.div`
  background-color: #fff;
  flex: 1 1 auto;
  //flex: 1 0 auto; // use this to implement sticky footer
  overflow-y: scroll;
  margin-bottom: 2rem;
  -webkit-overflow-scrolling: touch;

`;

const App = () => {
  const [marineData, setMarineData] = useState([]);
  const [marineSearch, setMarineSearch] = useState("");
  const handleSearch = event => setMarineSearch(event.target.value);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = () => setMarineSearch("");

  useEffect(() => {
    getMarinesBySearchInput(marineSearch)
      .then(marines => setMarineData(marines))
      .catch(err => console.log(err));
  }, [marineSearch]);

  return (
    <Router>
      <LayoutContainer>
        <Header>
        <Flex justifyCenter alignEnd>
          <Banner white>grunt</Banner> <Logo />
          <Banner white>tracker</Banner>
        </Flex>
          <SearchBar hovered onChange={handleSearch} value={marineSearch} />
          {!!marineSearch.length && (
            <SearchResults
              isOpen={dropdownOpen}
              toggle={toggle}
              filteredMarines={marineData}
              handleClick={handleClick}
            />
          )}

        </Header>

      
        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/create-squad" component={CreateSquad} />
          <Route path="/create-marine" component={CreateMarine} />
          <Route path="/show-squad/:id" component={SquadPage} />
          <Route path="/show-marine/:id" component={MarinePage} />
        </Main>

        <Footer>
          <BottomNav />
        </Footer>
      </LayoutContainer>
    </Router>
  );
};

export default App;
