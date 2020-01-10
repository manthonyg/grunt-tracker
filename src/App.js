import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Logo from './components/Logo'
import CreateSquad from './screens/CreateSquad';
import CreateMarine from './screens/CreateMarine';
import BottomNav from './components/BottomNav'
import ShowSquadDetails from './screens/ShowSquadDetails';
import ShowMarineDetails from './screens/ShowMarineDetails';
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import {getMarinesBySearchInput} from './services/marineServices'
const App = () => {

  const [marineData, setMarineData] = useState([])
  const [marineSearch, setMarineSearch] = useState('')
  const handleSearch = (event) => setMarineSearch(event.target.value)
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = () => setMarineSearch('')

  useEffect(() => {
    getMarinesBySearchInput(marineSearch)
    .then(marines => setMarineData(marines))
    .catch(err => console.log(err))
  }, [marineSearch] )

  return (

    <Router>
      <Logo/>

      <SearchBar hovered onChange={handleSearch} value={marineSearch}/> 
      {!!marineSearch.length && 
      <SearchResults
        isOpen={dropdownOpen}
        toggle={toggle}
        filteredMarines={marineData}
        handleClick={handleClick}/>}

      <Route exact path='/' component={Home}/>
      <Route path='/show-squad-details' component={ShowSquadDetails}/>
      <Route path='/create-squad' component={CreateSquad}/>
      <Route path='/create-marine' component={CreateMarine}/>
      <Route path='/show-squad/:id' component={ShowSquadDetails}/>
      <Route path='/show-marine/:id' component={ShowMarineDetails}/>
      <BottomNav/>

    </Router>

  );
}

export default App;
