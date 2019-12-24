import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { Quote as QuoteType } from "../types";
import axios from 'axios'
const teamOneURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-one`
const teamTwoURL = `http://localhost:8082/api/squads/5e01981fcca0e036d25b9da1/team-two`



const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  );
}



function TeamListV2() {
  const QuoteList = React.memo(function QuoteList({ quotes }) {
    return !!quotes.length && quotes.map((quote: QuoteType, index: number) => (
      <Quote quote={quote} index={index} key={quote.id} />
    ));
  });
const [teamOne, setTeamOne] = useState([])
const initial = Array.from(teamOne, (v, k) => v).map(k => {
  const custom: Quote = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});
const [state, setState] = useState({ quotes: initial });
  useEffect(() => {
    axios 
    .get(teamOneURL)
    .then(res => {
      setTeamOne(res.data.team_one)
      console.log(res.data.team_one)
      setState({quotes: initial})
    })
}, [] )


  console.log(initial)

  

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TeamListV2
