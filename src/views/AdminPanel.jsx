import React, { useReducer } from 'react';
import update from "immutability-helper";
import BusinessUnitAdmin from '../components/Admin-Panel-Components/BusinessUnitAdmin'
import BusinessUnitDetail from '../components/Admin-Panel-Components/BusinessUnitDetail'
import CompanyAdmin from '../components/Admin-Panel-Components/CompanyAdmin'
import '../assets/css/admin-panel.css'




export default class AdminPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isLoading: false

      };
    }

    render(){
        return (
        <div className="content">



     <div class="row">
         <div class="col">
            <CompanyAdmin />

         </div>

    </div>
    <div class="row">
         <div class="col-12 col-md-12">

              <BusinessUnitAdmin />
            
         </div>
       

    </div>

            
          






      </div>)

    }
          
  
 }





