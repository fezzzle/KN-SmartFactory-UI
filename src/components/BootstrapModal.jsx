import { Button, Modal } from "react-bootstrap";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input } from "reactstrap";


class BootstrapModal extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      startDate: 1,
      setStartDate: 1
    };
  }

  handleModalShowHide() {
    this.setState({ showHide: !this.state.showHide });
  };


  toggleModal = () => {
    this.setState((prevState) => ({
      modalIsOpen: !prevState.modalIsOpen,
    }));
  };

  changeDate () {
    this.setState({ startDate : this.setState(new Date())});
  }

  render() {
    // const [startDate, setStartDate] = this.setState(new Date());
  
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
            <FormGroup>
              <label>Name</label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <label>Company Name</label>
              <Input type="text" />
            </FormGroup>

            <FormGroup>
              <label className="label-fix">Role</label>
              <br />
              <select
                className="select-padding"
                aria-label="Default select example"
              >
                <option selected>select role</option>
                <option value="1">Company Admin</option>
                <option value="2">Manufacturing Operations Manager</option>
                <option value="3">Factory Manager</option>
                <option value="4">Maintenance Technician</option>
                <option value="5">Device Operator</option>
                <option value="6">Factory Operator</option>
              </select>
            </FormGroup>


            <FormGroup style={{ width: "100%" }}>
              <label>Deadline</label>
              <br/>

              {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}

              <DatePicker className="date-fix" onClick={() => this.changeDate()}/>
            
            </FormGroup>
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

export default BootstrapModal;
