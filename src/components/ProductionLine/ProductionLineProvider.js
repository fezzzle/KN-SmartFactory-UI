// import { render } from 'react-dom'
import ProductionLineContainer from "./ProductionLineContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ProductionLineProvider = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ProductionLineContainer />
    </DndProvider>
  );
};

export default ProductionLineProvider;
