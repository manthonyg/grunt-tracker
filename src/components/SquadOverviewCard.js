import React from 'react';
import styled from 'styled-components'
import {Badge, Container, Row, Col} from 'reactstrap';

function SquadOverviewCard(props) {

  const Header = styled.h4 `
text-align:center;
color:#59687f;
font-weight:600;
font-size:14px;	
position:relative;
line-height: 1;
`
  const Dates = styled.div `
border:1px solid #ebeff2;
border-radius:5px;
padding:20px 0px;
margin:10px 20px;
font-size:16px;
color:#5aadef;
font-weight:600;	
overflow:auto;
`
  const EndsHeader = styled.h4 `
font-size: 32px;
font-weight: 600;
`
  const Stats = styled.div `
border-right:1px solid #aaa;
width: 33.33333%;
float:left;
text-align:center
padding: .25rem;
display:block;
color:#adb8c2;
font-size:13px;
line-height: .5;
font-weight:700;
&:nth-child(3) {
border-right: none
}
`

  const Ends = styled.div `
text-align: center;
float: center;

`

  const Wrapper = styled.div `

`
  const StatsContainer = styled.div `
border-top:1px solid #ebeff2;
background:#f7f8fa;
overflow:auto;
padding:15px 0;
font-size:16px;
color:#59687f;
font-weight:600;
border-radius: 0 0 5px 5px;
`
//   const Footer = styled.div `
// text-align: right;
// position: relative;
// margin: 20px 5px;
// padding: 10px 25px;
// background-color: #DADADA;
// color: #666;
// margin: 10px 2px;
// text-transform: uppercase;
// font-weight: bold;
// text-decoration: none;
// border-radius: 3px;
// `

  return (

    <Container fluid={true}>
      <Row>
        <Col>
          <Wrapper>
            <Dates>
              <Ends>
                <EndsHeader>{props.callsign}
                  OVERVIEW</EndsHeader>
              </Ends>
            </Dates>

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
              <Stats>
                
              </Stats>
            </StatsContainer>

          </Wrapper>
        </Col>
      </Row>
    </Container>

  )
}

export default SquadOverviewCard
