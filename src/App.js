import React,{useState, useEffect} from 'react'
import './App.css';
// import {data} from './util/mockdata'
import axios from 'axios';

function App() {
  const [searchTerm,setSearchTerm] = useState('')
  const [searchedData, setData] = useState('')

  useEffect(() => {
    // Using an IIFE
    const searchTitle = async() => {
      const fetchData = [];
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        const data = response.data;
        await data.filter((val)=>{
        if(searchTerm === ""){
          return val
        }
        else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
          return val;
        }
      }).map((val, key) => {
        let re = new RegExp(searchTerm , 'g');
        let str = val.title.replace(re, `<mark>${searchTerm}</mark>`);
        fetchData.push(<li dangerouslySetInnerHTML={{
          __html: str
      }} />)
      });
      setData(fetchData)
    };
    searchTitle();
  }, [searchedData]);

  return (
    <div className="App">
      <input type="text" placeholder="search..." onChange={e=>setSearchTerm(e.target.value)} />
      {searchedData}
    </div>
  );
}

export default App;
