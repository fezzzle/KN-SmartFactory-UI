import React from 'react';
import Card from "react-bootstrap/Card";
import './MachinePanel.css'
import Button from 'react-bootstrap/Button'

class Machine extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        operating: props.details.operating,
        mid: props.details.mid,
        problem: props.details.problem,
      };
      this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus = () => {
        this.setState(prevState => ({operating: !prevState.operating}))
    }
    render() {
      return (
        <div>

<Card border={(this.state.operating && this.state.problem)? "danger" : ''} style={{width: '12rem', fontSize: '0.8rem', backgroundColor: this.state.operating === true? "#1b7517" : "#616662" }}>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
  <Card.Body>
    <Card.Title>Machine {this.state.mid}</Card.Title>   
    <Card.Text>
    <span className='status' >Status: {this.state.operating? 'ON':'OFF'}</span>  <br></br>
    <span className='status' >Problem: {this.state.problem? 'Yes':'Clear'}</span>  <br></br>
    </Card.Text>
    {/* <Button color = 'primary' onClick={ () => this.changeStatus()}>{!this.state.operating? 'Turn On':'Turn Off'}</Button> */}

  </Card.Body>


</Card>
            
        
        </div>
      );
    }
  }

  export default Machine;