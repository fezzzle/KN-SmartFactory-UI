import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// react plugin used to create charts

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap"
const HeaderComponent = ({ selectedData }) => {
 
  const jobMetrics = selectedData[1]
  const timeMetrics = selectedData[2]
  const timeSinceActive = new Date(Date.parse(timeMetrics.lastChange))

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <Row className="card-body">
                <Col className="text-left text-center" sm="3">
                  <CardTitle tag="h1">{selectedData[0]}</CardTitle>
                </Col>

                <Col sm="3">
                  <div className="text-right">
                    <CardTitle tag="h3">
                      {timeSinceActive.getHours() +
                        "h " +
                        timeSinceActive.getMinutes() +
                        "min"}
                    </CardTitle>
                    <h5 className="card-category">Last Active</h5>
                  </div>
                </Col>

                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">80</CardTitle>
                    <h5 className="card-category">On Time Delivery</h5>
                  </div>
                </Col>
                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">{jobMetrics.completed}</CardTitle>
                    <h5 className="card-category">Completed Jobs</h5>
                  </div>
                </Col>
                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">{jobMetrics.pending}</CardTitle>
                    <h5 className="card-category">Pending Jobs</h5>
                  </div>
                </Col>
                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">{jobMetrics.scrapped}</CardTitle>
                    <h5 className="card-category">Scrapped Jobs</h5>
                  </div>
                </Col>
                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">{jobMetrics.rejected}</CardTitle>
                    <h5 className="card-category">Rejected Jobs</h5>
                  </div>
                </Col>
                <Col sm="1">
                  <div className="text-center">
                    <CardTitle tag="h3">100</CardTitle>
                    <h5 className="card-category">TEE</h5>
                  </div>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default HeaderComponent
