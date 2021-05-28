import React, { useEffect, useMemo, useState } from "react";
import FactoryTable from "./FactoryTable";
import { fetchFactoryData, removeFactoryData } from "../../store/actions/index";
import { NavLink as RRNavLink } from "react-router-dom";

import { Card, CardBody, Table, Button } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";

const FactoryTableContainer = () => {
  const dispatch = useDispatch();
  const factoryData = useSelector((state) => state.factory);

  useEffect(() => {
    dispatch(fetchFactoryData());
  }, [dispatch]);

  const data = useMemo(() => factoryData, [factoryData]);

  const removeFromTable = (props) => {
    dispatch(removeFactoryData(props.row.original.id));
  };

  const logValue = (value) => {
    console.log(value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "List of factories",
        columns: [
          {
            Header: "Factory ID",
            accessor: "id",
          },
          {
            Header: "Factory name",
            accessor: "factory_location.name",
          },
          {
            Header: "Alerts",
            accessor: "alerts",
          },
          {
            Header: "Country",
            accessor: "factory_location.country",
          },
          {
            Header: "Location",
            accessor: "factory_location.city",
          },
          {
            Header: "lines",
            accessor: "production_line.length",
          },
          {
            Header: "things",
            accessor: (data) => {
              const thingsLengthArray = data.production_line.map(
                (item) => item.thing.length
              );
              const total = thingsLengthArray.reduce(
                (acc, cur) => acc + cur,
                0
              );
              return total;
            },
          },
          {
            Header: "devices",
            accessor: (data) => {
              const things = data.production_line.map((line) => line.thing);
              const deviceArray = things.map((thing) =>
                thing.map((device) => device.device)
              );
              const devices = deviceArray.flat().flat();
              return devices.length;
            },
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Actions",
            accessor: "actions",
            Cell: (props) => {
              return (
                <>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => logValue(props)}
                    tag={RRNavLink}
                    to={{
                      pathname: `/factories/${props.row.original.id}`,
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
                    onClick={() => removeFromTable(props)}
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
      <FactoryTable columns={columns} data={data} />
    </div>
  );
};

export default FactoryTableContainer;
