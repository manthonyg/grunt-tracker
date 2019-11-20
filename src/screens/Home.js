import React, {useState, useContext, useEffect, useCallback, useMemo} from 'react';
import axios from 'axios'
import Container from '../components/Container'
import Flex, {Column} from '../components/Flex'
import Heading from '../components/Heading'
import SearchBar from '../components/SearchBar'
import ArrowTab from '../components/ArrowTab'

function Home(props) {

    const [squadList,
        setSquadList] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8082/api/squads')
            .then(res => setSquadList(res.data))
    }, [])

    const handleRemove = (e) => {
        e.preventDefault()

        const icons = document.querySelectorAll('.tabIcon');
        for (let i = 0; i < icons.length; i++) {
            icons[i]
                .classList
                .remove('fa-chevron-right')
            icons[i]
                .classList
                .add('fa-times')
            icons[i].style.color = 'red'
            icons[i].addEventListener('click', onDeleteClick)
        }
        if (icons.length < 1) {
            document
                .getElementById('status')
                .innerHTML = 'No Squads to Remove'
        }
    }

    const onDeleteClick = (evt) => {
        const squad = evt.target.id
        axios
            .delete(`http://localhost:8082/api/squads/${squad}`)
            .then(res => {
                props
                    .history
                    .push("/");
                
                setSquadList()

                const icons = document.querySelectorAll('.tabIcon');
                icons[1].style.color = 'blue'
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