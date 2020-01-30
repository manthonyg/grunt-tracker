import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDropdownToggle = styled(DropdownToggle)`
  background-color: #505160 !important;
  border: 2px solid #aebd38 !important;
  color: #fff !important;
`;
const ResultsWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
`;
function SearchResults({ isOpen, toggle, filteredMarines, handleClick }) {
  return (
    <ResultsWrapper>
      <Dropdown isOpen={isOpen} toggle={toggle}>
        {!!filteredMarines && (
          <StyledDropdownToggle caret>
            {filteredMarines.length}{" "}
            {filteredMarines.length === 1 ? "Result" : "Results"}
          </StyledDropdownToggle>
        )}
        <DropdownMenu>
          {filteredMarines.length &&
            filteredMarines.map(marine => (
              <DropdownItem>
                <Link onClick={handleClick} to={`/show-marine/${marine._id}`}>
                  {marine.rank} {marine.last}
                </Link>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
      :<></>
    </ResultsWrapper>
  );
}

export default SearchResults;
