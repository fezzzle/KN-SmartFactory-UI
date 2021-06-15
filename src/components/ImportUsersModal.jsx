import { Button, Modal } from "react-bootstrap";
import React from "react";
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Form, Input, Label } from "reactstrap";
import axios from "axios";
import ImportXLSX from "./ImportXLSX";


class ImportUsersModal extends React.Component {
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
    this.componentDidMount = this.componentDidMount.bind(this);
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

          <Button variant="primary" onClick={() => this.handleModalShowHide()}>
            Import Users from XLSX file
          </Button>
        </div>

        <Modal className="modal" show={this.state.open} toggle={this.toggle}>
          <Modal.Header closeButton onClick={() => this.hideModal2()}>
            <Modal.Title>Create New Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>

             
           
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
            <div>

            <ImportXLSX />
            </div>
           
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

export default ImportUsersModal;
