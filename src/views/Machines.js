import React from 'react';
import Card from "react-bootstrap/Card";
import './MachinePanel.css'

class Machine extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        operating: props.details.operating,
        mid: props.details.mid
      };
      this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus = () => {
        this.setState(prevState => ({operating: !prevState.operating}))
    }
    render() {
      return (
        <div>

<Card style={{width: '12rem', fontSize: '0.8rem', backgroundColor: this.state.operating === true? "#1b7517" : "#a84632" }}>
  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
  <Card.Body>
    <Card.Title>Machine {this.state.mid}</Card.Title>   
    <Card.Text>
    <span className='status' >Status: {this.state.operating? 'ON':'OFF'}</span>  <br></br>
      {/* <ul>
        <li>Detail 1</li>
        <li>Detail 2</li>
        <li>Detail 3</li>
      </ul> */}
    </Card.Text>
    {/* <Button color = 'primary' onClick={ () => this.changeStatus()}>{this.state.operating? 'Turn On':'Turn Off'}</Button> */}

  </Card.Body>


</Card>
            
        
        </div>
      );
    }
  }

  export default Machine;