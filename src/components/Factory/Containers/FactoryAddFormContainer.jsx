import React, { useState, useRef } from "react";
import { Card, CardBody, Button, CardTitle } from "reactstrap";
import ProductionLineAddForm from "../Components/ProductionLineAddForm";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import FactoryAddForm from "../Components/FactoryAddForm";
import { addFactoryData, updateFactoryData } from "../../../store/actions/actions";

const FactoryAddFormContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const temporaryFactorySave = useRef();
  const temporaryFactoryAndProductionLineSave = useRef();
  const [temporaryProductionLine, setTemporaryProductionLine] = useState([]);
  const [addProductionButtonState, setAddProductionButtonState] =
    useState(true);
  const [canAddAThingState, setCanAddAThingState] = useState(true);
  const [canCloseWithoutSaving, setCanCloseWithoutSaving] = useState(false);

  const addTemporaryProductionLine = (values) => {
    let data = {
      id: Math.random().toString(36).substr(2, 9),
      name: values.name,
      line_number: values.line_number,
      thing: [],
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
    dispatch(updateFactoryData(temporaryFactoryAndProductionLineSave.current));
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
      dispatch(addFactoryData(temporaryFactorySave.current));
    }
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle>
            <h1 className="mt-4">Add a new factory</h1>
          </CardTitle>
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
            goBack={history.goBack}
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
                goBack={history.goBack}
              />
              {/* <ProductionLineAddForm name={line} /> */}
              <Button
                className="float-left mr-2"
                color="info"
                tag={RRNavLink}
                disabled={canAddAThingState}
                to={{
                  pathname: "/factories/add_factory/add_thing",
                  state: temporaryFactoryAndProductionLineSave.current,
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
