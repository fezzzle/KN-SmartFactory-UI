import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import ProductionLineAddForm from "./ProductionLineAddForm";
import { NavLink as RRNavLink } from "react-router-dom";
import { useDispatch } from "react-redux"

import FactoryAddForm from "./FactoryAddForm";
import { addFactoryData } from "../../store/actions/"

const FactoryAddPage = () => {
  const dispatch = useDispatch();
  const [productionLine, setAddProductionLine] = useState([]);

  console.log("productionLine:", productionLine);

  const addNewProdctionLine = (data) => {
    console.log("addNewProdctionLine data: ", data);
    setAddProductionLine((prevArray) => [
      ...prevArray,
      { line: "Production line", UIElementOpen: true },
    ]);
  };

  const addFactory = (values) => {
    console.log("values inside addFactory:", values);
    let respone = {
      factory_id: Math.random().toString(36).substr(2, 9),
      time_added: Date.UTC(),
      factory_location: {
        country: values.country,
        city: values.city,
        name: values.name
      },
      production_line: null
    }
    dispatch(addFactoryData(respone))
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <FactoryAddForm
            onSubmit={async (values, formikHelpers) => {
              try {
                await addFactory(values);
              } catch (errors) {
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              formikHelpers.setSubmitting(false);
            }}
          />
          <Button
            className="float-left mr-2"
            color="info"
            onClick={addNewProdctionLine}
          >
            Add a production line
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
                color="info"
                tag={RRNavLink}
                to="/factories/add_factory/add_thing"
              >
                Save and add a thing to prodution line
              </Button>
              <Button className="float-left mr-2" color="primary">
                Save production line and close
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default FactoryAddPage;
