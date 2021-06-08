import React from "react";
import { Button, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input } from "reactstrap";


export default class BusinessUnitEdit extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      modalIsOpen: true,
      name: props.details.name,
      city:props.details.city,
      company: '',
      role: ''
    };
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange(e){
    console.log(e)
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

                <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button"
                    onClick={() => this.handleModalShowHide()}
                  >
                    <i className="tim-icons icon-pencil"></i>
                  </button>
        {/* <Button variant="primary" onClick={() => this.handleModalShowHide()}>
          Edit
        </Button> */}

        <Modal show={this.state.showHide} className="modal">
          <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
            <Modal.Title className="modal-title">{this.state.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup >
              <label>Name</label>
              <Input type="text" name="firstName" value={this.state.name} onChange={this.onChange}/>
            </FormGroup>
            <FormGroup>
              <label>City</label>
              <Input type="text" name="lastName" value={this.state.city} onChange={this.onChange}/>
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


