import React from 'react'
import styled, { css } from 'styled-components'
import Loader from './Loader'

const StyledButton = styled.button`
    border-radius: 3px;
    background-color: ${props => (props.secondary ? '#ccc' : props.none? 'none' : '#DEDEDE')};
    color: #000;
    padding: 6px 40px;
    font-size: ${props => {
        if (props.big) return '20px'
        return '16px'
    }};
    outline: none;
    border: none;
    cursor: pointer;
    margin: 15px;
    border: 1px solid ${props => (props.secondary ? '#ccc' : props.none? 'none' : '#BBBBBB')};
    ${props => {
        return (
            props.inverse &&
            css`
                background-color: #fff;
                color: #000;
            `
        )
    }}
`

const Button = ({ secondary, big, inverse, loading, children, ...props }) => {
    return (
        <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
            {loading ? <Loader small white /> : children}
        </StyledButton>
    )
}

export default Button