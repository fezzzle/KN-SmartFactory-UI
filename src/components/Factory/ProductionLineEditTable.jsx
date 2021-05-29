import { useTable } from "react-table";
import { Card, CardBody, Table, Button, CardHeader } from "reactstrap";

import { NavLink as RRNavLink } from "react-router-dom";

const ProductionLineEditTable = ({ columns, data, factoryName }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Card>
      <CardBody>
        <CardHeader>
          <h1>{factoryName}</h1>
        </CardHeader>
        <Button
          className="float-right mr-4"
          color="info"
          tag={RRNavLink}
          to={{ pathname: "/factories/" }}
        >
          Add a new production line
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
};

export default ProductionLineEditTable;
