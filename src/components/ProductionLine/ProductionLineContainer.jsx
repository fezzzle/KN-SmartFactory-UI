import { useState, useCallback } from "react";
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";


const ProductionLineContainer = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);

  // const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(true);

  // const handleSnapToGridAfterDropChange = useCallback(() => {
  //   setSnapToGridAfterDrop(!snapToGridAfterDrop);
  // }, [snapToGridAfterDrop]);

  // const handleSnapToGridWhileDraggingChange = useCallback(() => {
  //   setSnapToGridWhileDragging(!snapToGridWhileDragging);
  // }, [snapToGridWhileDragging]);

  return (
    <div>
      {/* <Bin snapToGrid={snapToGridAfterDrop} /> */}
      <Container snapToGrid={snapToGridAfterDrop} />
      <CustomDragLayer /> 
      {/* <CustomDragLayer /> */}
      {/* <p>
        <label htmlFor="snapToGridWhileDragging">
          <input
            id="snapToGridWhileDragging"
            type="checkbox"
            checked={snapToGridWhileDragging}
            onChange={handleSnapToGridWhileDraggingChange}
          />
          <small>Snap to grid while dragging</small>
        </label>
        <br />
        <label htmlFor="snapToGridAfterDrop">
          <input
            id="snapToGridAfterDrop"
            type="checkbox"
            checked={snapToGridAfterDrop}
            onChange={handleSnapToGridAfterDropChange}
          />
          <small>Snap to grid after drop</small>
        </label>
      </p> */}
    </div>
  );
};
export default ProductionLineContainer;
