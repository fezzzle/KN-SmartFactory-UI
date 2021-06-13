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

import {
  TimeChart, 
  calculatePercentage, 
  timeToString, 
  lastWeekData, 
  totalJobs, 
  CompletionRateChart, 
  JobsChart, 
  DeliveryChart
} from "variables/ChartFunctions"

import { Pie,  Doughnut, Bar} from "react-chartjs-2"
import HeaderComponent from "components/DashboardComponents/HeaderComponent"
import axios from "axios"

import * as jobMetrics from "dashboardData/jobMetrics"
import * as timeMetrics from "dashboardData/timeMetrics"

class Dashboard extends React.Component {
  
  constructor(){
    super()
    this.state = {
      factoryJobData: {},
      factoryTimeData: {},
      productionLineTimeData: {},
      machineTimeData: {},
      productionLineJobData: {},
      machineJobData: {},
      selectedData: ["All Factories"],
      current: "factory"
     
    }
    this.getJobsData = this.getJobsData.bind(this)
    this.getTimeData = this.getTimeData.bind(this)
    

    this.componentDidMount=this.componentDidMount.bind(this)
  }
  
  async componentDidMount() {
    
    this.fetchData()
  }
  
  fetchData = async () => {
    const a = await this.getJobsData()
    const b = await this.getTimeData()
  }

  getJobsData = async () => {
    axios.get('http://localhost:7100/jobMetrics').then(response => {
      
      this.setState(prevState => ({
        ...this.state,
        factoryJobData: response.data.factoryJobs,
        productionLineJobData: response.data.productionLineJobs,
        machineJobData: response.data.machineJobs,
        selectedData: [...prevState.selectedData, response.data.factoryJobs]

      }))
      
    }).catch(error => {
      // Loading data from file if Mockoon is not active
      this.setState(prevState => ({
        ...this.state,
        factoryJobData: jobMetrics.factoryJobs,
        productionLineJobData: jobMetrics.productionLineJobs,
        machineJobData: jobMetrics.machineJobs,
        selectedData: [...prevState.selectedData, jobMetrics.factoryJobs]

      }))
      });
  }
  getTimeData = async () => {
    axios.get('http://localhost:7100/timeMetrics').then(response => {
      
      this.setState(prevState => ({
        ...this.state,
        factoryTimeData: response.data.factoryTime,
        productionLineTimeData: response.data.productionLineTime,
        machineTimeData: response.data.machineTime,
        selectedData: [...prevState.selectedData, response.data.factoryTime]
      }))
      
    }).catch(error => {
      alert('Could not connect to Server. Make sure Mockoon server is on if you are using it. Loading data from file...')
      this.setState(prevState => ({
        ...this.state,
        factoryTimeData: timeMetrics.factoryTime,
        productionLineTimeData: timeMetrics.productionLineTime,
        machineTimeData: timeMetrics.machineTime,
        selectedData: [...prevState.selectedData, timeMetrics.factoryTime]
      }))
      });
  }
  render() {
    //Checking if all data is loaded before rendering
    if(this.state.selectedData.length !== 3){
      return null
    }
    return (
      
      <div className="content">
        {/* Switch between Factories/Production Lines/Machines */}
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
                    active: this.state.current === "factory",
                  })}
                  color="info"
                  id="0"
                  size="sm"
                  onClick={() => this.setState({selectedData: ["All Factories", this.state.factoryJobData, this.state.factoryTimeData], current: "factory"})}
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
                    active: this.state.current === "productionLine",
                  })}
                  onClick={() => this.setState({selectedData: ["All Production Lines", this.state.productionLineJobData, this.state.productionLineTimeData], current: "productionLine"})}
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
                    active: this.state.current === "machine",
                  })}
                  onClick={() => this.setState({selectedData: ["All Machines", this.state.machineJobData, this.state.machineTimeData], current: "machine"})}
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
        
        <HeaderComponent selectedData={this.state.selectedData} />
        <Row>
          <Col lg="3">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="8">
                    <h5 className="card-category">Use Time</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-time-alarm text-info" /> 
                      {timeToString(this.state.selectedData[2].upTime)}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Doughnut
                 data={TimeChart(this.state.selectedData[2], ["Use Time"]).data} 
                 options={TimeChart(this.state.selectedData[2], ["Use Time"]).options}
                 />
                </div>
                <CardTitle tag="h1" className="text-center">
                  {calculatePercentage(this.state.selectedData[2].upTime)}
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
                      <i className="tim-icons icon-time-alarm text-warning" />{" "}
                      {timeToString(this.state.selectedData[2].idleTime)}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Doughnut
                 data={TimeChart(this.state.selectedData[2], ["Idle Time"]).data} 
                 options={TimeChart(this.state.selectedData[2], ["Idle Time"]).options}
                 />
                </div>
                <CardTitle tag="h1" className="text-center">
                {calculatePercentage(this.state.selectedData[2].idleTime)}
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
                      <i className="tim-icons icon-time-alarm text-danger" /> 
                      {timeToString(this.state.selectedData[2].downTime)}
                    </CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                <Doughnut
                 data={TimeChart(this.state.selectedData[2], ["Downtime"]).data} 
                 options={TimeChart(this.state.selectedData[2], ["Downtime"]).options}
                 />
                </div>
                <CardTitle tag="h1" className="text-center">
                {calculatePercentage(this.state.selectedData[2].downTime)}
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
                <Doughnut data={DeliveryChart([80, 20], ["On Time Delivery", ]).data} options={DeliveryChart([80, 20], ["On Time Delivery",]).options}/>
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
                  <i className="tim-icons icon-check-2 text-success" /> 
                  {"Avg " + lastWeekData(this.state.selectedData[1][2021]["May"]["days"])[2] + "/day"}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area large">
                  <Bar
                  data={CompletionRateChart(this.state.selectedData[1][2021]["May"]["days"]).data}
                  options={CompletionRateChart(this.state.selectedData[1][2021]["May"]["days"]).options}
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
                  <i className="tim-icons icon-bullet-list-67 text-info" /> 
                  {totalJobs(this.state.selectedData[1])}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area large">
                  <Pie
                  data={JobsChart(this.state.selectedData[1]).data}
                  options={JobsChart(this.state.selectedData[1]).options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    )
  }
}

export default Dashboard
