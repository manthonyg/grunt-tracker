import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import Container from '../components/Container'
import HeaderBanner from '../components/HeaderBanner'
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
import { Collapse, Button, CardBody, Card } from 'reactstrap';



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

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) 
      setActiveTab(tab);
    }

  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  const [isAccountabilityOpen, setIsAccountabilityOpen] = useState(false);
  const [isWeaponsOpen, setIsWeaponsOpen] = useState(false);
  const [isGearOpen, setIsGearOpen] = useState(false);
  const [isBodyOpen, setIsBodyOpen] = useState(false);

  const toggleAppointmentsCollapse = () => setIsAppointmentsOpen(!isAppointmentsOpen);
  const toggleAccountabilityCollapse = () => setIsAccountabilityOpen(!isAccountabilityOpen);
  const toggleWeaponsCollapse = () => setIsWeaponsOpen(!isWeaponsOpen);
  const toggleGearCollapse = () => setIsGearOpen(!isGearOpen);
  const toggleBodyCollapse = () => setIsBodyOpen(!isBodyOpen);
  
  return (

    <Container full>
     
      
      {marineData ? 
      <>
     
       <Flex justifyAround alignCenter>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            <i class="material-icons">apps</i>
          </NavLink> 
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            <i class="sm material-icons">account_circle</i>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}>
            <i className="sm material-icons">event_available</i> 
          </NavLink> 
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}>
            <i class="material-icons">fitness_center</i > 
          </NavLink> 
        </NavItem>
      </Nav> 
    </Flex> 


    <HeaderBanner> 
        {marineData.rank}{marineData.last}, {marineData.first} 
    </HeaderBanner>
      
    <Flex justifyAround alignCenter> <TabContent activeTab={activeTab}>
      <TabPane tabId="1">
        <Row>
          <Flex justifyAround alignCenter>
            <div className="card">
              
                <div className="card-header" onClick={toggleAppointmentsCollapse}>Appointments</div>
                <Collapse isOpen={isAppointmentsOpen}>
                <div className="card-main">
                  <div className="main-description">
               
                    {marineData.appointments.map(appointment => 
                      <Toast key={marineData._id}>
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
                </Collapse>
                </div>
                <div className="card">
                  <div className="card-header" onClick={toggleAccountabilityCollapse}>Accountability</div>
                  <Collapse isOpen={isAccountabilityOpen}>
                    <div className="card-main">
                  <div className="main-description">Accounted For</div>
                </div>
                </Collapse>
              </div>
              <div className="card">
                <div className="card-header" onClick={toggleWeaponsCollapse}>Weapons</div>
                <Collapse isOpen={isWeaponsOpen}>
                <div className="card-main">
                  <div className="main-description">Last updated:
                  </div>
                </div>
                </Collapse>
              </div>
              
              <div className="card">
                <div className="card-header" onClick={toggleGearCollapse}>Gear</div>
                <Collapse isOpen={isGearOpen}>
                <div className="card-main">
                  <div className="main-description">Last updated:</div>
                </div>
                </Collapse>
              </div>
              
              <div className="card">
                <div className="card-header" onClick={toggleBodyCollapse}>Body</div>
                <Collapse isOpen={isBodyOpen}>
                <div className="card-main">

                  <div className="main-description"><strong>PFT</strong></div>

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
                </Collapse>
              </div>
            </Flex>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <div className="card">
              <div className="card-header">Testing</div>
              <div className="card-main">
                <i className="material-icons">check</i>
                <div className="main-description">Testing</div>
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

              <div className="card">
                <div className="card-header">PFT</div>
                <div className="card-main">
                <CreatePFT marine={marineData._id}/>
                {marineData.body.pft.length ? 
                <>
                  <i className="material-icons">check</i>

                  <div className="main-description">Last Updated: 
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .last_updated}</div>

                  <div className="main-description">Score: 
                  {marineData.body
                  .pft
                  .slice(-1)[0]
                  .score}</div>

                </>
                  :
                  <div className="main-description">
                    No Data Available
                  </div>
}
              </div>
              </div>
              <div className="card">
                <div className="card-header">CFT</div>
                <div className="card-main">
                <CreateCFT marine={marineData._id}/>
                {marineData.body.cft.length ? 
                <>
                  <i className="material-icons">check</i>

                  <div className="main-description">Last Updated: 
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .last_updated}</div>

                  <div className="main-description">Score: 
                  {marineData.body
                  .cft
                  .slice(-1)[0]
                  .score}</div>

                </>
                  :
                  <div className="main-description">
                    No Data Available
                  </div>
}
                  <i className="material-icons">check</i>
                  <div className="main-description">Last Updated:</div>
                  <div className="main-description">Score:</div>
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