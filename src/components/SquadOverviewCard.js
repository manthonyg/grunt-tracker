import React from 'react';
import styled from 'styled-components'
import {Badge, Container, Row, Col} from 'reactstrap';
import HeaderBanner from '../components/HeaderBanner';

function SquadOverviewCard(props) {

const Header = styled.h4 `
text-align:center;
color:#59687f;
font-weight:600;
font-size:14px;	
position:relative;
line-height: 1;
`
const Stats = styled.div `
border-right:1px solid #028090;
width: 33.33333%;
float:left;
text-align:center
padding: .25rem;
display:block;
color:#fff;
font-size:13px;
line-height: .5;
font-weight:700;
&:nth-child(3) {
border-right: none
}
`

const Wrapper = styled.div `

`
const StatsContainer = styled.div `
border-bottom:1px solid #028090;
background:#eee;
overflow:auto;
padding:15px 0;
font-size:16px;
color:#59687f;
font-weight:600;
border-radius: 0 0 5px 5px;

`
  return (

    <Container fluid={true}>
      <Row>
        <Col>
          <Wrapper>

            <HeaderBanner>
                {props.callsign} OVERVIEW
            </HeaderBanner>

            <StatsContainer>
              <Stats>
                <Header>Accountability</Header><br/>
                11 / 12</Stats>
              <Stats>
                <Header>Appointments</Header><br/>
                2</Stats>
              <Stats>
                <Header>Discrepancies</Header><br/>
                0</Stats>
            </StatsContainer>

            <StatsContainer>
              <Stats>
                <Header>Something</Header><br/>
                Interesting</Stats>
              <Stats>
                <Header>Else</Header><br/>
                Would be</Stats>
              <Stats>
                <Header>Here</Header><br/>
                0</Stats>
            </StatsContainer>

            <StatsContainer>
              <Stats>
                <Badge onClick={props.onClick} color="secondary">View T/O</Badge>
              </Stats>
              <Stats>
                <Badge onClick={props.toggleAdd} color="secondary">Add</Badge>/<Badge onClick={props.toggleAdd} color="secondary">Remove</Badge>
              </Stats>
              <Stats></Stats>
            </StatsContainer>

          </Wrapper>
        </Col>
      </Row>
    </Container>

  )
}

export default SquadOverviewCard
