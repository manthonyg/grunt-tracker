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
import BG from "./images/GT_Bg.png";

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
  height: 8rem;
  width: 100vw;
  background-color: #fff;
  background-image: url(${BG});
  background-size: 150%, 25%, 25%;
  background-origin: border-box;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0.04em;
`;

const Footer = styled.div`
  padding: 1rem;
`;

const Main = styled.div`
  background-color: #fff;
  flex: 1 1 auto;
  padding-top: 1rem;
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

  let windowPos = document.scrollTop;
  window.addEventListener("onscroll", function() {
    console.log(windowPos);
    if (document.scrollTop > windowPos) {
      console.log("something happens");
    } else {
      console.log("nothing happens");
    }
  });

  useEffect(() => {
    getMarinesBySearchInput(marineSearch)
      .then(marines => setMarineData(marines))
      .catch(err => console.log(err));
  }, [marineSearch]);

  return (
    <Router>
      <LayoutContainer>
        <Header id="header">
          <Flex justifyCenter alignEnd>
            <Logo />
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
