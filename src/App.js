import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './screens/Home';
import CreateSquad from './screens/CreateSquad';
import ShowSquadDetails from './screens/ShowSquadDetails';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/create-squad' component={CreateSquad} />
          <Route path='/show-squad/:id' component={ShowSquadDetails} />
        </div>
      </Router>
    );
  }
}

export default App;