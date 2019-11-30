import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './screens/Home';
import CreateSquad from './screens/CreateSquad';
import CreateMarine from './screens/CreateMarine';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BottomNav from './components/BottomNav'
import {Link} from 'react-router-dom';
import ShowSquadDetails from './screens/ShowSquadDetails';
import ShowMarineDetails from './screens/ShowMarineDetails';
import SearchBar from './components/SearchBar'
const App = () => {

  let [pos,
    setPos] = useState(window.pageYOffset)
  let [visible,
    setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      let temp = window.pageYOffset
      if (window.pageYOffset > 0) {
        setVisible(pos < temp)
        setPos(temp)
      } else {
        setVisible(false)
      }

    };
    window.addEventListener("scroll", handleScroll);
    return (() => {
      window.removeEventListener("scroll", handleScroll);
    })
  })

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/marines/`)
      .then(res => setMarineData(res.data))
  }, [])


const [marineData, setMarineData] = useState([])
const [marineSearch, setMarineSearch] = useState('')
  const handleSearch = (event) => {
    setMarineSearch(event.target.value)
    console.log(filteredMarines)
  }

  const filteredMarines = marineData.filter(marine =>
    marine.last.toLowerCase().search(marineSearch.toLowerCase()) !==
    -1,
  )

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleClick = () => 
  setMarineSearch('')
  return (

    <Router>
  
      
     
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {filteredMarines.length} {filteredMarines.length === 1 ? 'Result' : 'Results'}
      </DropdownToggle>
      <DropdownMenu>
        {filteredMarines.map(marine =>
          <DropdownItem><Link onClick={handleClick} to={`/show-marine/${marine._id}`}>{marine.last}</Link></DropdownItem>)}
        </DropdownMenu>
        </Dropdown>


     
        <Route exact path='/' component={Home}/>
        <Route path='/show-squad-details' component={ShowSquadDetails}/>
        <Route path='/create-squad' component={CreateSquad}/>
        <Route path='/create-marine' component={CreateMarine}/>
        <Route path='/show-squad/:id' component={ShowSquadDetails}/>
  
        <Route path='/show-marine/:id' component={ShowMarineDetails}/>
        
       
      
        <SearchBar hovered onChange={handleSearch} value={marineSearch}/>
        <BottomNav hidden={visible}/>
      </Router>
      

  

  );
}

export default App;