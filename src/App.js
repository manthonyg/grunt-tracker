import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './screens/Home';
import CreateSquad from './screens/CreateSquad';
import CreateMarine from './screens/CreateMarine';
import AddMembers from './screens/AddMembers'

import BottomNav from './components/BottomNav'

import ShowSquadDetails from './screens/ShowSquadDetails';
import ShowMarineDetails from './screens/ShowMarineDetails';


class App extends Component {
  render() {
    return (
      <>

      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path ='/show-squad-details' component={ShowSquadDetails}/>
          <Route path='/create-squad' component={CreateSquad} />
          <Route path='/create-marine' component={CreateMarine} />
          <Route path='/show-squad/:id' component={ShowSquadDetails} />
          <Route path='/show-marine/:id' component={ShowMarineDetails} />
          <Route path='/add-members' component={AddMembers} />
          {/* <Route path = '/view-appointments' component={ViewAppointments} /> */}
        </div>
      </Router>

      <BottomNav/>

      </>

    );
  }
}

export default App;