import ProductionLineProvider from "../components/ProductionLine/ProductionLineProvider";
// import "./ProductionLine.css";
import { Container, Row, Col } from "reactstrap";


const ProductionLineView = () => {
  return (
    <Container>
      <ProductionLineProvider />
    </Container>
  );
};

export default ProductionLineView;
