import { Button, Modal } from "react-bootstrap";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input, Form, Label } from "reactstrap";
import axios from 'axios';


class BusinessUnitModal extends React.Component {
  
  constructor() {
    super();
    this.state = {
      showHide: false,
      modalIsOpen: true,
      bu: [],
      users: [],
      name: '',
      city:'',
      company: '',
      role: ''
    };
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onChange=this.onChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    console.log("miao")

    // axios.post("http://localhost:7100/smart-factory/users",{
    //   firstName :this.state.firstName,
    //   lastName: this.state.lastName,
    //   company: this.state.company,
    //   role: this.state.role,
    //   deadline: this.state.startDate
    // })
    // .then(res=>{
    //   console.log(res.data)

    // })
  }

  onChange(e){
    e.preventDefault();
    let newState={...this.state};
    newState[e.target.name]=e.target.value;
    this.setState(newState);
}

  async componentDidMount(){
    await this.getUsers();
   
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

  getUsers = async () => {
    axios
      .get("http://localhost:7100/smart-factory/users")
      .then((response) => {
        this.setState({
          ...this.state,
          users: response.data.users,
        });
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
          Create New Business Unit
        </Button>

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title>New Business Unit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.handleSubmit} >
            <FormGroup >
              <label>Name</label>
              <Input type="text" name="name" value={this.state.name} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <Input type="text" name="city" value={this.state.city} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup>
            <Label for="select" className="label-fix">
                  Employee(s)
                </Label>
                <br />
                <Input
                  type="select"
                  name="select"
                  id="select"
                  className="select-padding"
                  aria-label="Default select example"
                >
            <option selected>Select Role</option>
                  {this.state.users.map((user) => (
                    <option key={user.userID} value={user.userID}>
                      {user.firstName} {user.lastName}
                    </option>
                     ))}

                     </Input>
            </FormGroup>
            </Form>
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
              type="submit"
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
