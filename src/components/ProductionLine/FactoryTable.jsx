import { useTable } from "react-table";
import {
    Card,
    CardBody,
    Table,
    Button,
  } from "reactstrap";


const FactoryTable = ({ columns, data }) => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
      columns,
      data,
    });
  
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

export default FactoryTable