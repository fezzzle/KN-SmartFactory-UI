import React, { useState, useRef } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "reactstrap";
import ProductionLineAddForm from "./ProductionLineAddForm";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import FactoryAddForm from "./FactoryAddForm";
import { addFactoryData } from "../../store/actions";

const FactoryAddFormContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const temporaryFactorySave = useRef();
  const temporaryFactoryAndProductionLineSave = useRef();
  const [temporaryProductionLine, setTemporaryProductionLine] = useState([]);
  const [addProductionButtonState, setAddProductionButtonState] =
    useState(true);
  const [canAddAThingState, setCanAddAThingState] = useState(true);
  const [canCloseWithoutSaving, setCanCloseWithoutSaving] = useState(false);

  console.log("temporaryFactorySave:", temporaryFactorySave.current);
  console.log(
    "temporaryFactoryAndProductionLineSave.current:",
    temporaryFactoryAndProductionLineSave.current
  );

  const addTemporaryProductionLine = (values) => {
    let data = {
      name: values.name,
      line_number: values.line_number,
    };
    setTemporaryProductionLine([data]);
    if (data.name !== undefined || data.line_number !== undefined) {
      addProductionLineToFactory(data);
      setCanAddAThingState(false);
    }
  };

  const removeTemporaryProductionLine = () => {
    setTemporaryProductionLine([]);
  };

  const addProductionLineToFactory = (data) => {
    temporaryFactoryAndProductionLineSave.current =
      temporaryFactorySave.current;
    temporaryFactoryAndProductionLineSave.current.production_line.push(data);
    dispatch(addFactoryData(temporaryFactoryAndProductionLineSave.current));
    setCanCloseWithoutSaving(true);
  };

  const temporaryFactoryData = (values) => {
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
    temporaryFactoryData(values);
    if (temporaryFactorySave.current !== undefined) {
      setAddProductionButtonState(!addProductionButtonState);
    }
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <FactoryAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                formikHelpers.setSubmitting(true);
                addFactory(values);
              } catch (errors) {
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
          />
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
      {temporaryProductionLine.map((_, key) => {
        return (
          <Card key={key}>
            <CardBody>
              <ProductionLineAddForm
                onSubmit={(values, formikHelpers) => {
                  try {
                    formikHelpers.setSubmitting(true);
                    addTemporaryProductionLine(values);
                  } catch (errors) {
                    return Object.entries(errors).forEach(([field, error]) => {
                      formikHelpers.setFieldError(field, error[0]);
                    });
                  }
                  // formikHelpers.setSubmitting(false);
                }}
              />
              {/* <ProductionLineAddForm name={line} /> */}
              <Button
                className="float-left mr-2"
                color="info"
                tag={RRNavLink}
                disabled={canAddAThingState}
                to={{
                  pathname: "/factories/add_factory/add_thing",
                  state: {
                    id: temporaryFactoryAndProductionLineSave.current,
                  },
                }}
              >
                Add a thing
              </Button>
              <Button
                className="float-left mr-2"
                color="primary"
                onClick={removeTemporaryProductionLine}
                disabled={canCloseWithoutSaving}
              >
                Close without saving
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default FactoryAddFormContainer;
