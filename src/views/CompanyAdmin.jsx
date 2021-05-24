import React, { Component } from "react";
import BootstrapModal from "../components/BootstrapModal";
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";

class CompanyAdmin extends Component {
  state = {
    role: { name: "" },
    company: { name: "" },
  };

  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">

                  <CardTitle tag="h4">ROLE ADMINISTRATION</CardTitle>
                  <BootstrapModal />
                </div>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Deadline</th>
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mamta</td>
                      <td>Manufacturing Manager</td>
                      <td>12/3/22</td>
                      <td>
                        <button className="btn btn-primary"> Activate</button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CompanyAdmin;
