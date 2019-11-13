import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import Container from '../components/Container'
import Flex, {Column} from '../components/Flex'
import Button, {Loader} from '../components/Button'
import Heading from '../components/Heading'
import SearchBar from '../components/SearchBar'
import LineBreak from '../components/LineBreak'
import ArrowTab from '../components/ArrowTab'

function Home(props) {

const [ squadList, setSquadList ] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:8082/api/squads')
        .then(res => setSquadList(res.data))
        }, []
        )

const handleRemove = (e) => {
    e.preventDefault()

    const icons = document.querySelectorAll('.tabIcon');
    for (let i=0; i<icons.length;i++) {
    icons[i].classList.remove('fa-chevron-right')
    icons[i].classList.add('fa-times')
    icons[i].style.color = 'red'
    icons[i].addEventListener('click', onDeleteClick)
    }
    if (icons.length < 1) {
       document.getElementById('status').innerHTML = 'No Squads to Remove'
    }
}

const onDeleteClick = (evt) => {
    const squad = evt.target.id
    axios
      .delete('http://localhost:8082/api/squads/'+squad)
      .then(res => {
        props.history.push("/");
        console.log(squadList)
        
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
                <SearchBar placeholder="...Search for Marine"/>
            </Flex>
        </Container>


    

  
        <Flex noWrap alignCenter justifyCenter>
            <a href='/create-squad'><Button none>Add Squad <i className='fa fa-plus-circle' style={{color: 'green'}}/></Button></a>
        </Flex>


   
           

        <Flex noWrap alignCenter justifyCenter>
           <Button onClick={handleRemove} none>Remove Squad <i className='fa fa-minus-circle' style={{color: 'red'}}/></Button>
        </Flex>

<Container id='status'/>



            {squadList.map(squad =>
                <ArrowTab id={squad._id} squad={squad} key={squad.callsign}>{squad.unit} {squad.platoon}/{squad.squad}
                <Heading h5>({squad.callsign})</Heading>
                </ArrowTab>
                )}


         </>  
              
      
     
    )
}


export default Home