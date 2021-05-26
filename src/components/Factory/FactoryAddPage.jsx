import React, { useState, useEffect, useRef } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import ProductionLineAddForm from "./ProductionLineAddForm";
import { NavLink as RRNavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

import FactoryAddForm from "./FactoryAddForm";
import { addFactoryData } from "../../store/actions/";

const FactoryAddPage = () => {
  const dispatch = useDispatch();
  const [temporaryProductionLine, setTemporaryProductionLine] = useState([]);
  const temporaryFactorySave = useRef();
  const temporaryFactoryAndProductionLineSave = useRef();
  const [addProductionButtonState, setAddProductionButtonState] =
    useState(true);

  const addTemporaryProductionLine = (values) => {
    let data = {
      name: values.name,
      line_number: values.line_number,
    };
    setTemporaryProductionLine([data]);
    if (data.name !== undefined || data.line_number !== undefined) {
      addProductionLineToFactory(data);
    }
  };

  const addProductionLineToFactory = (data) => {
    temporaryFactoryAndProductionLineSave.current =
      temporaryFactorySave.current;
    temporaryFactoryAndProductionLineSave.current.production_line.push(data);
    dispatch(addFactoryData(temporaryFactoryAndProductionLineSave.current));
  };

  const storeTemporaryFactoryData = (values) => {
    let data = {
      id: Math.random().toString(36).substr(2, 9),
      time_added: Date.now(),
      factory_location: {
        country: values.country,
        city: values.city,
        name: values.name,
      },
      production_line: [],
    };
    temporaryFactorySave.current = data;
  };

  const addFactory = (values) => {
    storeTemporaryFactoryData(values);
    if (temporaryFactorySave.current !== undefined) {
      setAddProductionButtonState(!addProductionButtonState);
    }
    // setTemporaryFactorySave(data)
    // dispatch(addFactoryData(response));
  };

  const formikOnSubmitDataAddFactory = async (values, formikHelpers) => {
    try {
      await addFactory(values);
    } catch (errors) {
      return Object.entries(errors).forEach(([field, error]) => {
        formikHelpers.setFieldError(field, error[0]);
      });
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <FactoryAddForm onSubmit={formikOnSubmitDataAddFactory} />
          <Button
            className="float-left mr-2"
            color="info"
            onClick={addTemporaryProductionLine}
            disabled={addProductionButtonState}
          >
            Add a production line
          </Button>
        </CardBody>
      </Card>
      {temporaryProductionLine.map((line, key) => {
        return (
          <Card key={key}>
            <CardBody>
              <ProductionLineAddForm
                onSubmit={(values, formikHelpers) => {
                  try {
                    console.log(
                      "values from productionLineAddForm are: ",
                      values
                    );
                    addTemporaryProductionLine(values);
                  } catch (errors) {
                    return Object.entries(errors).forEach(([field, error]) => {
                      formikHelpers.setFieldError(field, error[0]);
                    });
                  }
                  formikHelpers.setSubmitting(false);
                }}
              />
              {/* <ProductionLineAddForm name={line} /> */}
              <Button
                className="float-left mr-2"
                color="info"
                tag={RRNavLink}
                to="/factories/add_factory/add_thing"
              >
                Save production line and add a thing
              </Button>
              <Button
                className="float-left mr-2"
                color="primary"
                onClick={addProductionLineToFactory}
              >
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
