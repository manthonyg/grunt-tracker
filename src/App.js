import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Packages
import styled from "styled-components";
//Screens
import Home from "./screens/HomePage/HomePage";
import CreateSquad from "./screens/CreateSquad";
import SquadPage from "./screens/SquadPage/SquadPage";
import MarinePage from "./screens/MarinePage/MarinePage";
//Local Components
import BottomNav from "./components/Nav/BottomNav";
import SearchBar from "./components/Search/SearchBar";
import SearchResults from "./components/Search/SearchResults";
//Services
import { getMarinesBySearchInput } from "./services/marineServices";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div``;
const Footer = styled.div`
  padding: 1em;
`;

const Main = styled.div`
  background-color: #fff;
  //flex: 1 0 auto; // use this to implement sticky footer
  overflow-y: scroll;
  margin-bottom: 2em;
  -webkit-overflow-scrolling: touch;
`;

const App = () => {
  const [marineData, setMarineData] = useState([]);
  const [marineSearch, setMarineSearch] = useState("");
  const handleSearch = event => setMarineSearch(event.target.value);
  const handleClick = () => setMarineSearch("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleSearchResultsDropdown = () =>
    setIsDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getMarinesBySearchInput(marineSearch)
      .then(marines => setMarineData(marines))
      .catch(err => console.log(err));
  }, [marineSearch]);

  return (
    <Router>
      <LayoutContainer>
        <Header>
          <SearchBar hovered onChange={handleSearch} value={marineSearch} />
          {!!marineSearch.length && (
            <SearchResults
              isOpen={isDropdownOpen}
              toggle={toggleSearchResultsDropdown}
              filteredMarines={marineData}
              handleClick={handleClick}
            />
          )}
        </Header>

        <Main>
          <Route exact path="/" component={Home} />
          <Route path="/create-squad" component={CreateSquad} />
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
