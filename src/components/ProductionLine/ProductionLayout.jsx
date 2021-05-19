import React from "react";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { DraggableBox, SelectDraggableBox } from "./DraggableBox";
import { snapToGrid as doSnapToGrid } from "./snapToGrid";
import { Container, Row, Col } from "reactstrap";

// Kui tekib küsimus mis see on, siis vaata originaalset koodi
import update from "immutability-helper";

const draggableStyles = {
  marginTop: "6em",
  width: 1000,
  height: 800,
  border: "1px solid black",
  position: "relative",
  backgorundColor: "white",
  backgroundImage:
    "repeating-linear-gradient(0deg, transparent, transparent calc(16px - 1px), #000 calc(16px - 1px), #000 16px), repeating-linear-gradient(-90deg, white, white calc(16px - 1px), #000 calc(16px - 1px), #000 16px)",
};

const selectDraggableStyles = {
  marginTop: "6em",
  width: 1200,
  height: 350,
  border: "1px solid black",
};

export const ProductionLayout = ({ snapToGrid }) => {
  const [selectableBoxes, setSelectableBoxes] = useState([
    { id: 55390, top: 0, left: 0, title: "Machine 1", type: "machine_1" },
    { id: 4389590, top: 0, left: 160, title: "Machine 3", type: "machine_3" },
    { id: 438953, top: 0, left: 1000, title: "Machine 4", type: "machine_4" },
    { id: 43631, top: 0, left: 480, title: "Conveyor 1", type: "conveyor_1" },
    { id: 8657912, top: 0, left: 640, title: "Conveyor 2", type: "conveyor_2" },
    { id: 4908308, top: 0, left: 800, title: "Conveyor 3", type: "conveyor_3" },
    { id: 432, top: 0, left: 960, title: "Conveyor 3", type: "conveyor_3" },
    {
      id: 42343534,
      top: 160,
      left: 160,
      title: "Conveyor 3",
      type: "conveyor_3",
    },
    {
      id: 432432344232,
      top: 160,
      left: 0,
      title: "Forklift 1",
      type: "forklift_1",
    },
  ]);

  const [containerState, setContainerState] = useState([]);

  // moveBox is doing serveral things, need to refactor this
  // 1. Updating outside container state
  // 2. updating inside container movements
  const moveBox = useCallback(
    (id, left, top) => {
      let itemIndex = containerState.findIndex((item) => item.id === id);
      let selectableItemIndex = selectableBoxes.findIndex(
        (item) => item.id === id
      );

      if (selectableItemIndex !== -1) {
        setSelectableBoxes(
          update(selectableBoxes, { $splice: [[selectableItemIndex, 1]] })
        );
      } else if (itemIndex !== -1) {
        setContainerState(
          update(containerState, {
            [itemIndex]: {
              $merge: { left, top },
            },
          })
        );
      }
    },
    [containerState, selectableBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.BOX, ItemTypes.SELECTABLEBOX],
      drop(item, monitor) {
        let { x, y } = monitor.getSourceClientOffset();
        // console.log('item:', {...item, top: x, left: y})
        // If I want to drop outside box into container then update ContainerState and in moveBox function update outside container
        if (!containerState.includes(item)) {
          [x, y] = doSnapToGrid(x, y);
          setContainerState((prevState) => [
            ...prevState,
            { ...item, top: y, left: x },
          ]);
          moveBox(item.id, x, y);
          return;
        }
        const delta = monitor.getDifferenceFromInitialOffset();
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        // console.log('top:', top)
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  return (
    <>
      <div ref={drop} style={draggableStyles}>
        {containerState.map((item, index) => {
          return <DraggableBox item={item} key={index} />;
        })}
      </div>
      <Row>
        <Col style={selectDraggableStyles}>
          {selectableBoxes.map((item, index) => {
            return <SelectDraggableBox item={item} key={index} />;
          })}
        </Col>
      </Row>
    </>
  );
};
