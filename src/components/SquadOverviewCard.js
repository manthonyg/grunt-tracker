import React from 'react';
import styled from 'styled-components'
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonDropdown,
  Dropdown,
  DropdownToggle
} from 'reactstrap';
function SquadOverviewCard(props) {

  const Tile = styled.div `
width: 100%;
background:#fff;
border-radius:5px;
box-shadow:0px 2px 3px -1px rgba(151, 171, 187, 0.7);
float:left;
transform-style: preserve-3d;
margin: 10px 5px;
`
  const Header = styled.div `
border-bottom:1px solid #ebeff2;
padding:19px 0;
text-align:center;
color:#59687f;
font-size:600;
font-size:19px;	
position:relative;
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
  const Stats = styled.div `
border-top:1px solid #ebeff2;
background:#f7f8fa;
overflow:auto;
padding:15px 0;
font-size:16px;
color:#59687f;
font-weight:600;
border-radius: 0 0 5px 5px;
`
  const Footer = styled.div `
text-align: right;
position: relative;
margin: 20px 5px;
`

  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-12">

          <div className="wrapper">
            <div className="dates">

              <div className="ends">
                <strong>
                  <h3>{props.callsign}</h3>
                </strong>

              </div>
              <div className="starts">
                <strong>ACCOUNTABILITY</strong>
                11/12
              </div>
            </div>

            <div className="stats">

              <div>
                <strong>TOTAL MARINES</strong>
                12
              </div>

              <div>
                <strong>APPOINTMENTS</strong>
                2
              </div>

              <div>
                <strong>LAST UPDATED</strong>
                XX/XX 00:00
              </div>

            </div>

            <div className="stats">

              <div>
                <strong>PFT AVG</strong>
                300
              </div>

              <div>
                <strong>CFT AVG</strong>
                300
              </div>

              <div>
                <strong>TOTAL AVG</strong>
                300
              </div>

            </div>

            <div className="stats">

              <div>
                <Badge onClick={props.onClick} color="secondary">View T/O</Badge>
              </div>

              <div>
                <Badge onClick={props.toggleAdd} color="secondary">Add</Badge>/<Badge onClick={props.toggleAdd} color="secondary">Remove</Badge>
              </div>

              <div>
                <Badge onClick={props.toggleAdd} color="secondary">Zap Generator</Badge>
              </div>

            </div>

            <div className="footer"></div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SquadOverviewCard
