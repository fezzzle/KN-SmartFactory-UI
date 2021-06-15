import React, { Component } from "react";
import ImportXLSX from "./ImportXLSX"

// import BusinessUnitModal from "../components/BusinessUnitModal";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";


class CompanyAdmin extends Component {
  constructor() {
    super();
    this.state = {
     
    };

  
  }






  render() {
    return (
      <div className="content">
       
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">
                  <CardTitle tag="h4">Upload Users</CardTitle>
                </div>
              </CardHeader>

              <CardBody>

              <ImportXLSX />
    
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CompanyAdmin;
