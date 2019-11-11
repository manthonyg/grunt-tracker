import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

const Break = styled.hr`
width: 100vw;
color: #000;
border: .5px solid black;
`;

function LineBreak() {
    return (
    <Break></Break>
    )
}

export default LineBreak