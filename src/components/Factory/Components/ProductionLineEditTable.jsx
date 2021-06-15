import { useState, Fragment } from "react";
import { useTable } from "react-table";
import { Table, Button, CardTitle } from "reactstrap";
import { useHistory } from "react-router-dom";

import { NavLink as RRNavLink } from "react-router-dom";

const ProductionLineEditTable = ({
  columns,
  data,
  children,
  pLineName,
  pLineId,
  factoryId,
  renderButtons,
  pathName,
  setThingUuid,
}) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const toggleRowOpen = (id) => {
    if (open === id) {
      setOpen(false);
    } else {
      setOpen(id);
    }
  };
  const ProductionLineButtons = (props) => {
    console.log("ProductionLineButtons props:", props);
    return (
      <>
        <CardTitle>
          <h1 className="mt-4">{pLineName} production line</h1>
        </CardTitle>
        <Button
          className="float-right mr-4"
          color="info"
          tag={RRNavLink}
          to={{
            pathname: `${pathName}/add_thing`,
            state: { factoryId: factoryId, pLineId: pLineId },
          }}
        >
          Add a new Thing and device
        </Button>
        <Button
          className="float-right mr-2"
          color="info"
          tag={RRNavLink}
          to={{
            pathname: `/factories/${factoryId}/edit_pline/${pLineId}`,
            state: { factoryId: factoryId },
          }}
        >
          Edit production line info
        </Button>
        <Button
          className="float-right mr-2"
          color="warning"
          onClick={history.goBack}
        >
          Go back
        </Button>
      </>
    );
  };

  return (
    <>
      {renderButtons && <ProductionLineButtons />}
      <Table
        {...getTableProps()}
        style={
          renderButtons ? {} : { border: "1px solid white", margin: "2rem" }
        }
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {renderButtons ? <th>Expand</th> : null}
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={i}>
                <tr {...row.getRowProps()}>
                  {renderButtons ? (
                    <td>
                      <span id={row.id} onClick={() => toggleRowOpen(row.id)}>
                        {open === row.id ? (
                          "close"
                        ) : (
                          <Button
                            className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                            type="button"
                            onClick={() => setThingUuid(row.original.uuid)}
                          >
                            <i className="tim-icons icon-double-right"></i>
                          </Button>
                        )}
                      </span>
                    </td>
                  ) : null}
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {open === row.id && (
                  <tr colSpan={7}>
                    <td colSpan={7}>
                      {children}
                      {/* React.cloneElement(children, {props: "any necessary props here"}) */}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ProductionLineEditTable;
