import React, { useEffect, useMemo, useState } from "react";
import FactoryTable from "./FactoryTable";
import { fetchFactoryData, removeFactoryData } from "../../store/actions/index";

import { useSelector, useDispatch } from "react-redux";

const FactoryTableContainer = () => {
  const dispatch = useDispatch();
  const factoryData = useSelector((state) => state.factory);

  useEffect(() => {
    dispatch(fetchFactoryData());
  }, [dispatch]);

  const data = useMemo(() => factoryData, [factoryData]);


  const removeFromTable = (props) => {
    console.log("REMOVE FROM TABLE:", props.row.id)
    dispatch(removeFactoryData(props.row.original.id))
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
            // Cell: props => {
            //   console.log("props are:", props)
            //   return props.value === null ? 0 : props.value
            // },
          },
          {
            Header: "things",
            accessor: "things",
          },
          {
            Header: "devices",
            accessor: "devices",
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
                  <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    // onClick={() => logValue(props)}
                  >
                    <i className="tim-icons icon-pencil"></i>
                  </button>
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
