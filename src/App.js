import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, useHistory} from 'react-router-dom';

import './App.css';
import {Container} from 'reactstrap'
import Home from './screens/Home';
import CreateSquad from './screens/CreateSquad';
import CreateMarine from './screens/CreateMarine';

import BottomNav from './components/BottomNav'

import ShowSquadDetails from './screens/ShowSquadDetails';
import ShowMarineDetails from './screens/ShowMarineDetails';

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

  return (

    <Container fluid>
      <Router>
        <Route exact path='/' component={Home}/>
        <Route path='/show-squad-details' component={ShowSquadDetails}/>
        <Route path='/create-squad' component={CreateSquad}/>
        <Route path='/create-marine' component={CreateMarine}/>
        <Route path='/show-squad/:id' component={ShowSquadDetails}/>
        <Route path='/show-marine/:id' component={ShowMarineDetails}/>
        <BottomNav hidden={visible}/>
      </Router>

    </Container>

  );
}

export default App;