import React from 'react';
import { Container } from '@material-ui/core';

function Sidebar(props){
    return(
    <Container>
        <h2>Summary</h2>
        <p>All lists: {props.numberOfLists}</p>
        <p>Completed lists: {props.numberOfCompletedLists}</p>
        <p>All items:{props.numberOfItems}</p>
        <p>Longest list:{props.longestList.name}</p>
    </Container>);
}    


export default Sidebar;