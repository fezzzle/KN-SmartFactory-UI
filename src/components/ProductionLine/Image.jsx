import { memo } from "react";
import imageTypes from './ImageTypes'

const styles = {
  height: "calc(8rem - 2px)",
  width: "calc(8rem - 2px)",
  border: "1px solid black",
  padding: "0.5rem 1rem",
  cursor: "move",
};

const Imagestyles = {
    paddingTop: "2rem",
    height: "4rem",
    width: "7rem",
    cursor: "move",
  };

export const Image = memo(function Box({ type, title, yellow, preview, children }) {
  const backgroundColor = yellow ? "yellow" : "white";


  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? "BoxPreview" : "Box"}
    >
      {/* {title}
      {children} */}
      <img style={{...Imagestyles }} src={imageTypes[type]} alt={imageTypes[type]}/>
    </div>
  );
});
