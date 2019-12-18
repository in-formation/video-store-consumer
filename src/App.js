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

  render() {
    return (
      <Router>
        <div>
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
