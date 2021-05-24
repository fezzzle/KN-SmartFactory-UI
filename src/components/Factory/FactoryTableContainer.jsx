import React, { useEffect, useMemo } from "react";
import FactoryTable from "./FactoryTable";
import { fetchFactoryData } from "../../store/actions/index";
import { useSelector, useDispatch } from "react-redux";

const FactoryTableContainer = () => {
  const dispatch = useDispatch();
  const factoryData = useSelector((state) => state.factory);

  useEffect(() => {
    dispatch(fetchFactoryData());
  }, [dispatch]);

  const data = useMemo(() => factoryData, [factoryData]);

  const logValue = (value) => {};

  const columns = React.useMemo(
    () => [
      {
        Header: "List of factories",
        columns: [
          {
            Header: "Factory name",
            accessor: "factory_location.name",
          },
          {
            Header: "Alerts",
            accessor: "alerts",
          },
          {
            Header: "Location",
            accessor: "factory_location.location_city",
          },
          {
            Header: "lines",
            accessor: "production_line.length",
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
            Cell: () => (
              <>
                <button
                  className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                  type="button"
                  onClick={logValue}
                >
                  <i className="tim-icons icon-pencil"></i>
                </button>
                <button
                  // color="primary"
                  className="btn-icon btn-link like btn btn-info btn-sm"
                  type="button"
                  onClick={logValue}
                >
                  <i className="tim-icons icon-square-pin"></i>
                </button>
                <button
                  className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                  type="button"
                  onClick={logValue}
                >
                  <i className="tim-icons icon-simple-remove"></i>
                </button>
              </>
            ),
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
