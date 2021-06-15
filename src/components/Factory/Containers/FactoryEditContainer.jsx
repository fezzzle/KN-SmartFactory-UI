import React, {  useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchFactoryData } from "../../../store/actions/actions";
import { Button, Badge } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import FactoryEditTable from "../Components/FactoryEditTable";

const FactoryEditContainer = (props) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const savePressedDeleteButtonProps = useRef(null)

  const stateData = useSelector((state) => state.factory);
  const dispatch = useDispatch();
  const factoryData = stateData
    .filter((factory) => String(factory.id) === props.match.params.id)
    .map((item) => item.production_line)
    .flat();

  const data = useMemo(() => factoryData, [factoryData]);

  const getFactoryData = () => {
    return stateData.filter(
      (factory) => String(factory.id) === String(props.match.params.id)
    );
  };

  const factoryName = () => {
    const data = getFactoryData();
    return data[0].factory_location.name;
  };
  
  const removeFromTable = () => {
    const getFactoryBeingUpdated = getFactoryData();
    getFactoryBeingUpdated[0].production_line.splice(savePressedDeleteButtonProps.current.row.index, 1);
    dispatch(
      patchFactoryData(getFactoryBeingUpdated[0].id, getFactoryBeingUpdated[0])
    );
    setShowModal(false)
  };


  const StatusBadge = ({ data }) => {
    const getRandomColorCode = () => {
      const colorCodes = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ];
      const res = Math.floor(Math.random() * colorCodes.length);
  
      return colorCodes[res];
    };
    return (
      <>
        <Badge color={getRandomColorCode()}>{data}</Badge>
      </>
    );
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
            Cell: (props) => {
              return <StatusBadge data={props.value} />;
            },
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
                    tag={RRNavLink}
                    to={{
                      pathname: `${props.location.pathname}/pline/${properties.row.original.id}`,
                      state: {
                        factoryId: props.match.params.id,
                        pLineName: properties.row.original.name,
                      },
                    }}
                  >
                    <i className="tim-icons icon-pencil"></i>
                  </Button>
                  {/* <Button
                    // color="primary"
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                  >
                    <i className="tim-icons icon-square-pin"></i>
                  </Button> */}
                  <Button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    // onClick={() => updateFactoryArrayData(properties.row.index)}
                    onClick={() => {
                      savePressedDeleteButtonProps.current = properties
                      toggleModal();
                    }
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
  return (
    <div className="content">
      <FactoryEditTable
        columns={columns}
        data={data}
        factoryName={factoryName}
        factoryId={props.match.params.id}
        removeFromTable={removeFromTable}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default FactoryEditContainer;
