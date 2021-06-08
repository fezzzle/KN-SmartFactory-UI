import { Button, Modal } from "react-bootstrap";
import React from "react";
// import DatePicker from "react-datepicker";
import CreateRoleForm from '../components/CreateRoleForm'
// import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Form, Input, Label } from "reactstrap";
import axios from "axios";

const listOfAuthorities = [
  "ROLE_PERMISSION_UPDATE",
  "ROLE_PERMISSION_CREATE",
  "ROLE_ADMIN",
  "ROLE_PERMISSION_READ",
  "ROLE_PERMISSION_DELETE",
];

class BootstrapModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      roles: [],
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      selectedRole: "",
      startDate: new Date(),
      authorities: new Set(),
      error: null
    };
    this.getRoles = this.getRoles.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  async componentDidMount() {
    await this.getRoles();
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  }

  changeDate(date) {
    this.setState({ startDate: date });
  }
  handleRole= ()=>{
    <CreateRoleForm/>
  }

  handleSubmit = async () => {
    const login = this.state.login;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const date = this.state.startDate.toISOString();
    const authorities = this.state.authorities;
    const obj = {
      login: login,
      firstName: firstName,
      lastName: lastName,
      email: email,
      selectedRole: "",
      activated: true,
      createdBy: "system",
      createdDate: date,
      checked: false,
      authorities: [...authorities],
    };
    console.log(obj);

    // const { data: post } = await axios.post(apiEndpoint, obj);
    const config = {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiYXV0aCI6IlJPTEVfQURNSU4sUk9MRV9QRVJNSVNTSU9OX0NSRUFURSxST0xFX1BFUk1JU1NJT05fREVMRVRFLFJPTEVfUEVSTUlTU0lPTl9SRUFELFJPTEVfUEVSTUlTU0lPTl9VUERBVEUiLCJleHAiOjE2MjUwNzA3NDh9.9KowO8KnMpl6i04VmsdsDjmr-ZHs6MVDJFS0nUt4vt03JNvgVboN8ghwrfOSyafy8EDsOqki0zZkGjQaNM6l4A",
      "Content-Type": "application/json",
    };
    axios({
      method: "post",
      url: "https://coreplatform.herokuapp.com:443/api/admin/users",
      data: obj,
      headers: config,
    })
      .then((response) => {
        console.log(response);
        this.setState({
          showHide: false,
          roles: [],
          login: "",
          firstName: "",
          lastName: "",
          email: "",
          selectedRole: "",
          startDate: new Date(),
          // authorities: new Set(),
          authorities: this.state.roles
        });
      })
      .catch( (error) =>  {
        if (error.response) {
          this.setState({error: error.response.data.title}, () => {console.log(this.state.error)})
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  getRoles = async () => {
    axios
      .get("http://localhost:7100/smart-factory/roles")
      .then((response) => {
        this.setState({
          ...this.state,
          roles: response.data.roles,
        });
      })
      .catch((error) => {
       console.log(error);
      });
  };

  render() {
    const { error } = this.state
    return (
      <div>
       <Button variant="primary" onClick={() => this.handleRole()}>
          Create a Role
        </Button>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Create New User
        </Button>

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div><h6>{error}</h6></div>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="login">User Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="login"
                  name="login"
                  value={this.state.login}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for="select" className="label-fix">
                  Role
                </Label>
                <br />
                <select  className="select" value={this.state.selectedRole} onChange={(e) => this.setState({selectedRole: e.target.value})}>
                  {this.state.roles.map((role) => (
                    <option key={role.roleID} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>

              </FormGroup> */}
              

              <label>Authoriteies</label>
              {listOfAuthorities.map((option) => (
                <div>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(event) => {
                      if (this.state.authorities.has(option)) {
                        this.state.authorities.delete(option);
                      } else {
                        this.state.authorities.add(option);
                      }
                    }}
                  />{" "}
                  {option}
                </div>
              ))} 
              {/* <FormGroup style={{ width: "100%" }}>
                <label>Deadline</label>
                <br></br>

                <DatePicker
                  className="date-fix"
                  selected={this.state.startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.changeDate}
                />
              </FormGroup> */}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={this.handleSubmit}
              // onClick={() => this.handleModalShowHide()}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BootstrapModal;
