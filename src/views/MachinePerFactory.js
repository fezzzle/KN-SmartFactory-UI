import React, { useState, useEffect } from 'react';
import { Row, Col, Collapse } from "reactstrap";
import Button from 'react-bootstrap/Button';
import Machine from './Machines.js'
import './MachinePanel.css';


export default class MachinePerFactory extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          machines: props.mdata,
          isOpen: true,
          name: props.name
      };
      this.toggle = this.toggle.bind(this)
      
    }

    toggle = () => {
        this.setState(prevState => ({isOpen: !prevState.isOpen}))
}


    render(){

        const { machines, isOpen } = this.state;

        

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
        // <Machine key={item.mid} details={{name: `Machine ${item.mid}`, operating:false}}/>



  )
    }}

// const MachinePerFactory = (props) => {


// const [isOpen, setIsOpen] = useState(false);
// const toggle = () => setIsOpen(!isOpen);

// const [machines, setMachines] = useState({...props.data})
// console.log(props.data)

// return(

//         <div className='machineCards'>

//         <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem', width:'10rem' }}>Tallinn</Button>

//                 <Collapse isOpen={isOpen}>
//                     <Row className='machineCards md-4'>
//                         {machines.map(item =>(

//                             <Machine key={item.mid} details={{name: `Machine ${item.mid}`, operating:false}}/>

//                         ))}

//                     </Row>
//                 </Collapse>
//     </div>




