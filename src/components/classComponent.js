import React from 'react';
import axios from 'axios';
import '../App.css';
import { debounce } from '../util/helper';

class AutoCompleteClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchedData: undefined,
      searchTerm: ''
    }
  }

  handleSearch = async (searchTerm = '') => {
        // Using an IIFE
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    if (searchTerm) {
      const searchedData = data.filter((d) => d.title.includes(searchTerm))
      this.setState({searchedData, searchTerm })
    } else {
      this.setState({searchedData: data, searchTerm })
    }
  };

  handleChange = debounce((value) => this.handleSearch(value), 500);

  render() {
    const { searchedData, searchTerm } = this.state;
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
              :  <ul>{searchedData.map((data, key) => {
                let re = new RegExp(searchTerm , 'gi');
                let str = data.title.replace(re, `<mark>${searchTerm}</mark>`);
                return <li key={key} dangerouslySetInnerHTML={{__html: str }} />
              })}
              </ul>
        }
      </div>
      </React.Fragment>
    );
  }
}

export default AutoCompleteClass;
