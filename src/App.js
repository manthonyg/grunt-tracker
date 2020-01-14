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
  height: 3rem;
  width: 100vw;
  background-color: #fff;

background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg fill-opacity='0.31'%3E%3Cpolygon fill='%239da93e' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%238d9542' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%237c8244' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%236c6f46' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%235b5d46' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%234b4b46' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23393a45' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
background-attachment: fixed;
background-size: cover;

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
        <Flex justifyCenter alignCenter>
          <Banner>grunt</Banner> <Logo />
          <Banner>tracker</Banner>
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
