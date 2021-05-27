import { useState, useRef } from 'react'
import ThingAddForm from "./ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import DeviceAddForm from "./DeviceAddForm";

const ThingAddFormContainer = () => {

  const temporaryThingSave = useRef()
  const [temporaryDevice, setTemporaryDevice] = useState([])
  const [isSavedButtonState, setIsSavedButtonState] = useState(true)
  const [addDeviceButtonState, setAddDeviceButtonState] = useState(true)
  console.log('temporaryThingSave.current:', temporaryThingSave.current)
  console.log('temporaryDevice:', temporaryDevice)

  const removeTemporaryDevice = () => {
    setTemporaryDevice([])
  }

  const storeTemporaryThingData = (values) => {
    let data = {
      uuid: Math.random().toString(36).substr(2, 9),
      name: values.name,
      description: values.description,
      production_loction: values.production_loction,
      device_group: values.device_group,
      device: values.device
    };
    temporaryThingSave.current = data
    console.log('temporaryThingSave.current:', temporaryThingSave.current)
  };

  const addDevice = (values) => {
    storeTemporaryThingData(values);
    if (temporaryThingSave.current !== undefined) {
      setAddDeviceButtonState(!addDeviceButtonState);
      setIsSavedButtonState(true)
    }
  };

  const addTemporaryDevice = (values) => {
    console.log('hello')
    setIsSavedButtonState(true)
    let data = {
      SERIAL_NUMBER: values.SERIAL_NUMBER,
      name: values.name,
      image: values.image,
      model: values.model,
      status: values.status,
      alerts_messages: values.alerts_messages
    }
    console.log("data is:", data)
    setTemporaryDevice([data])
    if (data.name !== undefined || data.SERIAL_NUMBER !== undefined) {
      // addProductionLineToFactory(data);
      setIsSavedButtonState(false)
    }
  }

  return (
    <div className="content">
      <Card>
        <CardBody>
          <ThingAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                formikHelpers.setSubmitting(true);
                addDevice(values)
              } catch (errors) {
                console.log('errors', errors)
                return Object.entries(errors).forEach(([field, error]) => {
                  console.log('field', field)
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
          />
          <Button className="float-left mr-2" color="info" onClick={addTemporaryDevice} disabled={addDeviceButtonState}>
            Add a new device to a Thing
          </Button>
          <Button className="float-left mb-2" color="warning">
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
              />
              {/* <ProductionLineAddForm name={line} /> */}
              <Button
                className="float-left mr-2"
                color="warning"
                onClick={removeTemporaryDevice}
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

export default ThingAddFormContainer;
