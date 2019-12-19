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
  return <img src="http://storage.googleapis.com/wzukusers/user-20421638/images/57acd46107e18N5ndobw/82ET.jpg" alt="et phone home"></img>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      selectedCustomer: {},
    }
  }

  resetState = () => {
    this.setState({
      selectedMovie: {},
      selectedCustomer: {},
    });
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
    .then(() => {
      this.resetState()
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
              <li>{Object.values(this.state.selectedMovie).length !== 0 ? 'Selected Movie:' : null} {this.state.selectedMovie ? this.state.selectedMovie.title : null}</li>
              <li>{Object.values(this.state.selectedCustomer).length !== 0 ? 'Selected Customer:' : null} {this.state.selectedCustomer ? this.state.selectedCustomer.name : null}</li>
              <li>
                {console.log(this.state.selectedCustomer)}
                {Object.values(this.state.selectedMovie).length !== 0 && Object.values(this.state.selectedCustomer).length !== 0 ? <button onClick={this.addRental}>Checkout</button> : null}
              </li>
            </ul>
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
          <h1>
            Blockbuster LLC
          </h1>

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
