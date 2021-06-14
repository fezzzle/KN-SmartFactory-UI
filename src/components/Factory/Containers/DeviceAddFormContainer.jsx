import { useState, useRef } from "react";
import { Card, CardBody, Button, CardTitle} from "reactstrap";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import DeviceAddForm from "../Components/DeviceAddForm";
import { useDispatch, useSelector } from "react-redux";
import { patchThingsArrayData } from "../../../store/actions/actions";
import store from "../../../store/store";

const DeviceAddFormContainer = (props) => {
  console.log("DeviceAddFormContainer props:", props);
  const dispatch = useDispatch();

  // const storeState = store.getState();
  const stateData = useSelector((state) => state.factory);

  const history = useHistory();
  // const temporaryThingSave = useRef();
  const temporaryDeviceSave = useRef();
  // const [temporaryDevice, setTemporaryDevice] = useState([]);
  // const [isSavedButtonState, setIsSavedButtonState] = useState(false);
  // const [addDeviceButtonState, setAddDeviceButtonState] = useState(true);
  // const [canCloseWithoutSaving, setCanCloseWithoutSaving] = useState(false);
  console.log("temporaryDeviceSave:", temporaryDeviceSave);

  const updateThingsData = () => {
    const getFactoryBeingUpdated = stateData.filter(
      (factory) => String(factory.id) === String(props.location.state.factoryId)
    );
    const getPlineIndex = getFactoryBeingUpdated[0].production_line.findIndex(
      (line) => String(line.id) === String(props.location.state.pLine)
    );
    const getThingIndex = getFactoryBeingUpdated[0].production_line[
      getPlineIndex
    ].thing.findIndex(
      (thing) => String(thing.uuid) === String(props.match.params.id)
    );
    const newDevice = temporaryDeviceSave.current;
    getFactoryBeingUpdated[0].production_line[getPlineIndex].thing[getThingIndex].device.push(newDevice)
    dispatch(
      patchThingsArrayData(
        getFactoryBeingUpdated[0].id,
        getFactoryBeingUpdated[0]
      )
    );
  };

  // const removeTemporaryDevice = () => {
  //   setTemporaryDevice([]);
  // };

  // const addDevice = (values) => {
  //   if (temporaryThingSave.current !== undefined) {
  //     setAddDeviceButtonState(!addDeviceButtonState);
  //     setIsSavedButtonState(true);
  //   }
  // };

  // const addDeviceToThing = (data) => {
  //   temporaryThingAndDeviceSave.current = temporaryThingSave.current;
  //   temporaryThingAndDeviceSave.current.device.push(data);

  //   mergeProductionLineAndThing(temporaryThingAndDeviceSave.current);
  //   setCanCloseWithoutSaving(true);
  // };

  // const mergeProductionLineAndThing = (data) => {
  //   const productionLine = history.location.state;
  //   editFactory();
  //   productionLine.production_line[0].thing.push(data);
  // };

  const addDevice = (values) => {
    console.log('values:', values)
    let data = {
      SERIAL_NUMBER: values.SERIAL_NUMBER,
      name: values.name,
      image: values.image,
      model: values.model,
      status: values.status,
      alerts_messages: values.alerts_messages,
    };
    temporaryDeviceSave.current = data;
    updateThingsData();
    // if (data.name !== undefined || data.SERIAL_NUMBER !== undefined) {
    // addDeviceToThing(data);
    // setIsSavedButtonState(true);
    // }
  };

  return (
    <div className="content">
      <Card>
        <CardBody>
          <CardTitle><h3>Add a new device</h3></CardTitle>
          <DeviceAddForm
            onSubmit={(values, formikHelpers) => {
              try {
                // formikHelpers.setSubmitting(true);
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
        </CardBody>
      </Card>
    </div>
  );
};

export default DeviceAddFormContainer;
