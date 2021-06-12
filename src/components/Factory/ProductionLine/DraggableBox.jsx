import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { getEmptyImage } from "react-dnd-html5-backend";
import { Box } from "./Box";
import { Image } from "./Image";
import { SourceBox } from "./SourceBox";

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${Math.round(left)}px, ${Math.round(top)}px, 0)`;
  return {
    position: "absolute",
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
    float: "left",
  };
}
function isDraggingStyle(isDragging) {
  return {
    opacity: isDragging ? 0 : 1,
    // height: isDragging ? 0 : "",
    height: "8em",
    width: "8em"
  }
}

export const DraggableBox = memo(function DraggableBox({ item }) {
  const { id, title, left, top, type } = item;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title, type]
  );

  // loe lähemalt siit:  https://react-dnd.github.io/react-dnd/docs/api/drag-source-connector#options-for-dragsource
  // captureDraggingState on seotud IE-ga?
  // Kui getEmptyImaget ei kasuta, siis draggides on box duplikeeritud
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      {/* <Box title={title} preview={preview}>
        <div style={{ left: 0 }}>
          <SourceBox />
        </div>
      </Box> */}
      {/* <Image image={conveyor}/> */}
      <Image type={type}/>
    </div>
  );
});

export const SelectDraggableBox = memo(function SelectDraggableBox({ item }) {
  const { id, title, left, top } = item;

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.SELECTABLEBOX,
      item: item,
      collect: (monitor) =>
        ({
          isDragging: monitor.isDragging(),
        }),
    }),
    [id, left, top, title]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    // <div
    //   ref={drag}
    //   style={isDraggingStyle(isDragging)}
    //   // style={{height: "8em", width: "8em"}}
    //   role="DraggableBox"
    // >
    <>
      <Box title={title} preview={preview} />
      </>
    // </div>
  );
});
