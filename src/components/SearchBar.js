import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';


const Form = styled.form`
text-align: center;
`
const Input = styled.input`
  border: 1px solid #eee;
  border-radius: 3 px;
  padding: 5px;
  margin: 5px;
  width: 60vw;
  background-color: #eee;
  font-family: 'Roboto', san-serif;
  font-size: 14px;
`;

function SearchBar(props) {
    return (
        <Form onSubmit={props.onSubmit}>
            <button type="submit"><i className='fa fa-search'/></button>
            <Input {...props}></Input>
        </Form>
    )
}

export default SearchBar