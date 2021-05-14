import React from 'react';

import machineStatus from 'remote/MachineServices.js'
import './MachinePanel.css';
import axios from 'axios';
import MachinePerFactory from './MachinePerFactory.js'

export default class MachinePanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          cities: [],
          isLoading: false

      };
      this.componentDidMount=this.componentDidMount.bind(this);  
      this.getFactoryData = this.getFactoryData.bind(this);
    }

   async componentDidMount(){
       await this.getFactoryData();
      
   }

    getFactoryData = async ()=>{

        axios.get('http://localhost:7100/smart-factory/machines').then(response => {
            this.setState({
              cities: response.data.cities,
              isLoading: true
            });
          }).catch(error => this.setState({ error, isLoading: false }));
    };

    render(){
        return (
        <div className="content">

      { this.state.cities.map(city => 

        <MachinePerFactory key={city.id} name={city.name} mdata={city.machines}/>
      )}

      </div>)

    }
          
  
 }
  

 