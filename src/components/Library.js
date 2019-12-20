import React, { Component } from 'react';
import axios from 'axios';
import './Library.css';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: {},
      allMovies: [],
      error: '',
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/movies')
    .then((response) => {
      this.setState({
        allMovies: response.data
      });
      this.props.allMoviesCallback(this.state.allMovies)
    })
    .catch((error) => {
      this.setState({
        error: error.errors,
      });
    })
  }

  selectMovie = (movie) => {
    this.setState({
      selectedMovie: movie,
    });
    this.props.onSelectedMovieCallback(movie);
  }

  listMovies = () => {
    return(
      this.state.allMovies.map((movie, i) => {
        return (
          <div className="movie" key={i}>
            <h4>{movie.title}</h4>
            <img src={movie.image_url} alt={movie.title} onClick={() =>  { this.selectMovie(movie) }} className={(movie === this.state.selectedMovie ? "selected-border" : null)}></img>
            <p>{movie.overview}</p>
          </div>
        )
      })
    )
  }

  render(){
    return(
      <section className="movie-list">
        {this.listMovies()}
      </section>
    )
  }
}

export default Library;
