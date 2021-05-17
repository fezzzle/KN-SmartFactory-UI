/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

// core components
// import {
//   donutExample,
//   chartExample1,
//   chartExample2,
//   chartExample3,
//   chartExample4,
// } from "variables/charts.js"

import HalfDoughnutChart from "variables/chartComponents/HalfDoughnutChart"
import BarChart from "variables/chartComponents/BarChart"
import PieChart from "variables/chartComponents/PieChart"

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1")
  const setBgChartData = (name) => {
    setbigChartData(name)
  }
  return (
    <>
      <div className="content">
        <Row>
          <Card className="card-plain">
            <Col sm="12">
              <ButtonGroup
                className="btn-group-toggle float-right"
                data-toggle="buttons"
              >
                <Button
                  tag="label"
                  className={classNames("btn-simple", {
                    active: bigChartData === "data1",
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => setBgChartData("data1")}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Factories
                        </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-single-02" />
                  </span>
                </Button>
                <Button
                  color="info"
                  id="1"
                  size="sm"
                  tag="label"
                  className={classNames("btn-simple", {
                    active: bigChartData === "data2",
                  })}
                  onClick={() => setBgChartData("data2")}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Production Lines
                        </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-gift-2" />
                  </span>
                </Button>
                <Button
                  color="info"
                  id="2"
                  size="sm"
                  tag="label"
                  className={classNames("btn-simple", {
                    active: bigChartData === "data3",
                  })}
                  onClick={() => setBgChartData("data3")}
                >
                  <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    Machines
                        </span>
                  <span className="d-block d-sm-none">
                    <i className="tim-icons icon-tap-02" />
                  </span>
                </Button>
              </ButtonGroup>
            </Col>
          </Card>
        </Row>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <Row className="card-body">
                  <Col className="text-left text-center" sm="3">
                    {/* TODO: fix title alignment */}
                    <CardTitle tag="h1">Factory 1</CardTitle>
                  </Col>
                  
                  {/* TODO: load data dynamically into these values */}
                  <Col sm="3">
                    <div className="text-right">
                      <CardTitle tag="h3">3h 36min</CardTitle>
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
                      <CardTitle tag="h3">274</CardTitle>
                      <h5 className="card-category">Completed Jobs</h5>
                    </div>
                  </Col>
                  <Col sm="1">
                    <div className="text-center">
                      <CardTitle tag="h3">126</CardTitle>
                      <h5 className="card-category">Pending Jobs</h5>
                    </div>
                  </Col>
                  <Col sm="1">
                    <div className="text-center">
                      <CardTitle tag="h3">43</CardTitle>
                      <h5 className="card-category">Scrapped Jobs</h5>
                    </div>
                  </Col>
                  <Col sm="1">
                    <div className="text-center">
                      <CardTitle tag="h3">57</CardTitle>
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
        <Row>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="8">
                    <h5 className="card-category">Use Time</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-time-alarm text-info" /> 14h 24min
                </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <HalfDoughnutChart
                    labels={["Use Time"]}
                    data={[60, 40]}
                    color={["rgba(29,140,248,0.2)"]}
                    lineColor={"rgb(29,140,248)"}
                  />
                </div>
                <CardTitle tag="h1" className="text-center">
                  60%
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="8">
                  <h5 className="card-category">Idle Time</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-time-alarm text-warning" /> 6h 0min
                </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <HalfDoughnutChart
                    labels={["Idle Time"]}
                    data={[25, 75]}
                    color={["rgba(248, 208, 29,0.2)"]}
                    lineColor={"rgb(248, 208, 29)"}
                  />
                </div>
                <CardTitle tag="h1" className="text-center">
                  25%
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="8">
                  <h5 className="card-category">Downtime</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-time-alarm text-danger" /> 3h 36min
                </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <HalfDoughnutChart
                    labels={["Downtime"]}
                    data={[15, 75]}
                    color={["rgba(248,29,204,0.2)"]}
                    lineColor={"rgb(248,29,204)"}
                  />
                </div>
                <CardTitle tag="h1" className="text-center">
                  15%
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="8">
                  <h5 className="card-category">On Time Delivery</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-send text-success" /> 80
                </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <HalfDoughnutChart
                    labels={["Downtime"]}
                    data={[80, 20]}
                    color={["rgba(29,248,179,0.2)"]}
                    lineColor={"rgb(29,248,179)"}
                  />
                </div>
                <CardTitle tag="h1" className="text-center">
                  80%
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
              <h5 className="card-category">Job Completion Rate</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-check-2 text-success" /> Avg 125/day
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area large">
                  <BarChart
                    labels={["M", "T", "W", "T", "F", "S", "S"]}
                    data={[80, 178, 123, 30, 50, 150, 265]}
                    color={"rgba(29,248,179,0.2)"}
                    lineColor={"rgb(29,248,179)"}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card className="card-chart">
              <CardHeader>
              <h5 className="card-category">All Jobs</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bullet-list-67 text-info" /> 500
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area large">
                  <PieChart data={[274, 126, 43, 57]} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
