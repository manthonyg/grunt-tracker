import React from 'react'
import {Table} from 'reactstrap'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
function ShowMarineOverview({marines}) {

const StyledLink = styled(Link)`
color: #68829e;
`
  return (

    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Rank</th>
          <th>Last</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        {marines.map((marine, i) => <tr>
          <th scope="row"> 
        <StyledLink key={`${marine._id}`} to={`/show-marine/${marine._id}`}>{i + 1} 
          <i class="material-icons">open_in_browser</i>
          </StyledLink>
          </th>
          <td>{marine.rank}</td>
          <td>{marine.last}</td>
          <td>{marine.edipi}</td>
        </tr>)}

      </tbody>
    </Table>
  )
}

export default ShowMarineOverview