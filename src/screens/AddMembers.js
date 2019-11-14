import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import Container from '../components/Container'
import Flex, {Column} from '../components/Flex'
import Button, {Loader} from '../components/Button'
import Heading from '../components/Heading'
import SearchBar from '../components/SearchBar'
import ArrowTab from '../components/ArrowTab'
import BottomNav from '../components/BottomNav'
import HeaderBanner from '../components/HeaderBanner'
import LogoSmall from '../components/LogoSmall'

function AddMembers() {


    return (
        <Container full>

            <LogoSmall>
                GruntTracker
            </LogoSmall>

    <Container>
        <Flex noWrap alignCenter justifyCenter>
            <a href='/create-squad'><Button none>Add Squad <i className='fa fa-plus-circle' style={{color: 'green'}}/></Button></a>
        </Flex>

        <Flex noWrap alignCenter justifyCenter>
            <a href='/create-marine'><Button none>Add Marine<i className='fa fa-plus-circle' style={{color: 'green'}}/></Button></a>
        </Flex>

       
    </Container>

    </Container>
              
      
     
    )
}


export default AddMembers