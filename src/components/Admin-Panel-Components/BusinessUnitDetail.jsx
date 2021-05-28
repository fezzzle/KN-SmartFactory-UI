import React, { Component } from "react";
import BusinessUnitContext from "../../contexts/BusinessUnitContext"


import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from 'axios';

class BusinessUnitDetail extends Component {

  static contextType = BusinessUnitContext

  componentDidUpdate() {
    const bu = this.contextType

    console.log(bu)
  }

  constructor(props){
    super(props);
    this.state = {
      name: ''
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

                  <CardTitle tag="h4">Test</CardTitle>
                </div>
              </CardHeader>

              <CardBody>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BusinessUnitDetail;
