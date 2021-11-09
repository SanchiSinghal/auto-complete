import React from 'react';
import axios from 'axios';
import '../App.css';
import { debounce } from '../util/helper';

class AutoCompleteClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedData: undefined
    }
  }

  handleSearch = async (searchTerm = '') => {
    // Using an IIFE
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    if (searchTerm) {
      const fetchData = [];
      data.filter((d) => d.title.includes(searchTerm)).map((val, key) => {
        let re = new RegExp(searchTerm , 'g');
        let str = val.title.replace(re, `<mark>${searchTerm}</mark>`);
        fetchData.push(<li key={key} dangerouslySetInnerHTML={{
          __html: str
      }} />)
      });
      this.setState({ searchedData: fetchData })
    }
    else
      this.setState({ searchedData: data })
  };

  handleChange = debounce((value) => this.handleSearch(value), 500);

  render() {
    const { searchedData } = this.state;
    return (
      <React.Fragment>
      <input
        type="text"
        placeholder="Search here..."
        onChange={e => this.handleChange(e.target.value)}
      />
      <div>
        {
          !searchedData ? <div></div>
            : !searchedData.length ? <h3>No search result found...</h3>
              : <ul>{searchedData}</ul>
        }
      </div>
      </React.Fragment>
    );
  }
}

export default AutoCompleteClass;
