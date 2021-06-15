import { useTable } from "react-table";
import { Card, CardBody, Table, Button, CardTitle } from "reactstrap";

import { NavLink as RRNavLink } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const FactoryTable = ({ columns, data, removeFromTable, showModal, setShowModal }) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Card>
      <ConfirmModal showModal={showModal} removeFromTable={removeFromTable} setShowModal={setShowModal}/>
      <CardBody>
        <CardTitle>
          <h1 className="mt-4">List of company factories</h1>
        </CardTitle>
        <Button
          className="float-right mr-4"
          color="info"
          tag={RRNavLink}
          to={{ pathname: "/factories/add_factory" }}
        >
          Add a new factory
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

export default FactoryTable;
