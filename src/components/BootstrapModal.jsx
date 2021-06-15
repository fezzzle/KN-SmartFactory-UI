import { Button, Modal } from "react-bootstrap";
import React from "react";
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
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
      modalisVisible: true,
      roles: [],
      roleTitle:"",
      login: "",
      firstName: "",
      lastName: "",
      email: "",
      selectedRole: "",
      startDate: new Date(),
      authorities: new Set(),
      error: null,
      open: false,
    };
    this.getRoles = this.getRoles.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showModal2 = this.showModal2.bind(this);
    this.hideModal2 = this.hideModal2.bind(this);
  }

  showModal2() {
    this.setState({ open: true });
  }

  hideModal2() {
    this.setState({ open: false });
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
          authorities: this.state.roles,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: error.response.data.title }, () => {
            console.log(this.state.error);
          });
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
  toggle = () => {
    this.setState((prevState) => ({
      modalisVisible: !prevState.modalisVisible,
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
  handleSave = async()=>{
    const obj = {
      title: this.state.roleTitle
    };
    console.log(obj)
    await axios.post( "https://jsonplaceholder.typicode.com/posts", obj)
    .then(response=>{
      console.log(response)  
    })
    .catch(error=>{
      console.log(error)
    })
    this.hideModal2();
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <div>
          <Button variant="primary" onClick={() => this.showModal2()}>
            Create a Role
          </Button>
          <Button variant="primary" onClick={() => this.handleModalShowHide()}>
            Create New User
          </Button>
        </div>

        <Modal className="modal" show={this.state.open} toggle={this.toggle}>
          <Modal.Header closeButton onClick={() => this.hideModal2()}>
            <Modal.Title>Create New Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Label for="roleTitle">Role Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="roleTitle"
                  name="roleTitle"
                  value={this.state.roleTitle}
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.hideModal2()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="Save"
              onClick={this.handleSave}
              // onClick={() => this.handleModalShowHide()}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6>{error}</h6>
            </div>
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
