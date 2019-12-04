import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Toast, 
  ToastBody, 
  ToastHeader, 
} from 'reactstrap';
import classnames from 'classnames';
import Loader from '../components/Loader'
import Flex from '../components/Flex'
import CreateAppointment from '../screens/CreateAppointment'
import CreatePFT from '../screens/CreatePFT'
import CreateCFT from '../screens/CreateCFT'

function ShowMarineDetails(props) {

  const [marineData,
    setMarineData] = useState('');
    const location = useLocation()
 
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/marines/${props.match.params.id}`)
      .then(res => setMarineData(res.data))
      .catch(err => {
        console.log(err)
        console.log('Error in ShowMarineDetails.js')
      })
  }, [location])

  


  const [activeTab,
    setActiveTab] = useState('1');
  const toggle = tab => {
    if (activeTab !== tab) 
      setActiveTab(tab);
    }
  
  return (

    <Container full>
      <LogoSmall>
        GruntTracker
      </LogoSmall>
      
      {marineData
        ? <>< HeaderBanner > {
          marineData.rank
        }
      {
        marineData.last
      }, {marineData.first} </HeaderBanner>
       <Flex justifyAround alignCenter>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            <i class="material-icons">
apps
</i> </NavLink> </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            <i class="sm material-icons">
account_circle
</i> </NavLink> </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
          <i class="sm material-icons">
event_available
</i> </NavLink> </NavItem>

       

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            <i class="material-icons">
fitness_center
</i > </NavLink> </NavItem>



      </Nav> </Flex> < Flex justifyAround alignCenter > <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Flex justifyAround alignCenter>

            <div class="card">
                <div class="card-header">Appointments</div>
                <div class="card-main">
                  <div class="main-description">
               
                    {marineData.appointments.map(appointment => 
                      <Toast>
                      <ToastHeader icon={marineData.appointments ? 'primary' : '{<Spinner size="sm"}'}>
                      {appointment.appointment_type}
                      </ToastHeader>
                      {marineData.appointments ?
                      <ToastBody>
                      <strong>Date:</strong> {appointment.date}
                      <br/>
                      <strong>Time:</strong>  {appointment.time}
                      <br/>
                      <strong>Location:</strong> {appointment.location}
                      
                      </ToastBody>
                      :
                      <Loader></Loader>}
                    </Toast>
                    )}

                    </div>
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">Accountability</div>
                    <div class="card-main">
                  <div class="main-description">Accounted For</div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">Weapons</div>
                <div class="card-main">
                  <div class="main-description">Last updated:
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">Gear</div>
                <div class="card-main">
                  <div class="main-description">Last updated:</div>
                </div>
              </div>
              <div class="card">
                <div class="card-header">Body</div>
                <div class="card-main">

                  <div class="main-description"><strong>PFT</strong></div>

                {marineData.body.pft.length ?
                  <>
                  <div className="main-description">Last updated:
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .last_updated}
                  </div>
                  

                  <div className="main-description">Score:
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .score}
                  </div>
                  
                  </>
                  
                  : ' No Current Data'}
                  
                  <br/>

                  <div className="main-description"><strong>CFT</strong></div>
                  
                  {marineData.body.cft.length ?
                  <>
                  <div className="main-description">Last updated:
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .last_updated}
                  </div>
                  

                  <div className="main-description">Score:
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .score}
                  </div>
                  
                  </>
                  
                  : ' No Current Data'}
                 
                </div>
              </div>
            </Flex>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <div class="card">
              <div class="card-header">Testing</div>
              <div class="card-main">
                <i class="material-icons">check</i>
                <div class="main-description">Testing</div>
              </div>
            </div>
          </Row>
        </TabPane>

        <TabPane tabId="3">
          <Row>
            <Flex justifyAround alignCenter>
              <CreateAppointment marine={marineData._id}/>
            </Flex>
          </Row>
        </TabPane>

        <TabPane tabId="4">
          <Row>
            <Flex justifyAround alignCenter>

              <div class="card">
                <div class="card-header">PFT</div>
                <div class="card-main">
                <CreatePFT marine={marineData._id}/>
                {marineData.body.pft.length ? 
                <>
                  <i class="material-icons">check</i>

                  <div class="main-description">Last Updated: 
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .last_updated}</div>

                  <div class="main-description">Score: 
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .score}</div>

                </>
                  :
                  <div class="main-description">
                    No Data Available
                  </div>
}
              </div>
              </div>
              <div class="card">
                <div class="card-header">CFT</div>
                <div class="card-main">
                <CreateCFT marine={marineData._id}/>
                {marineData.body.cft.length ? 
                <>
                  <i class="material-icons">check</i>

                  <div class="main-description">Last Updated: 
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .last_updated}</div>

                  <div class="main-description">Score: 
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .score}</div>

                </>
                  :
                  <div class="main-description">
                    No Data Available
                  </div>
}
                  <i class="material-icons">check</i>
                  <div class="main-description">Last Updated:</div>
                  <div class="main-description">Score:</div>
                </div>
              </div>
            </Flex>
          </Row>
        </TabPane>
      </TabContent> 
    </Flex>
  </> 
  : <Loader/>
}
    </Container>
  )
}

export default ShowMarineDetails;