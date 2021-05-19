import { useState, useCallback, useMemo, memo } from "react";
import { useDrag } from "react-dnd";

const style = {
  border: "1px dashed gray",
    // padding: "0.5rem",
  //   margin: "0.5rem",
  padding: 0,
  margin: 0,
};
export const SourceBox = memo(function SourceBox({ children }) {
  const [forbidDrag, setForbidDrag] = useState(true);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "none",
      canDrag: !forbidDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag]
  );

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag);
  }, [forbidDrag, setForbidDrag]);

  const containerStyle = useMemo(
    () => ({
      ...style,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? "default" : "move",
    }),
    [isDragging, forbidDrag]
  );
  return (
    <div ref={drag} style={containerStyle} role="SourceBox">
      <small>Forbid drag</small>
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <input
        type="button"
        value="remove"
        // onClick={removeItem}
      />
      {children}
    </div>
  );
});
