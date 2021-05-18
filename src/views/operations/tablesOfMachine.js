import React from 'react';
import Table from "react-bootstrap/Table";
import './MachinePanel.css'

class Table extends React.Component {
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

<Table striped bordered hover>
  <thead>
    <tr>

      <th>ID</th>
      <th>Status</th>

    </tr>
  </thead>
  <tbody>

      


    <tr>
      <td>1</td>
      <td>Mark</td>

    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>

    </tr>
    <tr>
      <td>3</td>
      <td> Larry the Bird</td>
    </tr>
  </tbody>
</Table>
            
        
        </div>
      );
    }
  }

  export default Table;