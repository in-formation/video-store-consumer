import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    }
  }

  resetState = () => {
    this.setState({
      searchTerm: '',
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const query = this.state.searchTerm

    this.setState({
      searchTerm: '',
    })
    console.log("the query is", query)
    this.props.submitSearchTermCallback(query);
    this.resetState();
  }

  onFormChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState)
  }

  render() {
    return (
      <div>
        <h2>Search Movie Here</h2>
        <form onSubmit={this.onSubmit}>
          <div>
            <input 
              onChange={this.onFormChange} 
              value={this.state.searchTerm}
              name="searchTerm"
              placeholder="Psycho"
            />
          </div>
          <input
            type="submit"
            name="submit"
            value="Search the Movie"
          />
        </form>
      </div>
    )
  }
}

export default SearchBar;
