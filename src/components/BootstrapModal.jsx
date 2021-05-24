import { Button, Modal } from "react-bootstrap";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input } from "reactstrap";
import axios from 'axios';


class BootstrapModal extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      startDate: 1,
      setStartDate: 1,
      roles: [],
    };
    this.getRoles = this.getRoles.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  async componentDidMount(){
    await this.getRoles();
   
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

  getRoles = async ()=>{

    axios.get('http://localhost:7100/smart-factory/roles').then(response => {
        this.setState({
          ...this.state,
          roles: response.data.roles,
        });

        console.log(this.state);

        
      }).catch(error => {
        alert('Could not connect to Server. Make sure Mockoon server is on if you are using it')
        
        });
};

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

            <FormGroup style={{ width: "100%" }}>
              <label className="label-fix">Role</label>
              <br />
              <select
                className="select-padding"
                aria-label="Default select example"
              >
                <option selected>select role</option>
                { this.state.roles.map((role => <option key = {role.roleID} value={role.roleID}> {role.name} </option>))}
                {/* <option value="1">Company Admin</option>
                <option value="2">Manufacturing Operations Manager</option>
                <option value="3">Factory Manager</option>
                <option value="4">Maintenance Technician</option>
                <option value="5">Device Operator</option>
                <option value="6">Factory Operator</option> */}
              </select>
            </FormGroup>


            <FormGroup style={{ width: "100%" }}>
              <label>Deadline</label>
              {/* <DatePicker selected={startDate} onChange={date => setStartDate(date)} /> */}
              {/* <Input  onClick={() => this.showCalender()} /> */}
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
