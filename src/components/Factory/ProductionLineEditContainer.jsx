import React, { useState, useRef, useMemo, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFactoryData, removeFactoryData } from "../../store/actions/index";
import {
  Card,
  CardBody,
  Table,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import ProductionLineEditTable from "./ProductionLineEditTable";

const ProductionLineEditContainer = (props) => {
  console.log('props in ProductionLineEditContainer:', props)
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.factory);
  console.log('stateData:', stateData)
  console.log("props.match.params.id", props.match.params.id)
  const thingData = stateData
    .filter((factory) => String(factory.id) === props.match.params.id)
    .map((item) => item.production_line)
    .flat();
  console.log("factoryData:", thingData);

  useEffect(() => {
    dispatch(fetchFactoryData());
  }, [dispatch]);

  const data = useMemo(() => thingData, [thingData]);

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
              console.log("properties are:", properties);
              return (
                <>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => logValue(properties)}
                    tag={RRNavLink}
                    to={{
                      pathname: `${props.location.pathname}/edit_pline/${properties.row.original.id}`,
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
      <ProductionLineEditTable columns={columns} data={data} />
    </div>
  );
};

export default ProductionLineEditContainer;
