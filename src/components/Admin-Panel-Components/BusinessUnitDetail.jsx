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

  // componentDidUpdate() {
  //   const bu = this.contextType

  //   console.log(bu)
  // }

  constructor(props){
    super(props);
    this.state = {
      buInDetail: props.details,
      showHide: false,
    };    

  }

  



  render() {

    console.log(this.state.buInDetail.name)
    return (
      <div className="content">

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">

                  <CardTitle tag="h4"> {this.state.buInDetail.name}</CardTitle>
                </div>
              </CardHeader>

              <CardBody>
              <ul>
                <li>Location: {this.state.buInDetail.location}</li>
                <li>Status: {this.state.buInDetail.activated? "Active" : "Not Active"}</li>
                <li>Members: </li>
              </ul>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BusinessUnitDetail;
