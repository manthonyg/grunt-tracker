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
           <a href='/remove-book'><Button none>Remove Squad <i className='fa fa-minus-circle' style={{color: 'red'}}/></Button></a>
        </Flex>


 


            {squadList.map(squad =>
                <ArrowTab squad={squad} key={squad.callsign}>{squad.unit} {squad.platoon}/{squad.squad}
                <Heading h5>({squad.callsign})</Heading>
                </ArrowTab>
                )}


         </>  
              
      
     
    )
}


export default Home