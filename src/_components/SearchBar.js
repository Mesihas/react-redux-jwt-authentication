import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' }

  render() {
    return (
      <div className="search-bar ui segment">
        {/* <form  className="ui form">
          <div className="field">
            <label>Video SearchBar</label>
            <input 
              type="text" 
              // value={this.state.term} 
              // onChange={this.onInputChange}
            />
          </div>
        </form> */}
        SearchBar
      </div>
    );
  }
}

export default SearchBar;