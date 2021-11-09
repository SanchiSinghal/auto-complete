import axios from 'axios'
import React, { useState } from 'react'

import { debounce, generateList } from '../util/helper'

export default function AutoCompleteFunction() {
  const [searchTerm, setSearchTerm] = useState()
  const [searchedData, setSearchedData] = useState(undefined)

  const handleSearch = async (searchTerm = '') => {
    setSearchTerm(searchTerm)
    // Using an IIFE
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums')
    if (searchTerm)
      setSearchedData(data.filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase())))
    else
      setSearchedData(data)
  }

  const handleChange = debounce((value) => handleSearch(value))

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
              : generateList(searchedData, searchTerm)
        }
      </div>
    </div>
  )
}
