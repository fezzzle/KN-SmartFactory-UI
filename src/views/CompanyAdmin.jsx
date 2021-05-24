import React, { Component } from "react";
import BootstrapModal from "../components/BootstrapModal";
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

class CompanyAdmin extends Component {

  constructor(){
    super();
    this.state = {

      users: [],
      role: { name: "" },
      company: { name: "" },
    };

    this.getUsers = this.getUsers.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);

  }

  async componentDidMount(){
    await this.getUsers();
   
}

changeStatus = (user) => {
  this.setState(user => ({activated: !user.activated}))
}

getUsers = async ()=>{

  axios.get('http://localhost:7100/smart-factory/users').then(response => {
      this.setState({
        ...this.state,
        users: response.data.users,
      });
      console.log(this.state.users)

      
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
                      <th>Company</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.users.map((user => 
                      <tr key = {user.userID}>
                          <td> {user.firstName} {user.lastName} </td>
                          <td> {user.role} </td>
                          <td> {user.company} </td>
                          <td> {user.deadline} </td> 
                          <td> {user.activated?'Active':'Not Active'}</td> 
                         <td>
                        <button className="btn btn-primary" > {user.activated? 'Deactivate': 'Activate'}</button>
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

export default CompanyAdmin;
