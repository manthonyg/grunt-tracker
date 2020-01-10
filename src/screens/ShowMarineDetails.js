import React, {useState, useEffect, useRef} from 'react';
import '../App.css';
import axios from 'axios';
import {useLocation} from 'react-router-dom'
import Flex from '../components/Flex'
import CreateAppointment from '../screens/CreateAppointment'
import CreatePFT from '../screens/CreatePFT'
import CreateCFT from '../screens/CreateCFT'
import HeaderBanner from '../components/HeaderBanner'
import Card from '../components/Card'


function ShowMarineDetails(props) {
  const componentIsMounted = useRef(true);
  const [ marineData, setMarineData ] = useState([]);
  const location = useLocation()
  console.log(marineData)
  useEffect(() => {
    if (componentIsMounted.current) {
      axios
      .get(`http://localhost:8082/api/marines/${props.match.params.id}`)
      .then(res => setMarineData(res.data))
      .catch(err => {
        console.log(err)
        console.log('Error in ShowMarineDetails.js on useEffect')
    })}
    return () => {
      componentIsMounted.current = false
    }
  }, [location, props.match.params.id])


  
  
  return (
<>
    <HeaderBanner>
  <strong>{marineData.rank}</strong>
  {marineData.last}
  </HeaderBanner>
  <Flex justifyAround>
  <Card primary noAnimation>
  <HeaderBanner secondary>
    Weapons
   </HeaderBanner>
  </Card>
  <Card primary noAnimation>
    <HeaderBanner secondary>
    Gear
    </HeaderBanner>
  </Card>
<Card primary noAnimation>
  <HeaderBanner secondary>
    Body
    </HeaderBanner>

<CreatePFT/>

</Card>
</Flex>
</>
  )}

export default ShowMarineDetails;





// <Container full>
     
      
//      //       {!!marineData ? 
     //       <>
          
     //        <Flex justifyAround alignCenter>
     //       <Nav tabs>
     //         <NavItem>
     //           <NavLink
     //             className={classnames({ active: activeTab === '1' })}
     //             onClick={() => { toggle('1'); }}>
     //             <i class="material-icons">apps</i>
     //           </NavLink> 
     //         </NavItem>
     
     //         <NavItem>
     //           <NavLink
     //             className={classnames({ active: activeTab === '2' })}
     //             onClick={() => { toggle('2'); }}>
     //             <i className="sm material-icons">account_circle</i>
     //           </NavLink>
     //         </NavItem>
     
     //         <NavItem>
     //           <NavLink
     //             className={classnames({ active: activeTab === '3' })}
     //             onClick={() => { toggle('3'); }}>
     //             <i className="sm material-icons">event_available</i> 
     //           </NavLink> 
     //         </NavItem>
     
     //         <NavItem>
     //           <NavLink
     //             className={classnames({ active: activeTab === '4' })}
     //             onClick={() => { toggle('4'); }}>
     //             <i className="material-icons">fitness_center</i> 
     //           </NavLink> 
     //         </NavItem>
     //       </Nav> 
     //     </Flex> 
     
     
       
           
     //     <Flex justifyAround alignCenter>
     //       <TabContent activeTab={activeTab}>
     //       <TabPane tabId="1">
     //         <Row>
     //           <Flex justifyAround alignCenter>
     //             <div className="card">
                   
     //                 <div className="card-header" onClick={toggleAppointmentsCollapse}>
     //                   Appointments<br/>
     //                   {marineData.appointments ?
     //                   <Flex justifyAround contentCenter>
     //                     <i class="material-icons">notification_important</i>
     //                   </Flex>
     //                   : <i class="material-icons">check</i>}
     //                 </div>
     //                 <Collapse isOpen={isAppointmentsOpen}>
     //                 <div className="card-main">
     //                   <div className="main-description">
                    
     //                     {marineData.appointments && marineData.appointments.map(appointment => 
     //                       <Toast key={marineData._id}>
     //                       <ToastHeader icon={marineData.appointments ? 'primary' : '{<Spinner size="sm"}'}>
     //                       {appointment.appointment_type}
     //                       </ToastHeader>
     //                       {marineData.appointments ?
     //                       <ToastBody>
     //                       <strong>Date:</strong> {appointment.date}
     //                       <br/>
     //                       <strong>Time:</strong>  {appointment.time}
     //                       <br/>
     //                       <strong>Location:</strong> {appointment.location}
                           
     //                       </ToastBody>
     //                       :
     //                       <Loader></Loader>}
     //                     </Toast>
     //                     )}
                         
     //                     </div>
     //                   </div>
     //                 </Collapse>
     //                 </div>
     //                 <div className="card">
     //                   <div className="card-header" onClick={toggleAccountabilityCollapse}>
     //                   Accountability<br/>
     //                   {marineData.accountability ?
     //                   <Flex justifyAround contentCenter>
     //                   <i class="material-icons">check</i>
     //                   </Flex>
     //                   : <i class="material-icons">notification_important</i>}
     //                 </div>
     //                   <Collapse isOpen={isAccountabilityOpen}>
     //                     <div className="card-main">
     //                   <div className="main-description">Accounted For</div>
     //                 </div>
     //                 </Collapse>
     //               </div>
     //               <div className="card">
     //                 <div className="card-header" onClick={toggleWeaponsCollapse}>
     //                 Weapons<br/>
     //                 {marineData.weapons  ?
     //                   <Flex justifyAround contentCenter>
     //                   <i class="material-icons">check</i>
     //                   </Flex>
     //                   : <i class="material-icons">notification_important</i>}
     //                 </div>
     //                 <Collapse isOpen={isWeaponsOpen}>
     //                 <div className="card-main">
     //                   <div className="main-description">Last updated:
     //                   </div>
     //                 </div>
     //                 </Collapse>
     //               </div>
                   
     //               <div className="card">
     //                 <div className="card-header" onClick={toggleGearCollapse}>
     //                   Gear<br/>
     //                 {marineData ?
     //                   <Flex justifyAround contentCenter>
     //                   <i class="material-icons">check</i>
     //                   </Flex>
     //                   : <i class="material-icons">notification_important</i>}
     //                 </div>
     //                 <Collapse isOpen={isGearOpen}>
     //                 <div className="card-main">
     //                   <div className="main-description">Last updated:</div>
     //                 </div>
     //                 </Collapse>
     //               </div>
                   
     //               <div className="card">
     //                 <div className="card-header" onClick={toggleBodyCollapse}>
     //                   Body<br/>
                    
     //                   <Flex justifyAround contentCenter>
     //                   <i class="material-icons">check</i>
     //                   </Flex>
     //                  <i class="material-icons">notification_important</i>
     //                 </div>
     //                 <Collapse isOpen={isBodyOpen}>
     //                 <div className="card-main">
     
     //                   <div className="main-description">
     //                     <strong>PFT</strong>
     //                   </div>
     
        
     //                   <>
     //                   <div className="main-description">Last updated:
     //                   {/* {marineData.body
     //                   .pft
     //                   .slice(-1)[0]
     //                   .last_updated} */}
     //                   </div>
                       
     
     //                   <div className="main-description">Score:
     //                   {/* {marineData.body
     //                   .pft
     //                   .slice(-1)[0]
     //                   .score} */}
     //                   </div>
                       
     //                   </>
                       
     //                   ' No Current Data'
                       
     //                   <br/>
     
     //                   <div className="main-description">
     //                     <strong>CFT</strong>
     //                   </div>
     // {/*                   
     //                   {marineData.body.cft  ? */}
     //                   <>
     //                   <div className="main-description">Last updated:
     //                   {/* {marineData.body
     //                   .cft
     //                   .slice(-1)[0]
     //                   .last_updated} */}
     //                   </div>
                       
     
     //                   <div className="main-description">Score:
     //                   {/* {marineData.body
     //                   .cft
     //                   .slice(-1)[0]
     //                   .score} */}
     //                   </div>
                       
     //                   </>
                       
     //                   : ' No Current Data'}
                      
     //                 </div>
     //                 </Collapse>
     //               </div>
     //             </Flex>
     //           </Row>
     //         </TabPane>
     //         <TabPane tabId="2">
     //           <Row>
     //             <div className="card">
     //               <div className="card-header">Testing</div>
     //               <div className="card-main">
     //                 <i className="material-icons">check</i>
     //                 <div className="main-description">Testing</div>
     //               </div>
     //             </div>
     //           </Row>
     //         </TabPane>
     
     //         <TabPane tabId="3">
     //           <Row>
     //             <Flex justifyAround alignCenter>
     //               <CreateAppointment marine={marineData._id}/>
     //             </Flex>
     //           </Row>
     //         </TabPane>
     
     //         <TabPane tabId="4">
     //           <Row>
     //             <Flex justifyAround alignCenter>
     
     //               <div className="card">
     //                 <div className="card-header">
     //                   <Flex alignCenter>
     //                     PFT
     //                     <i class="material-icons" onClick={togglePFTCollapse}>queue</i>
     //                   </Flex>
     //                 </div>
     //                 <Collapse isOpen={isPFTOpen}>
     //                 <div className="card-main">
     //                 <CreatePFT marine={marineData._id}/>
     //                 </div>
     //                 </Collapse>
     //                 <div className="card-main">
     //                 {/* {marineData.body.pft.length ?  */}
     //                 <>
     //                   <i className="material-icons">check</i>
     
     //                   <div className="main-description">Last Updated: 
     //                   {/* {marineData.body
     //                   .pft
     //                   .slice(-1)[0]
     //                   .last_updated} */}
     //                   </div>
     
     //                   <div className="main-description">Score: 
     //                   {/* {marineData.body
     //                   .pft
     //                   .slice(-1)[0]
     //                   .score} */}
     //                   </div>
     
     //                 </>
     //                   {/* : */}
     //                   <div className="main-description">
     //                     No Data Available
     //                   </div>
     // {/* } */}
     //               </div>
     //               </div>
     //               <div className="card">
     //                 <div className="card-header">
     //                   <Flex alignCenter onClick={toggleCFTCollapse}>
     //                     CFT
     //                     <i class="material-icons">queue</i>
     //                   </Flex>
     //                 </div>
     //                 <Collapse isOpen={isCFTOpen}>
     //                 <div className="card-main">
     //                 <CreateCFT marine={marineData._id}
     //                 onClick={toggleCFTCollapse}/>
     //                 </div>
     //                 </Collapse>
     //                 <div className="card-main">
     //                 {marineData.body.cft.length ? 
     //                 <>
     //                   <i className="material-icons">check</i>
     
     //                   <div className="main-description">Last Updated: 
     //                   {/* {marineData.body
     //                   .cft
     //                   .slice(-1)[0]
     //                   .last_updated} */}
     //                   </div>
     
     //                   <div className="main-description">Score: 
     //                   {/* {marineData.body
     //                   .cft
     //                   .slice(-1)[0]
     //                   .score} */}
     //                   </div>
     
     //                 </>
     //                   :
     //                   <div className="main-description">
     //                     No Data Available
     //                   </div>
     // }
                      
     //                 </div>
     //               </div>
     //             </Flex>
     //           </Row>
     //         </TabPane>
     //       </TabContent> 
     //     </Flex>
     //   </> 
     //   : <Loader/>
     // }
     //     </Container>
     
     //   )
     // }




  // const [activeTab, setActiveTab] = useState('1');

  // const toggle = tab => {
  //   if (activeTab !== tab) 
  //     setActiveTab(tab);
  //   }

  // const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  // const [isAccountabilityOpen, setIsAccountabilityOpen] = useState(false);
  // const [isWeaponsOpen, setIsWeaponsOpen] = useState(false);
  // const [isGearOpen, setIsGearOpen] = useState(false);
  // const [isBodyOpen, setIsBodyOpen] = useState(false);
  // const [ isPFTOpen, setIsPFTOpen ] = useState(false);
  // const [ isCFTOpen, setIsCFTOpen ] = useState(false);


  // const toggleAppointmentsCollapse = () => setIsAppointmentsOpen(!isAppointmentsOpen);
  // const toggleAccountabilityCollapse = () => setIsAccountabilityOpen(!isAccountabilityOpen);
  // const toggleWeaponsCollapse = () => setIsWeaponsOpen(!isWeaponsOpen);
  // const toggleGearCollapse = () => setIsGearOpen(!isGearOpen);
  // const toggleBodyCollapse = () => setIsBodyOpen(!isBodyOpen);
  // const togglePFTCollapse = () => setIsPFTOpen(!isPFTOpen);
  // const toggleCFTCollapse = () => setIsCFTOpen(!isCFTOpen);