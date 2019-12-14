import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './screens/Home';
import LogoSmall from './components/LogoSmall'
import CreateSquad from './screens/CreateSquad';
import CreateMarine from './screens/CreateMarine';
import BottomNav from './components/BottomNav'
import ShowSquadDetails from './screens/ShowSquadDetails';
import ShowMarineDetails from './screens/ShowMarineDetails';
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'


const App = () => {


const [marineData, setMarineData] = useState([])
const [marineSearch, setMarineSearch] = useState('')
  const handleSearch = (event) => {
    setMarineSearch(event.target.value)
    console.log(marineData)
  }

  // const filteredMarines = marineData.filter(name => name.last.toLowerCase().includes(marineSearch.toLowerCase()) && marineSearch.length)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = () => setMarineSearch('')

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/marines/last`, {
        params: {
          marineSearch
        }})
      .then(res => setMarineData(res.data))
  }, [marineSearch])
  return (
  
<Router>
  <LogoSmall/>
  
  <SearchBar hovered onChange={handleSearch} value={marineSearch}/> 
  {!!marineSearch.length &&
  <SearchResults
                isOpen={dropdownOpen}
                toggle={toggle}
                filteredMarines={marineData}
                handleClick={handleClick}/> }

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
