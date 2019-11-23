import React from 'react';
import Container from '../components/Container'
import Flex from '../components/Flex'
import Button from '../components/Button'
import LogoSmall from '../components/LogoSmall'

function AddMembers() {


    return (
        <Container full>

            <LogoSmall>
                Tracker
            </LogoSmall>

    <Container>
        <Flex noWrap alignCenter justifyCenter>
            <a href='/create-squad'><Button none>Add Group<i className='fa fa-plus-circle' style={{color: 'green'}}/></Button></a>
        </Flex>

        <Flex noWrap alignCenter justifyCenter>
            <a href='/create-marine'><Button none>Add Member<i className='fa fa-plus-circle' style={{color: 'green'}}/></Button></a>
        </Flex>

       
    </Container>

    </Container>
              
      
     
    )
}


export default AddMembers