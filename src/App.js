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
import HeaderBanner from "./components/HeaderBanner";
import SearchResults from "./components/SearchResults";
//Services
import { getMarinesBySearchInput } from "./services/marineServices";
//Media
import GTLOGO from "./images/GT_Logo.png";
import GTBG from "./images/GT_Bg.png";

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
  margin-bottom: 1rem;
  height: 5rem;
  width: 100vw;
  background-color: #fff;
`;

const Footer = styled.div`
  padding: 1rem;
`;

const Main = styled.div`
  background-color: #ffffff;
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
       
          <Flex justifyBetween>
          <HeaderBanner>grunt</HeaderBanner> <Logo/><HeaderBanner>tracker</HeaderBanner>
          <SearchBar hovered onChange={handleSearch} value={marineSearch}/>
          {!!marineSearch.length && (
            <SearchResults
              isOpen={dropdownOpen}
              toggle={toggle}
              filteredMarines={marineData}
              handleClick={handleClick}
            />
          )}
          {/* <HeaderBanner intro>grunt<strong>tracker</strong></HeaderBanner> */}
       
          </Flex>
          
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
