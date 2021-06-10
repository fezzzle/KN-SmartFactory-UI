import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, Button } from "reactstrap";

import ProductionLineEditTable from "../Components/ProductionLineEditTable";

const ProductionLineEditTableContainer = (props) => {
  const [rowId, setRowId] = useState(null);
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
    .filter((item) => item.uuid === rowId)
    .map((item) => item.device)
    .flat();
  const data = useMemo(() => thingData, [thingData]);
  const data2 = useMemo(() => deviceData, [deviceData]);

  const removeFromTable = (props) => {
    console.log("remove the line");
    // dispatch(removeFactoryData(props.row.original.id));
    // dispatch(removeFactoryData(props.row.original.uuid));
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
            Header: "Production line location",
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
              // console.log('thing properties:', properties)
              return (
                <>
                  <Button
                    // color="primary"
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                  >
                    <i className="tim-icons icon-square-pin"></i>
                  </Button>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => removeFromTable(properties)}
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
                  <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => removeFromTable(properties)}
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
            setRowId={setRowId}
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
