import React, {useState, useEffect } from 'react';
import axios from 'axios'
import Container from '../components/Container'
import Flex from '../components/Flex'
import Heading from '../components/Heading'
import SearchBar from '../components/SearchBar'
import ArrowTab from '../components/ArrowTab'

function Home(props) {
    
    const [squadList,
        setSquadList] = useState()
    
       


    useEffect(() => {
        axios
            .get('http://localhost:8082/api/squads')
            .then(res => setSquadList(res.data))
            
    }, [])
console.log(squadList)
   
    const onDeleteClick = (evt) => {
        evt.persist();
        const squad = evt.target.id
        axios
            .delete(`http://localhost:8082/api/squads/${squad}`)
            .then(res => {
            const updatedSquadList = squadList.filter(m => m._id !== evt.target.id);
            setSquadList(updatedSquadList) 
                
            })
            .catch(err => {
                console.log("Error from Home_deleteClick");
            })
    };

    return ( 
        <> 
        <Container>
            <Heading center>GruntTracker</Heading>
        </Container>
        <Container>
            <Flex alignCenter justifyCenter>
                <SearchBar placeholder="...Search for"/>
            </Flex>
        </Container>
        
 {squadList ?
        squadList.map(squad => <ArrowTab
            link={`/show-squad/${squad._id}`}
            id={squad._id}
            onClick={onDeleteClick}
            squad={squad}
            key={squad.callsign}>{squad.unit} {squad.platoon}/{squad.squad}

            <Heading h5>({squad.callsign})</Heading>
          
        </ArrowTab>)
    :
    <Flex alignCenter>Click 'add squad' to begin!</Flex>} 
    </>
    )
}


export default Home