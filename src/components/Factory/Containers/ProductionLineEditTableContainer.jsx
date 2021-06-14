import React, { useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import store from "../../../store/store";
import {
  patchDeviceArrayData,
  patchThingsArrayData,
} from "../../../store/actions/actions";
import { useDispatch } from "react-redux";

import ProductionLineEditTable from "../Components/ProductionLineEditTable";

const ProductionLineEditTableContainer = (props) => {
  const dispatch = useDispatch();
  // const storeState = store.getState();
  console.log("ProductionLineEditTableContainer props:", props);
  const history = useHistory();
  const [thingRowUuid, setThingRowUuid] = useState(null);
  const rowUuidRef = useRef(null);

  const setThingUuid = (value) => {
    rowUuidRef.current = value;
    setThingRowUuid(value);
  };

  const stateData = useSelector((state) => state.factory);
  const thingData = stateData
    .filter((factory) => String(factory.id) === props.location.state.factoryId)
    .map((item) =>
      item.production_line.filter(
        (thing) => String(thing.id) === props.match.params.id
      )
    )
    .flat();

  const deviceData = thingData[0].thing
    .filter((item) => item.uuid === thingRowUuid)
    .map((item) => item.device)
    .flat();
  const data = useMemo(() => thingData, [thingData]);
  const data2 = useMemo(() => deviceData, [deviceData]);

  const updateDeviceData = (value) => {
    const getFactoryBeingUpdated = stateData.filter(
      (factory) => String(factory.id) === String(props.location.state.factoryId)
    );
    const getPlineIndex = getFactoryBeingUpdated[0].production_line.findIndex(
      (line) => String(line.id) === String(props.match.params.id)
    );
    const getThingIndex = getFactoryBeingUpdated[0].production_line[
      getPlineIndex
    ].thing.findIndex(
      (thing) => String(thing.uuid) === String(rowUuidRef.current)
    );
    getFactoryBeingUpdated[0].production_line[getPlineIndex].thing[
      getThingIndex
    ].device.splice(value, 1);
    dispatch(
      patchDeviceArrayData(
        getFactoryBeingUpdated[0].id,
        getFactoryBeingUpdated[0]
      )
    );
  };

  const updateThingsArrayData = (value) => {
    const getFactoryBeingUpdated = stateData.filter(
      (factory) => String(factory.id) === String(props.location.state.factoryId)
    );
    const getPlineIndex = getFactoryBeingUpdated[0].production_line.findIndex(
      (line) => String(line.id) === String(props.match.params.id)
    );
    getFactoryBeingUpdated[0].production_line[getPlineIndex].thing.splice(
      value,
      1
    );
    dispatch(
      patchThingsArrayData(
        getFactoryBeingUpdated[0].id,
        getFactoryBeingUpdated[0]
      )
    );
  };

  const thingColumns = React.useMemo(
    () => [
      {
        Header: "List of Things and devices",
        columns: [
          {
            Header: "Thing id",
            accessor: "uuid",
          },
          {
            Header: "Thing name",
            accessor: "name",
          },
          {
            Header: "Thing description",
            accessor: "description",
          },
          {
            Header: "line pos",
            accessor: "production_location",
          },
          {
            Header: "Thing state",
            accessor: "state",
          },
          {
            Header: "Thing device group",
            accessor: "deviceGroup.thing",
          },
          {
            Header: "Device group description",
            accessor: "deviceGroup.description",
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (properties) => {
              return (
                <>
                  {/* <Button
                    // color="primary"
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                  >
                    <i className="tim-icons icon-square-pin"></i>
                  </Button> */}
                  <Button
                    color="primary"
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                    tag={RRNavLink}
                    to={{
                      pathname: `${history.location.pathname}/add_device/${properties?.row?.original?.uuid}`,
                      state: {
                        factoryId: props.location.state.factoryId,
                        pLine: props.match.params.id,
                      },
                    }}
                  >
                    <i className="tim-icons icon-simple-add"></i>
                  </Button>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() =>
                      updateThingsArrayData(properties?.row?.index)
                    }
                  >
                    <i className="tim-icons icon-simple-remove"></i>
                  </Button>
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const deviceColumns = React.useMemo(
    () => [
      {
        Header: "Devices",
        columns: [
          {
            Header: "Serial NR",
            accessor: "SERIAL_NUMBER",
          },
          {
            Header: "Device name",
            accessor: "name",
          },
          {
            Header: "Device model",
            accessor: "model",
          },
          {
            Header: "Device status",
            accessor: "status",
          },
          {
            Header: "Device alerts",
            accessor: "alerts",
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (properties) => {
              return (
                <>
                  {/* Remove device from table */}
                  <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => updateDeviceData(properties.row.index)}
                  >
                    <i className="tim-icons icon-simple-remove"></i>
                  </button>
                </>
              );
            },
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="content">
      <Card>
        <CardBody>
          <ProductionLineEditTable
            columns={thingColumns}
            data={data[0].thing}
            pLineName={props.location.state.pLineName}
            pLineId={props.match.params.id}
            factoryId={props.location.state.factoryId}
            renderButtons={true}
            pathName={props.location.pathname}
            setThingUuid={setThingUuid}
          >
            <ProductionLineEditTable
              columns={deviceColumns}
              data={data2}
              renderButtons={false}
            />
          </ProductionLineEditTable>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProductionLineEditTableContainer;
