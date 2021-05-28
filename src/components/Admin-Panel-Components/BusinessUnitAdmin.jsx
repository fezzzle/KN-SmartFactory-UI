import React, { Component } from "react";
import BusinessUnitModal from "./BusinessUnitModal";
import BusinessUnitEdit from "./BusinessUnitEdit"
import BusinessUnitDetail from './BusinessUnitDetail'
import { BusinessUnitProvider } from '../../contexts/BusinessUnitContext'
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  ButtonGroup,
} from "reactstrap";
import axios from 'axios';
import { Link, Route,Switch } from 'react-router-dom';

import { AdminContext } from "../../views/AdminPanel";


class BusinessUnitAdmin extends Component {

  constructor(){
    super();
    this.state = {

      BusinessUnits: [],
      isLoading: false,
    };

    this.getBusinessUnits = this.getBusinessUnits.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.showBusinessUnit = this.showBusinessUnit.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);

  }

  

    async componentDidMount(){
        await this.getBusinessUnits();
    }


    async componentDidUpdate() {
        console.log("component was updated")
        //call to the api update database
    }

    showBusinessUnit = (bu) => {

      return(
        <BusinessUnitProvider value = {bu}>

        </BusinessUnitProvider>
      )
    }

    

    changeStatus = (comp) => {

        let newState = {...this.state}
        const a = newState.BusinessUnits.find( (o) => { return o.buID === comp.buID});
        a.activated = !a.activated;
        this.setState(newState)


    }

    deleteUnit = (comp) => {

        let newState = {...this.state}
        newState.BusinessUnits = newState.BusinessUnits.filter( o => o.buID != comp.buID)
        this.setState(newState)


    }

getBusinessUnits = async ()=>{

    axios.get('http://localhost:7100/smart-factory/business-unit').then(response => {
        this.setState({
          ...this.state,
          BusinessUnits: response.data.BUs,
          isLoading: true
        });

        
      }).catch(error => {
        alert('Could not connect to Server. Make sure Mockoon server is on if you are using it')
        
        });

        
};


  render() {


    return (
      <div className="content">

        <Switch>
          <Route path="/products/:buID" component={BusinessUnitDetail}/>
          {/* <Route path="/*" component={NotFound}/>  */}
        </Switch>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <div className="d-flex justify-content-between">

                  <CardTitle tag="h4">BUSINESS UNIT ADMINISTRATION</CardTitle>
                  <BusinessUnitModal />
                </div>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Activate/Deactivate</th>
                      <th>Edit-View-Delete</th>


                    </tr>
                  </thead>
                  <tbody>

                    {this.state.BusinessUnits.map((bu => 

                    
                      <tr key = {bu.buID}>
                          <td>  {bu.name}</td>
                          <td> 
                            <span /*add css so the city's name is equal length*/>{bu.city}</span> <button 
                    className="btn-icon btn-link like btn btn-info btn-sm"
                    type="button"
                  >
                    <i className="tim-icons icon-square-pin"></i>
                  </button> </td>
                          <td> {bu.activated?'Active':'Not Active'}</td> 
                         <td>
                        <button /*add css so active not active same length*/ style ={{width: '10rem'}} className="btn btn-primary" onClick = {() => this.changeStatus(bu) } > {bu.activated? 'Deactivate': 'Activate'}</button> 
                      </td> 
                      <td>
                        <ButtonGroup>
                        <BusinessUnitEdit key = {bu.buID} details = {bu}/>
                        <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button" onClick = {() => this.showBusinessUnit(bu)} >
                                        
                            <i className="tim-icons icon-support-17"></i>
                      </button>
                        <button
                    className="btn-icon btn-link like btn-neutral btn btn-info btn-sm"
                    type="button" onClick = {() => this.deleteUnit(bu) }>
                                        
                            <i className="tim-icons icon-simple-remove"></i>
                      </button>

                        </ButtonGroup>

                      </td>
                     

                      </tr>
                     ))}

                       
                  
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BusinessUnitAdmin;