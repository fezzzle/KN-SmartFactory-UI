import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardTitle } from "reactstrap";
import ProductionLineAddForm from "./ProductionLineAddForm";

import FactoryAddForm from "./FactoryAddForm";

const FactoryAddPage = () => {
  const [productionLine, setAddProductionLine] = useState([]);
  console.log("productionLine:", productionLine);
  const addNewProdctionLine = (data) => {
    console.log("addNewProdctionLine data: ", data);
    setAddProductionLine((prevArray) => [...prevArray, {line: "Production line", UIElementOpen: true}]);
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <FactoryAddForm />
          <Button
            className="float-left mr-2"
            color="primary"
            onClick={addNewProdctionLine}
          >
            Add a production line
          </Button>
          <Button
            className="float-left mr-2"
            color="primary"
            onClick={addNewProdctionLine}
          >
            Save Factory
          </Button>
        </CardBody>
      </Card>
      {productionLine.map((line, key) => {
        return (
          <Card key={key}>
            <CardBody>
              <ProductionLineAddForm name={line} />
              <Button
                className="float-left mr-2"
                color="primary"
              >
                  Add a thing to prodution line
              </Button>
              <Button
                className="float-left mr-2"
                color="primary"
              >
                Save Line and close
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default FactoryAddPage;
