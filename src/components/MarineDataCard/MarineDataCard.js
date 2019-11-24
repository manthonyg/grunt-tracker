import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Button, Badge} from 'reactstrap';



const MarineDataCard = ({
  id,
  onClick,
  first,
  last,
  unit,
  company,
  squad,
  team,
  accounted
}) => {
  return (
    <Table dark striped>
      <thead>
        <tr>
          <th>
            <i className="fa fa-remove" style={{color:'red', position:'relative', top:'0px'}} onClick={onClick} id={id}></i>
          </th>
          <th>{first}, {last}
            ({unit}/{company}/{squad}/{team})</th>
          <th>
            <Link to={`/show-marine/${id}`}>
              <Button color= noMargin>View</Button>
            </Link>
          </th>
        </tr>

        <tr>
          <th><Badge><i className='fa fa-calendar' style={{color:'white'}}/></Badge></th>
          <th><Badge><i className='fa fa-user' style={{color:'white'}}/></Badge></th>
          <th><Badge><i className='fa fa-check' style={{color:'white'}}/></Badge></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>None</td>
          <td>{accounted}
            <div>Accountability</div>
            
          </td>
          <td>A string</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default MarineDataCard;