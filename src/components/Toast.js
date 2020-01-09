import React from 'react'
import styled, {keyframes, css} from 'styled-components'
import Flex from '../components/Flex'

function Toast(props) {

  const scale = keyframes `
  {
    0% {
              transform: scaleX(0);
      opacity: 1;
    }
    100% {
              transform: scaleX(1);
      opacity: 1;
    }
  }
  @keyframes scale-in-hor-center {
    0% {
              transform: scaleX(0);
      opacity: 1;
    }
    100% {
              transform: scaleX(1);
      opacity: 1;
    }
  }`

  const scaleEffect = css `
  animation: ${scale} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  `
  const ToastWrapper = styled.div `
  display: ${props => {
    if (props.visible) 
      return 'block'
    return 'none'}}
  width: 90%;
  z-index: 999999;
  height: 50px;
  margin: 0 auto;
  bottom: 100px;
  border: 3px solid #AEBD38; 
  ${scaleEffect}
  `

    return (

      <ToastWrapper visible={props.visible} 
                    message={props.message}>
        <Flex justifyBetween>
          {props.message}
          <i className='material-icons'>close</i>
        </Flex>
      </ToastWrapper>

    )
  }

  export default Toast