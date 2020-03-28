import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//Packages
import styled from "styled-components";
//Screens
import Home from "./screens/MainPage/MainPage";
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

// const Header = styled.div`
//   padding: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: row;
//   wrap: no-wrap;
//   height: 8rem;
//   width: 100vw;
//   background-color: #fff;
//   background-image: url(${BG});
//   background-size: 150%, 25%, 25%;
//   background-origin: border-box;
//   background-repeat: no-repeat;
//   background-position-x: 50%;
//   background-position-y: 0.04em;
// `;

const Footer = styled.div`
  padding: 1rem;
`;

const Main = styled.div`
  background-color: #fff;

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

  window.addEventListener("scroll", function() {
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
        <SearchBar hovered onChange={handleSearch} value={marineSearch} />
        {!!marineSearch.length && (
          <SearchResults
            isOpen={dropdownOpen}
            toggle={toggle}
            filteredMarines={marineData}
            handleClick={handleClick}
          />
        )}

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
