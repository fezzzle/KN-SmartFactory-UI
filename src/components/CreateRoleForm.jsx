import React, { Component } from 'react'
import { Button, Modal } from "react-bootstrap";
import { FormGroup, Form, Input, Label } from "reactstrap";
class CreateRoleForm extends Component {
    constructor() {
        super();
        this.state = {
          showHide: false,
          modalIsOpen: true,
          selectedRole: "",
        };
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
    render() { 
        return ( 
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
              >
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
         );
    }
}
 
export default CreateRoleForm;