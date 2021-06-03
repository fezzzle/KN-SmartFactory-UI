import React, { Component } from "react";
import BootstrapModal from "../components/BootstrapModal";
// import BusinessUnitModal from "../components/BusinessUnitModal";
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
} from "reactstrap";
import axios from "axios";


class CompanyAdmin extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filteredUsers: [],
      search: "",
      role: { name: "" },
      activated: true
    };

    this.getUsers = this.getUsers.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    await this.getUsers()
  }

  changeStatus = (user) => {
    const users  = [...this.state.users] 
    const value = user.target.value
    const filteredUser = users.filter(user => user.id === +value)
    const index = users.indexOf(filteredUser[0])
    users[index].activated = !users[index].activated
    this.setState({users: users})
  };


  handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    let filteredUsers = this.state.users.filter((user) => {
      return (
        user.login
          .toLowerCase()
          .match(new RegExp("^" + value.toLowerCase())) ||
          user.firstName.toLowerCase().includes(value) ||
           user.lastName.toLowerCase().includes(value) ||
           user.email.toLowerCase().includes(value) 
      );
    });
    this.setState({ filteredUsers: filteredUsers });
  
  };

  getUsers = async () => {
    const config = {
      headers: { Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9QRVJNSVNTSU9OX0NSRUFURSxST0xFX1BFUk1JU1NJT05fREVMRVRFLFJPTEVfUEVSTUlTU0lPTl9SRUFELFJPTEVfUEVSTUlTU0lPTl9VUERBVEUiLCJleHAiOjE2MjUwNzA3NDh9.9KowO8KnMpl6i04VmsdsDjmr-ZHs6MVDJFS0nUt4vt03JNvgVboN8ghwrfOSyafy8EDsOqki0zZkGjQaNM6l4A'
    }
  };
    axios
      .get("https://coreplatform.herokuapp.com:443/api/admin/users", config)
      .then((response) => {
        this.setState({
          ...this.state,
          users: response.data,
          filteredUsers: response.data,
        });
        console.log(this.state.users)
        console.log(this.state.filteredUsers)

  
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="content">
        <form className="d-flex mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search User"
            aria-label="Search"
            onInput={this.handleSearch}
          />
        </form>
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
                      <th>User Name</th>
                      <th>Name</th>
                      <th>Authorities</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.filteredUsers.map((user) => (
                      <tr key={user.id}>
                      <td>{user.login}</td>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.authorities}</td>
                        <td> {user.email} </td>
                        <td> {user.activated ? "Active" : "Not Active"}</td>
                        <td>
                          <button className="btn btn-primary" onClick={this.changeStatus} value
                          ={user.id}>
                            {user.activated ? "Deactivate" : "Activate"}
                          </button>
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
