import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ResultsWrapper= styled.div`
position: absolute;
top: 0px;
left: 0px;
`
function SearchResults(props) {

    return (
        
        
        <ResultsWrapper>
            <Dropdown isOpen={props.isOpen} toggle={props.toggle}>
              <DropdownToggle caret>
                {props.filteredMarines.length} {props.filteredMarines.length === 1 ? 'Result' : 'Results'}
              </DropdownToggle>
              <DropdownMenu>
                {props.filteredMarines.map(marine =>
                 <DropdownItem>
                    <Link onClick={props.handleClick} to={`/show-marine/${marine._id}`}>{marine.last}</Link>
                  </DropdownItem>)}
              </DropdownMenu>
            </Dropdown>
        
               :
            <></>
        </ResultsWrapper>
        
          
          
    )
}

export default SearchResults