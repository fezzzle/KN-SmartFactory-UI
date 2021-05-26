import { Button, Modal } from "react-bootstrap";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input } from "reactstrap";
import axios from 'axios';


class BusinessUnitModal extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      bu: [],
      name: '',
      city:'',
      company: '',
      role: ''
    };
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange(e){
    e.preventDefault();
    let newState={...this.state};
    newState[e.target.name]=e.target.value;
    this.setState(newState);
}

  async componentDidMount(){
   
}

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  };

  changeDate () {
    this.setState({ startDate : this.setState(new Date())});
  }


  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };



  render() {
  
    return (
      <div>
        <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Create New Business Unit
        </Button>

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>New Business Unit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup >
              <label>Name</label>
              <Input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <Input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange}/>
            </FormGroup>
          </Modal.Body>


          <Modal.Footer className='modal-footer'>
            <Button
              variant="secondary"
              onClick={() => this.handleModalShowHide()}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => this.handleModalShowHide()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default BusinessUnitModal;
