import React, { useState, useRef, useMemo, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFactoryData, removeFactoryData } from "../../store/actions/index";
import { Button } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import FactoryEditTable from "./FactoryEditTable";

const FactoryEditContainer = (props) => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.factory);
  const factoryData = stateData
    .filter((factory) => String(factory.id) === props.match.params.id)
    .map((item) => item.production_line)
    .flat();

  // useEffect(() => {
  //   dispatch(fetchFactoryData());
  // }, [dispatch]);

  const data = useMemo(() => factoryData, [factoryData]);

  const removeFromTable = (props) => {
    console.log("remove the line");
    // dispatch(removeFactoryData(props.row.original.id));
  };

  const logValue = (value) => {
    console.log(value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "List of Production Lines",
        columns: [
          {
            Header: "Production id",
            accessor: "id",
          },
          {
            Header: "Production Line name",
            accessor: "name",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Alerts",
            accessor: "alerts",
          },
          {
            Header: "Production line number",
            accessor: "line_number",
          },
          {
            Header: "Things",
            accessor: (data) => {
              return data.thing.length;
            },
          },
          {
            Header: "Devices",
            accessor: (data) => {
              const things = data.thing.map((line) => line.device);
              const deviceArray = things.map((thing) =>
                thing.map((device) => device.device)
              );
              const devices = deviceArray.flat().flat();
              return devices.length;
            },
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (properties) => {
              return (
                <>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => logValue(properties)}
                    tag={RRNavLink}
                    to={{
                      pathname: `${props.location.pathname}/edit_pline/${properties.row.original.id}`,
                      state: {
                        factoryId: props.match.params.id,
                      },
                    }}
                  >
                    <i className="tim-icons icon-pencil"></i>
                  </Button>
                  <button
                    // color="primary"
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                  >
                    <i className="tim-icons icon-square-pin"></i>
                  </button>
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
      <FactoryEditTable
        columns={columns}
        data={data}
        factoryName={props.location.state.name}
        factoryId={props.match.params.id}
      />
    </div>
  );
};

export default FactoryEditContainer;
