import React from 'react';
import BusinessUnitAdmin from '../components/Admin-Panel-Components/BusinessUnitAdmin'
import CompanyAdmin from '../components/Admin-Panel-Components/CompanyAdmin'

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

            <CompanyAdmin />
            <BusinessUnitAdmin />





      </div>)

    }
          
  
 }





