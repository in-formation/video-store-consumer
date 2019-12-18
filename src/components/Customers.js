import React, { Component } from 'react';
import axios from 'axios';

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

  showAllCustomers = () => {
    return(
      this.state.allCustomers.map((customer,i) => {
        return (
          <tr key={i}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>Button</td>
          </tr>
        )
      })
    )
  };


  render(){
    return(
      <section>
        <h2>List of Customers</h2>
        <table border="1" cellSpacing="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.showAllCustomers()}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Customers;
