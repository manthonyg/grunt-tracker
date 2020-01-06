import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const animatedCss = css`
    opacity: 1;
    transform: translateY(0);
`

const primaryCss = css`
    background-color: #fff;
    color: #000;
    border: 2px solid #AEBD38;
`

const StyledCard = styled.div`
    width: ${props => (props.big ? '450px' : '300px')};
    padding: 15px;
    opacity: 0;
    transform: translateY(50px);
    transition: 500ms all ease-in-out;
    margin: ${props => (props.noMargin ? 0 : '15px')};
    ${props => props.animated && animatedCss}
    ${props => props.primary && primaryCss}
`
function Card(props) {

const [animated, setAnimated] = useState(false)
const handleSetAnimated = () => setAnimated(!animated)

useEffect(() => {
setTimeout(() => {
    handleSetAnimated()
}, props.delay)
}, [] )

    return (

<StyledCard animated={animated}
            big={props.big}
            noAnimation={props.noAnimation}
            noMargin={props.noMargin}
            delay={props.delay}
            primary={props.primary}>
{props.children}
</StyledCard>
            
    )
}

export default Card