import { useState, useRef } from 'react'
import ThingAddForm from "../Components/ThingAddForm";
import { Card, CardBody, Button } from "reactstrap";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import DeviceAddForm from "../Components/DeviceAddForm";
import { useDispatch } from "react-redux";
import { updateFactoryData } from "../../../store/actions/actions";


const ThingAddFormContainer = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  const temporaryThingSave = useRef()
  const temporaryThingAndDeviceSave = useRef()
  const [temporaryDevice, setTemporaryDevice] = useState([])
  const [isSavedButtonState, setIsSavedButtonState] = useState(false)
  const [addDeviceButtonState, setAddDeviceButtonState] = useState(true)
  const [canCloseWithoutSaving, setCanCloseWithoutSaving] = useState(false)
  
  const removeTemporaryDevice = () => {
    setTemporaryDevice([])
  }

  const storeTemporaryThingData = (values) => {
    let data = {
      uuid: Math.random().toString(36).substr(2, 9),
      name: values.name,
      description: values.description,
      production_location: values.production_location,
      state: "ACTIVE",
      deviceGroup: {
        thing: values.device_group,
        description: values.device_group_description
      },
      device: []
    };
    temporaryThingSave.current = data
  };

  const addDevice = (values) => {
    storeTemporaryThingData(values);
    if (temporaryThingSave.current !== undefined) {
      setAddDeviceButtonState(!addDeviceButtonState);
      setIsSavedButtonState(true)
    }
  };

  const addDeviceToThing = (data) => {
    temporaryThingAndDeviceSave.current = temporaryThingSave.current;
    temporaryThingAndDeviceSave.current.device.push(data);

    mergeProductionLineAndThing(temporaryThingAndDeviceSave.current)
    setCanCloseWithoutSaving(true);
  }

  const mergeProductionLineAndThing = (data) => {
    const productionLine = history.location.state
    productionLine.production_line[0].thing.push(data)
    dispatch(updateFactoryData(productionLine));
  }

  const addTemporaryDevice = (values) => {
    let data = {
      SERIAL_NUMBER: values.SERIAL_NUMBER,
      name: values.name,
      image: values.image,
      model: values.model,
      status: values.status,
      alerts_messages: values.alerts_messages
    }
    setTemporaryDevice([data])
    if (data.name !== undefined || data.SERIAL_NUMBER !== undefined) {
      addDeviceToThing(data);
      setIsSavedButtonState(true)
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
                return Object.entries(errors).forEach(([field, error]) => {
                  formikHelpers.setFieldError(field, error[0]);
                });
              }
              // formikHelpers.setSubmitting(false);
            }}
            goBack={history.goBack}
          />
          <Button className="float-left mr-2" color="info" onClick={addTemporaryDevice} disabled={addDeviceButtonState}>
            Add a new device to a Thing
          </Button>
          <Button className="float-left mb-2" color="warning" disabled={isSavedButtonState} onClick={history.goBack}>
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

export default ThingAddFormContainer;
