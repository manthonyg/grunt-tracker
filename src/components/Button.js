import React from 'react'
import styled, {css} from 'styled-components'
import Loader from './Loader'

const StyledButton = styled.button `
    border-radius: 3px;
    border: 4px solid #AEBD38;
    background-color: #fff;
    margin: .25rem .25rem .25rem 0;
    color: #000;
    font-size: ${props => {
  if (props.big) return '20px'
  return '16px'}};
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #AEBD38;
      color: #fff;
    }
    `
    
  

    const Button = ({
      secondary,
      big,
      inverse,
      loading,
      children,
      ...props
    }) => {
      return (
        <StyledButton secondary={secondary} big={big} inverse={inverse} {...props}>
          {loading
            ? <Loader small white/>
            : children}
        </StyledButton>
      )
    }

    export default Button