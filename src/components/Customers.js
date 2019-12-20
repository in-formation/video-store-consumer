import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCustomer: {},
      allCustomers: [],
      error: '',
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/customers')
    .then((response) => {
      this.setState({
        allCustomers: response.data
      });
    })
    .catch((error) => {
      this.setState({
        error: error.errors
      });
    })
  }
  
  selectCustomer = (customer) => {
    this.setState({
      selectedCustomer: customer,
    });
    this.props.onSelectedCustomerCallback(customer);
  }



  showAllCustomers = () => {
    return(
      this.state.allCustomers.map((customer,i) => {
        return (
          <tr key={i}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td><button
              type="button"
              onClick={() => { this.selectCustomer(customer) }}
            >Select</button></td>
            <td><Link to="/customer/details"><button type="button">Details</button></Link></td>
          </tr>
        )
      })
    )
  };


  render(){
    return(
      <Router>
        <section>
          <h2>List of Customers</h2>
          <table border="1" cellSpacing="5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.showAllCustomers()}
            </tbody>
          </table>

          <Switch>
            <Route path="/customers/details">
              {/* <CustomerDetails /> */}
            </Route>
          </Switch>
        </section>
      </Router>
      
    );
  }
}

export default Customers;
