import { useState, useRef } from "react";
import ThingAddForm from "../Components/ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import DeviceAddForm from "../Components/DeviceAddForm";
import { useDispatch } from "react-redux";
import { updateThingArrayData } from "../../../store/actions/actions";
import store from "../../../store/store";

const DeviceAddFormContainer = (props) => {
  console.log("DeviceAddFormContainer props:", props);
  const dispatch = useDispatch();

  const storeState = store.getState();

  const history = useHistory();
  const temporaryThingSave = useRef();
  const temporaryThingAndDeviceSave = useRef();
  const [temporaryDevice, setTemporaryDevice] = useState([]);
  const [isSavedButtonState, setIsSavedButtonState] = useState(false);
  const [addDeviceButtonState, setAddDeviceButtonState] = useState(true);
  const [canCloseWithoutSaving, setCanCloseWithoutSaving] = useState(false);
  console.log("temporaryThingSave:", temporaryThingSave);

  const editFactory = () => {
    const getFactoryBeingUpdated = storeState.factory.filter(
      (factory) => String(factory.id) === String(props.location.state.factoryId)
    );
    const plineIndex = getFactoryBeingUpdated[0].production_line.findIndex(
      (line) => String(line.id) === String(props.match.params.id)
    );
    const newThing = temporaryThingAndDeviceSave.current;
    getFactoryBeingUpdated[0].production_line[plineIndex].thing.push(newThing);
    dispatch(
      updateThingArrayData(
        getFactoryBeingUpdated[0].id,
        getFactoryBeingUpdated[0]
      )
    );
  };

  const removeTemporaryDevice = () => {
    setTemporaryDevice([]);
  };

  const addDevice = (values) => {
    if (temporaryThingSave.current !== undefined) {
      setAddDeviceButtonState(!addDeviceButtonState);
      setIsSavedButtonState(true);
    }
  };

  const addDeviceToThing = (data) => {
    temporaryThingAndDeviceSave.current = temporaryThingSave.current;
    temporaryThingAndDeviceSave.current.device.push(data);

    mergeProductionLineAndThing(temporaryThingAndDeviceSave.current);
    setCanCloseWithoutSaving(true);
  };

  const mergeProductionLineAndThing = (data) => {
    const productionLine = history.location.state;
    editFactory();
    productionLine.production_line[0].thing.push(data);
  };

  const addTemporaryDevice = (values) => {
    let data = {
      SERIAL_NUMBER: values.SERIAL_NUMBER,
      name: values.name,
      image: values.image,
      model: values.model,
      status: values.status,
      alerts_messages: values.alerts_messages,
    };
    setTemporaryDevice([data]);
    if (data.name !== undefined || data.SERIAL_NUMBER !== undefined) {
      addDeviceToThing(data);
      setIsSavedButtonState(true);
    }
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <ThingAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                formikHelpers.setSubmitting(true);
                addDevice(values);
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
            onClick={addTemporaryDevice}
            disabled={addDeviceButtonState}
          >
            Add a new device to a Thing
          </Button>
          <Button
            className="float-left mb-2"
            color="warning"
            disabled={isSavedButtonState}
            onClick={history.goBack}
          >
            Go back without saving
          </Button>
        </CardBody>
      </Card>
      {temporaryDevice.map((_, key) => {
        return (
          <Card key={key}>
            <CardBody>
              <DeviceAddForm
                onSubmit={(values, formikHelpers) => {
                  try {
                    formikHelpers.setSubmitting(true);
                    addTemporaryDevice(values);
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
                color="warning"
                onClick={removeTemporaryDevice}
                disabled={canCloseWithoutSaving}
              >
                Remove device and don't save
              </Button>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default DeviceAddFormContainer;
