import React from 'react'
import {Badge} from 'reactstrap'
import Flex from '../components/Flex'

function FormNavigation(props) {
    return (
        <Flex noWrap alignCenter justifyAround>
            <Badge color={props.activeBadge}>Basic</Badge>
            <Badge color={props.activeBadge}>Unit</Badge>
            <Badge color={props.activeBadge}>Weapons</Badge>
            <Badge color={props.activeBadge}>Gear</Badge>
            <Badge color={props.activeBadge}>Body</Badge>
        </Flex>
    )
}

export default FormNavigation