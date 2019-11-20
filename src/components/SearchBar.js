import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';



const SearchContainer = styled.div`

  box-sizing: border-box;
  display: table;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 44px;
  transition: all .25s;
  ::after {
    box-sizing: border-box;
  }
  ::before {
    box-sizing: border-box;
  }
  :focus {
    background: #fbfbfb;
    color: #333333;
    outline: 0;
  }
  :hover {
    width: 200px;
  }
`

const SearchIcon = styled.div`
background-color: #eee;
border: 1px solid #eef;
display: table-cell;
height: 44px;
border-radius: 4px;
position: relative;
text-align: center;
vertical-align: middle;
width: 50px;
z-index: 2;
`

const SearchInputWrapper = styled.div`
position: absolute;
  left: 0;
  z-index: 1;
  
 
`

const SearchInput = styled.input`
border: 1px solid #cccccc;
height: 44px;
padding: 0px;
padding-left: 60px;
width: 200px;
-webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  :focus {
    padding-left: 60px;
    padding-right: 10px;
    width: 200px;
    }
  }


    
}
`

function SearchBar() {
    return (
        
    <SearchContainer>
        <SearchIcon><i className='fa fa-search'></i></SearchIcon>
        <SearchInputWrapper>
        <SearchInput type='search' label='Search Marine' placeholder='Search Marine'/>
        </SearchInputWrapper>
    </SearchContainer>

        
    )
}

export default SearchBar