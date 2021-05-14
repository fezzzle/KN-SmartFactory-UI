import React from 'react';
import { Row, Collapse } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Machine from './Machines.js'
import './MachinePanel.css';


export default class MachinePerFactory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          machines: props.mdata,
          isOpen: false,
          name: props.name
      };
      this.toggle = this.toggle.bind(this)
      
    }

    toggle = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
}


    render(){

        const { machines} = this.state;
        return (

            <div className='machineCards'>

                     <Button color="primary" onClick={() => this.toggle()} style={{ marginBottom: '1rem', width:'10rem' }}>{this.state.name}</Button>
            
                             <Collapse isOpen={this.state.isOpen}>
                                 <Row className='machineCards md-4'>
                                 { machines.map( mach => 

                                        <Machine key={mach.mid} details={mach}/>
                                    )}

            
                                </Row>
                            </Collapse>
                </div>

  )
    }}

