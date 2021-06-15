import React, { useEffect, useMemo, useState, useRef } from "react";
import FactoryTable from "../Components/FactoryTable";
import { fetchFactoryData } from "../../../store/actions/actions";
import { NavLink as RRNavLink } from "react-router-dom";
import { Button, Badge } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFactoryData, setIsLoading } from "../../../store/actions/actions";

const AlertPill = ({ data }) => {
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
      <Badge color={getRandomColorCode()} pill>
        {data}
      </Badge>
    </>
  );
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

const FactoryTableContainer = (props) => {
  const dispatch = useDispatch();
  const factoryData = useSelector((state) => state.factory);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const savePressedDeleteButtonProps = useRef(null);

  useEffect(() => {
    dispatch(fetchFactoryData());
  }, [dispatch]);

  const data = useMemo(() => factoryData, [factoryData]);

  const removeFromTable = () => {
    dispatch(
      removeFactoryData(savePressedDeleteButtonProps.current.row.original.id)
    );
    setShowModal(false);
  };

  const logValue = (value) => {
    console.log(value);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "factories",
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
            Cell: (props) => {
              return <StatusBadge data={props.value} />;
            },
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
            Cell: (props) => {
              return <AlertPill data={props.value} />;
            },
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
                      state: { name: props.row.original.factory_location.name },
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
                    onClick={() => {
                      toggleModal();
                      savePressedDeleteButtonProps.current = props;
                    }}
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
      <FactoryTable
        columns={columns}
        data={data}
        removeFromTable={removeFromTable}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default FactoryTableContainer;
