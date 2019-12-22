import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import Flex from '../components/Flex'
import {Link} from 'react-router-dom';

const SortableGifsContainer = sortableContainer(({ children }) => <ListGroup>{children}</ListGroup>);
const SortableGif = sortableElement(({ gif, marine }) => <Gif key={gif} marine={marine} gif={gif} />);

const Gif = ({ gif, marine }) =>  (
<ListGroupItem>
    {gif}
    <Flex justifyBetween alignCenter>
        <Link to={`/show-marine/${marine}`}>
            <i class="material-icons">visibility</i>
        </Link>
  </Flex>
</ListGroupItem>)

Gif.propTypes = {
  gif: PropTypes.string.isRequired,
};

function QuoteApp({squad_id}) {

  const [gifs, setGifs] = useState([]);
  const [newGifs, setNewGifs] = useState([]);
console.log(gifs)
console.log(newGifs)
  useEffect(() => {
    axios 
    .get(`http://localhost:8082/api/marines/`)
    .then(res => setGifs(res.data))
    console.log(gifs)
    return axios
    .get(`http://localhost:8082/api/marines/`)
    .then(res => setNewGifs(res.data.map(m => m.blood_type)))
}, [] )


 
  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    switch (collection) {
      case 'gifs':
        setGifs(arrayMove(gifs, oldIndex, newIndex))
        break;
      case 'newGifs':
        setNewGifs(arrayMove(newGifs, oldIndex, newIndex))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    axios 
    .put(`http://localhost:8082/api/squads/${squad_id}/team`, gifs)
    .then(res => console.log(res))
 
}, [onSortEnd] )


  return (

    <div className="App">
    <ListGroupItem color='secondary'>Team 1</ListGroupItem>
      <SortableGifsContainer axis="y" onSortEnd={onSortEnd} pressDelay='100' onSortStart={(_, event) => event.preventDefault()}>
        {gifs.map((gif, i) =>
        <SortableGif
            index={i}
            key={gif._id}
            name='team_one' 
            gif={gif.last}
            marine={gif._id}
            collection="gifs"
            />
        )}
      </SortableGifsContainer>
     

 
    <ListGroupItem color='secondary'>Team 2</ListGroupItem>
      <SortableGifsContainer axis="y" onSortEnd={onSortEnd} onSortStart={(_, event) => event.preventDefault()} >
        {newGifs.map((gif, i) => 
        <SortableGif 
            index={i} 
            key={gif} 
            name='team_two' 
            gif={gif} 
            collection="newGifs" 
            />
        )}
      </SortableGifsContainer>
   
    </div>
  );
}

export default QuoteApp

