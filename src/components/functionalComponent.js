import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { debounce } from '../util/helper';

export default function AutoCompleteFunction() {
  const [searchedData, setSearchedData] = useState(undefined)

  const handleSearch = async (searchTerm = '') => {
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
      setSearchedData(fetchData)
    }
    else
      setSearchedData(data)
  };

  const handleChange = debounce((value) => handleSearch(value), 500);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search here..."
        onChange={e => handleChange(e.target.value)}
      />
      <div>
        {
          !searchedData ? <div></div>
            : !searchedData.length ? <h3>No search result found...</h3>
              : <ul>{searchedData}</ul>
        }
      </div>
    </div>
  );
}
