import { Button, Modal } from "react-bootstrap";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Form, Input, Label } from "reactstrap";
import axios from "axios";

// const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

const apiEndpoint = "http://localhost:7100/smart-factory/newuser";

class BootstrapModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      roles: [],
      firstName: "",
      lastName: "",
      company: "",
      selectedRole: "",
      startDate: new Date(),
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
    console.log(this.state);
  }

  changeDate(date) {
    this.setState({ startDate: date });
  }

  handleSubmit = async () => {
    const obj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      company: this.state.company,
      selectedRole: this.state.selectedRole,
      deadline: this.state.startDate,
    };
    // const { data: post } = await axios.post(apiEndpoint, obj);
    axios.post("http://localhost:7100/smart-factory/newuser", obj)
    .then(response =>{
      this.setState({
          ...this.state,
      });
      console.log(response);
    })
    .catch((error)=>{
      console.log(error)
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
        console.log(this.state);
      })
      .catch((error) => {
        alert(
          "Could not connect to Server. Make sure Mockoon server is on if you are using it"
        );
      });
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Create New User
        </Button>

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
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
                <Label for="companyName">Company Name</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="select" className="label-fix">
                  Role
                </Label>
                <br />
                <select value={this.state.selectedRole} onChange={(e) => this.setState({selectedRole: e.target.value})}>
                  {this.state.roles.map((role) => (
                    <option key={role.roleID} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>

              </FormGroup>

              <FormGroup style={{ width: "100%" }}>
                <label>Deadline</label>
                <br></br>

                <DatePicker
                  className="date-fix"
                  selected={this.state.startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={this.changeDate}
                />
              </FormGroup>
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
