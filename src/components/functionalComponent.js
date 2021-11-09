import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { debounce } from '../util/helper';

export default function AutoCompleteFunction() {
  const [searchedData, setSearchedData] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState();

  const handleSearch = async (searchTerm = '') => {
    setSearchTerm(searchTerm)
    // Using an IIFE
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums');
    if (searchTerm)
      setSearchedData(data.filter((d) => d.title.includes(searchTerm)))
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
              : <ul>{searchedData.map((data, key) => {
                  let re = new RegExp(searchTerm , 'gi');
                  let str = data.title.replace(re, `<mark>${searchTerm}</mark>`);
                  return <li key={key} dangerouslySetInnerHTML={{__html: str }} />
                })}
                </ul>
        }
      </div>
    </div>
  );
}
