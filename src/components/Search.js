import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import SearchBar from './SearchBar';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      searchedMovies: [],
      error: '',
    }
  }

  resetState = () => {
    this.setState({
      searchedMovies: [],
    });
  }

  selectMovie = (movie) => {
    this.setState({
      selectedMovie: movie,
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
        if (response.data !== undefined) {
          console.log(response)
          this.setState({
            searchedMovies: response.data
          });
        };
      })
      .catch((error) => {
        this.setState({
          error: error.errors,
          searchedMovies: [],
        });
      })
    }
  }

  addMovie = (movie) => {
    axios.post('http://localhost:4000/movies', movie)
    .then(() => {
    })
    .catch((error) => {
      this.setState({
        error: error.message,
        searchedMovies: [],
      })
    })
  }

  listMovies = () => {
    return(
      this.state.searchedMovies.map((movie, i) => {
        return (
          <div className="movie" key={i}>
            <img src={movie.image_url} alt={movie.title} onClick={() =>  { this.selectMovie(movie) }} className={(movie === this.state.selectedMovie ? "selected-border" : null)}></img>
            <button onClick={() => this.addMovie(movie)}>Add Movie to Inventory</button>
          </div>
        )
      })
    )
  }

  render() {
    return (
      <section>
        <SearchBar
          submitSearchTermCallback={this.searchMovie}
        />
        {this.state.error}
        <section className="movie-list">{this.listMovies()}</section>
      </section>
    );
  }
};

Search.propTypes = {
  
};

export default Search;
