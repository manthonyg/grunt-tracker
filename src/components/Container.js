import styled from 'styled-components'

const Container = styled.div`
    padding-left: ${props => {
        if (props.full) return 0
        return 'calc((100vw - 960px) / 2)'
    }};
    padding-right: ${props => {
        if (props.full) return 0
        return 'calc((100vw - 960px) / 2)'
    }};
    padding-top: ${props => {
        if (props.fullVertical) return 0
        if (props.small) return '15px'
        return '25px'
    }};
    padding-bottom: ${props => {
        if (props.fullVertical) return 0
        if (props.small) return '15px'
        return '40px'
    }};
    z-index: ${props => {
        if (props.zindex) return '10000'
        return '1'
    }};
    position: ${props => {
        if (props.absolute) return 'absolute'
        if (props.relative) return 'relative'
        return 'block'
    }};
    top: 0px;
    left: 0px;
   
`

export default Container
