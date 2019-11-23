import React from 'react';
import Button from '../../components/Button'
import { Link } from 'react-router-dom';

const MarineDataCard = ({id, onClick, first, last, unit, company, squad, team, accounted}) => {
  return (
    <table>
    <thead>
   <tr>
     <th><i className="fa fa-remove" onClick={onClick} id={id}></i></th>
     <th>{first}, {last} ({unit}/{company}/{squad}/{team})</th>
     <th><Link to={`/show-marine/${id}`}><Button noMargin>View Marine</Button></Link></th>
   </tr>

    <tr> 
        <th><i className='fa fa-calendar'/></th>
        <th><i className='fa fa-user'/></th>
        <th><i className='fa fa-check'/></th>
    </tr>
    </thead>

    <tbody>
      <tr>
      <td>None</td>
<td>{accounted}
<div>Accounted for</div>
<div>Unaccounted</div>
</td>
      <td>A string</td>
      </tr>
    </tbody>
</table>
  );
};

export default MarineDataCard;