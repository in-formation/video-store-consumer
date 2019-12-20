import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Search from './components/Search';
import Customers from './components/Customers';
import Library from './components/Library';
import axios from 'axios';

function Home() {
  return <h2>Home</h2>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      selectedCustomer: {},
    }
  }

  setMovieState = (movie) => {
    this.setState({
      selectedMovie: movie
    })
  };

  setCustomerState = (customer) => {
    this.setState({
      selectedCustomer: customer
    })
  }

  addRental = () => {
    axios.post(`http://localhost:4000/rentals/${this.state.selectedMovie.title}/check-out`, {
      customer_id: this.state.selectedCustomer.id
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        error: error.message,
      })
    })
  }


  render() {
    return (
      <Router>
        <div>
          <div>
            <ul className="info-bar">
              <li>{this.state.selectedMovie ? this.state.selectedMovie.title : null}</li>
              {/* <li>{this.state.selectedCustomer ? this.state.selectedCustomer.name : null}</li> */}
            </ul>
            <button onClick={this.addRental}>Checkout</button>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/library">
              <Library 
                onSelectedMovieCallback={this.setMovieState}
              />
            </Route>
            <Route path="/customers">
              <Customers
                onSelectedCustomerCallback={this.setCustomerState}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
}

export default App
