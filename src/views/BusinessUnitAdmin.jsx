import React, { Component } from "react";
import BusinessUnitModal from "../components/BusinessUnitModal";
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from 'axios';

class BusinessUnitAdmin extends Component {

  constructor(){
    super();
    this.state = {

      BusinessUnits: [],
      isLoading: false,
    };

    this.getBusinessUnits = this.getBusinessUnits.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);

  }

  async componentDidMount(){
    await this.getBusinessUnits();
   
}

changeStatus = () => {
  this.setState(prevState => ({activated: !prevState.activated}))
}

getBusinessUnits = async ()=>{

    axios.get('http://localhost:7100/smart-factory/business-unit').then(response => {
        this.setState({
          ...this.state,
          BusinessUnits: response.data.BUs,
          isLoading: true
        });

        
      }).catch(error => {
        alert('Could not connect to Server. Make sure Mockoon server is on if you are using it')
        
        });
};


  render() {


    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">

                  <CardTitle tag="h4">BUSINESS UNIT ADMINISTRATION</CardTitle>
                  <BusinessUnitModal />
                </div>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Activate/Deactivate</th>
                      <th>Delete</th>

                    </tr>
                  </thead>
                  <tbody>

                    {this.state.BusinessUnits.map((bu => 
                      <tr key = {bu.buID}>
                          <td> {bu.name}</td>
                          <td> {bu.city} </td>
                          <td> {bu.activated?'Active':'Not Active'}</td> 
                         <td>
                        <button className="btn btn-primary" onClick = {() => this.changeStatus } > {bu.activated? 'Deactivate': 'Activate'}</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" > Delete </button>
                      </td>

                      </tr>
                       ))}
                  
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

export default BusinessUnitAdmin;