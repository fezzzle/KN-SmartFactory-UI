import { useTable } from "react-table";
import { Card, CardBody, Table, Button, CardTitle } from "reactstrap";
import { useHistory } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const FactoryEditTable = ({ columns, data, factoryName, factoryId, removeFromTable, showModal, setShowModal }) => {
  const history = useHistory();
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <Card>
      <ConfirmModal showModal={showModal} removeFromTable={removeFromTable} setShowModal={setShowModal}/>
      <CardBody>
        <CardTitle>
          <h1 className="mt-4">{factoryName()} factory</h1>
        </CardTitle>
        <Button
          className="float-right mr-4"
          color="info"
          tag={RRNavLink}
          to={{ pathname: `/factories/${factoryId}/add_pline` }}
        >
          Add a new production line
        </Button>
        <Button
          className="float-right mr-2"
          color="info"
          tag={RRNavLink}
          to={{ pathname: `/factories/${factoryId}/edit_factory` }}
        >
          Edit basic factory info
        </Button>
        <Button
          className="float-right mr-2"
          color="warning"
          onClick={history.goBack}
        >
          Go back
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

export default FactoryEditTable;
