// import ProductionLineProvider from "../components/ProductionLine/ProductionLineProvider";
// import "./ProductionLine.css";
import React, {useEffect, useMemo} from 'react'
import { fetchFactoryData } from "../store/actions/index";
import { useTable } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  Table,
  Button,
} from "reactstrap";


function ReactTable({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <Card>
      <CardBody>
        <Button className="float-right mr-4" href="/#" color="primary">
          Add new factory
        </Button>
        <Table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

const ProductionLineView = () => {
  const dispatch = useDispatch();
  const factoryData = useSelector(state => state.factory);
  // console.log('factoryData:', factoryData[0]["factory_location"]["location_city"])

  useEffect(() => {
    dispatch(fetchFactoryData())
  }, [dispatch])


  const data = useMemo(() => factoryData, [factoryData])
  console.log('data:', data)


  const logValue = (value) => {
  };
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
      <ReactTable columns={columns} data={data} />
    </div>
  );
};

export default ProductionLineView;

// const ProductionLineView = () => {
//   return (
//     <Container>
//       <ProductionLineProvider />
//     </Container>
//   );
// };
