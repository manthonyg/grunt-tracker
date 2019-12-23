import React, { useState, useRef } from "react";
import { render } from "react-dom";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);

const SortableList = SortableContainer(
  ({ numbers, letters, isDragging, setIsHoveringNumbers }) => (
    <div>
      <div
        onMouseEnter={() => setIsHoveringNumbers(true)}
        onMouseLeave={() => setIsHoveringNumbers(false)}
      >
        {numbers.map((value, index) => (
          <SortableItem
            key={`numbers-${index}`}
            index={index}
            value={value}
            collection="numbers"
          />
        ))}
      </div>
      <hr />
      {letters.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={numbers.length + index}
          value={value}
          collection={isDragging ? "letters" : "numbers"}
        />
      ))}
    </div>
  )
);

const TeamListV2 = props => {
  const [numbers, setNumbers] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6"
  ]);
  const [letters, setLetters] = useState(["A", "B", "C", "D", "E", "F"]);
  const [isHoveringNumbers, setIsHoveringNumbers] = useState(false);
  const [isHoveringLetters, setIsHoveringLetters] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const allItems = numbers.concat(letters);
    const currentItem = allItems[oldIndex];

    if (isHoveringNumbers) {
      if (numbers.includes(currentItem)) {
        setNumbers(arrayMove(numbers, oldIndex, newIndex));
      } else {
        numbers.splice(newIndex, 0, currentItem);
        letters.splice(letters.indexOf(currentItem), 1);
        setNumbers([...numbers]);
        setLetters([...letters]);
      }
    }
    setIsDragging(false);
  };

  const updateBeforeSortStart = () => {
    setIsDragging(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SortableList
        numbers={numbers}
        letters={letters}
        updateBeforeSortStart={updateBeforeSortStart}
        isDragging={isDragging}
        onSortEnd={onSortEnd}
        setIsHoveringNumbers={setIsHoveringNumbers}
        setIsHoveringLetters={setIsHoveringLetters}
      />
    </div>
  );
};

export default TeamListV2