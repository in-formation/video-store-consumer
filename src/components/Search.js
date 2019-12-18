import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from './SearchBar';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      error: '',
    }
  }

  searchMovie = (query) => {
    console.log('querry is', query)
    axios.get('http://localhost:4000/movies', {
      params: {
        query: query,
      }
    })
    .then((response) => {
      console.log(response.data[0])
      this.setState({
        selectedMovie: response.data[0]
      });
    })
    .catch((error) => {
      this.setState({
        error: error.errors
      });
    })
  }

  render() {
    return (
      <section>
        <SearchBar
          submitSearchTermCallback={this.searchMovie}
        />

        {/* {console.log(this.state.selectedMovie)} */}
        {this.state.error}
        {/* {this.state.selectedMovie} */}
        {/* {this.state.selectedMovie.title} */}
      </section>
    );
  }
};

Search.propTypes = {
  
};

export default Search;