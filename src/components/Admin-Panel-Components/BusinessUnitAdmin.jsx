import React, { Component } from "react";
import BusinessUnitModal from "./BusinessUnitModal";
import BusinessUnitEdit from "./BusinessUnitEdit"
import BusinessUnitDetail from './BusinessUnitDetail'
import {
  Row,
  Col,
  Table,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  NavLink
} from "reactstrap";
import axios from 'axios';
import { Link, Route,Switch } from 'react-router-dom';


class BusinessUnitAdmin extends Component {

  constructor(){
    super();
    this.state = {

      BusinessUnits: [],
      isLoading: false,
    };

    this.getBusinessUnits = this.getBusinessUnits.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
                      <th>Delete</th>
                      <th>Edit</th>


                    </tr>
                  </thead>
                  <tbody>

                    {this.state.BusinessUnits.map((bu => 
                      <tr key = {bu.buID}>
                          <td>  <Link to = "#"> {bu.name}</Link></td>
                          <td> {bu.city} </td>
                          <td> {bu.activated?'Active':'Not Active'}</td> 
                         <td>
                        <button style ={{width: '10rem'}} className="btn btn-primary" onClick = {() => this.changeStatus(bu) } > {bu.activated? 'Deactivate': 'Activate'}</button>
                      </td>
                      <td>
                        <BusinessUnitEdit key = {bu.buID} details = {bu} />
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick = {() => this.deleteUnit(bu) } > Delete </button>
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