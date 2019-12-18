import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from './SearchBar';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedMovie: {},
      error: '',
      isInRentalLibrary: false,
    }
  }

  resetState = () => {
    this.setState({
      searchedMovie: {},
    });
  }

  searchMovie = (query) => {
    if (query !== null) {
      axios.get('http://localhost:4000/movies', {
        params: {
          query: query,
        }
      })
      .then((response) => {
        console.log(response.data[0])
        this.setState({
          searchedMovie: response.data[0]
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errors,
          searchedMovie: {},
        });
      })
    }
    // this.localSearch()
  }

  addMovie = () => {
    axios.post('http://localhost:4000/movies', this.state.searchedMovie)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        error: error.message,
        searchedMovie: {},
      })
    })
    // this.resetState()
  }

  // localSearch = () => {
  //   axios.get(`http://localhost:4000/movies/${this.state.searchedMovie.title}`)
  //   .then((response) => {
  //     if (this.state.searchedMovie && response.data.title === this.state.searchedMovie.title) {
  //       this.setState({
  //         isInRentalLibrary: true,
  //       })
  //     }
  //     console.log(this.state.isInRentalLibrary)
  //   })
  //   .catch((error) => {
  //     this.setState({
  //       isInRentalLibrary: false,
  //       error: error.errors,
  //     })
  //   })
  // }

  render() {
    return (
      <section>
        <SearchBar
          submitSearchTermCallback={this.searchMovie}
        />
        {this.state.error}
        {Object.values(this.state.searchedMovie).length !== 0 ? <img src={this.state.searchedMovie.image_url} alt={this.state.searchedMovie.title}></img> : null}
        {/* {this.state.isInRentalLibrary && this.state.searchedMovie.title !== undefined ? 'Movie is in Rental Library' : 'Movie is Not in Rental Library'} */}
        {console.log(this.state.searchedMovie)}
        {Object.values(this.state.searchedMovie).length !== 0 ? <button onClick={this.addMovie}>Add Movie to Inventory</button> : null}
        
      </section>
    );
  }
};

Search.propTypes = {
  
};

export default Search;
