import React, { Component } from "react";
import BootstrapModal from "./BootstrapModal";
import ExportCSV from "./ExportCSV"
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

// const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class CompanyAdmin extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      filteredUsers: [],
      search: "",
      role: { name: "" },
      company: { name: "" },
    };

    this.getUsers = this.getUsers.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

 

  async componentDidMount() {
    await this.getUsers();
  }
  //  async componentDidMount() {
  //    const {data : posts } = await axios.get(apiEndpoint);
  //    this.setState({ posts });
  // }

  changeStatus = (user) => {
    this.setState((user) => ({ activated: !user.activated }));
  };

  handleSearch = (event) => {
    const value = event.target.value;
    const filteredUsers = this.state.users.filter((user) => {
      return (
        user.firstName
          .toLowerCase()
          .match(new RegExp("^" + value.toLowerCase())) ||
           user.lastName.toLowerCase().includes(value.toLowerCase()) ||
           user.role.toLowerCase().includes(value.toLowerCase()) ||
           user.company.toLowerCase().includes(value.toLowerCase()) 
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
        console.log(response)
        this.setState({
          ...this.state,
          users: response.data,
          filteredUsers: response.data,
        });
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
            className="form-control "
            type="search"
            value={this.state.value}
            placeholder="Search User"
            aria-label="Search"
            onChange={this.handleSearch}
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
                      <th>Name</th>
                      <th>Role</th>
                      <th>Company</th>
                      <th>Deadline</th>
                      <th>Status</th>
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.state.filteredUsers.map((user) => (
                      <tr key={user.userID}>
                        <td>
                          {" "}
                          {user.firstName} {user.lastName}{" "}
                        </td>
                        {/* <td> {user.role} </td> */}
                        <td>{user.authorities}</td>
                        <td> {user.email} </td>
                        <td> 12/3/22 </td>
                        <td> {user.activated ? "Active" : "Not Active"}</td>
                        <td>
                          <button className="btn btn-primary">
                            {user.activated ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/*                        
                       {this.state.posts.map(post => (
                         <tr key={post.id}>
                           <td>{post.firstName}</td>
                           <td>{post.lastName}</td>
                           <td>{post.company}</td>
                           <td>{post.selectedRole}</td>
                           <td>{post.startDate}</td>
                         </tr>
              
                       ))} */}
                  
                  </tbody>
                </Table>

                <ExportCSV csvData={this.state.users} fileName={this.state.fileName} />
              </CardBody>

              
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CompanyAdmin;