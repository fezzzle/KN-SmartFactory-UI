import { memo } from "react";

const styles = {
  height: "calc(8rem - 2px)",
  width: "calc(8em - 2px)",
  border: "1px solid black",
  padding: "0.5rem 1rem",
  cursor: "move",
};

export const Box = memo(function Box({ title, yellow, preview, children }) {
  const backgroundColor = yellow ? "yellow" : "white";
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {title}
      {children}
    </div>
  );
});
