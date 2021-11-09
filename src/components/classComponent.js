import axios from 'axios'
import { Fragment, Component } from 'react'

import { debounce, generateList } from '../util/helper'

class AutoCompleteClass extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      searchedData: undefined,
    }
  }

  handleSearch = async (searchTerm = '') => {
    // Using an IIFE
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/albums')
    if (searchTerm) {
      const searchedData = data.filter((d) => d.title.includes(searchTerm))
      this.setState({ searchedData, searchTerm })
    } else {
      this.setState({ searchedData: data, searchTerm })
    }
  }

  handleChange = debounce((value) => this.handleSearch(value))

  render() {
    const { searchedData, searchTerm } = this.state
    return (
      <Fragment>
        <input
          type="text"
          placeholder="Search here..."
          onChange={e => this.handleChange(e.target.value)}
        />
        <div>
          {
            !searchedData ? <div></div>
              : !searchedData.length ? <h3>No search result found...</h3>
                : generateList(searchedData, searchTerm)
          }
        </div>
      </Fragment>
    )
  }
}

export default AutoCompleteClass
