import { useDragLayer } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { BoxDragPreview } from "./BoxDragPreview";
import { snapToGrid } from "./snapToGrid";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  // backgroundColor: "red"
};

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  let { x, y } = currentOffset;
  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y;
    [x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }
  const transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

export const CustomDragLayer = (props) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => (
    {
    item: monitor.getItem(),
    // item: {"title": "Drag me in place"},
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview title={item.title} />;
      case ItemTypes.SELECTABLEBOX:
        return <BoxDragPreview title={item.title} />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }

  // const throttleRender = throttle(() => renderItem(), 5, { leading: false })

  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  );
};
