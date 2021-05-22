// import ProductionLineProvider from "../components/ProductionLine/ProductionLineProvider";
// import "./ProductionLine.css";
import apiDataService from "../services/factoryDataService";
import { useTable } from "react-table";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

const data = [
  {
    factoryName: "Bike Factory",
    factoryLocation: "Tallinn",
    lines: 2,
    things: 40,
    devices: 70,
    status: "WORKING",
  },
  {
    factoryName: "Food Factory",
    factoryLocation: "Tartu",
    lines: 3,
    things: 15,
    devices: 30,
    status: "OFFLINE",
  },
];

console.log(apiDataService.getAll().then((res) => console.log(res.data)));

function ReactTable({ columns, data }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <Card>
      <CardBody>
        <Button className="float-right" href="/#" color="primary">
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
  const logValue = (value) => {
    console.log(value);
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "List of factories",
        columns: [
          {
            Header: "Factory name",
            accessor: "factoryName",
          },
          {
            Header: "Location",
            accessor: "factoryLocation",
          },
          {
            Header: "lines",
            accessor: "lines",
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
      // {
      //   Header: "Hello",
      //   columns: [
      //     {
      //       Header: "lines",
      //       accessor: "lines",
      //     },
      //     {
      //       Header: "things",
      //       accessor: "things",
      //     },
      //     {
      //       Header: "devices",
      //       accessor: "devices",
      //     },
      //     {
      //       Header: "Status",
      //       accessor: "status",
      //     },
      //     {
      //       Header: "Actions",
      //       accessor: "actions",
      //       Cell: () => (
      //         <>
      //           <button
      //             className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
      //             type="button"
      //             onClick={logValue}
      //           >
      //             <i className="tim-icons icon-pencil"></i>
      //           </button>
      //           <button
      //             className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
      //             type="button"
      //             onClick={logValue}
      //           >
      //             <i className="tim-icons icon-simple-remove"></i>
      //           </button>
      //         </>
      //       ),
      //     },
      //   ],
      // },
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
