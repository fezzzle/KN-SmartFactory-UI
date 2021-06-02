import React, { useState, useRef, useMemo, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { fetchFactoryData, removeFactoryData } from "../../store/actions/index";
import { Button } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import ProductionLineEditTable from "./ProductionLineEditTable";

const ProductionLineEditTableContainer = (props) => {
  const stateData = useSelector((state) => state.factory);
  console.log('WHERE IT IS BROKEN:ProductionLineEditTableContainer:', stateData)
  const thingData = stateData
    .filter((factory) => String(factory.id) === props.location.state.factoryId)
    .map((item) =>
      item.production_line.filter(
        (thing) => String(thing.id) === props.match.params.id
      )
    )
    .flat();

  const data = useMemo(() => thingData, [thingData]);

  const removeFromTable = (props) => {
    console.log("remove the line");
    // dispatch(removeFactoryData(props.row.original.id));
  };

  const columns = React.useMemo(
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
              // console.log("properties are:", properties);
              return (
                <>
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    tag={RRNavLink}
                    to={{
                      pathname: `${props.location.pathname}/pline/${properties.row.original.id}`,
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
      <ProductionLineEditTable 
      columns={columns} 
      data={data[0].thing} 
      pLineName={props.location.state.pLineName}
      pLineId={props.match.params.id}
      factoryId={props.location.state.factoryId}
      />
    </div>
  );
};

export default ProductionLineEditTableContainer;
