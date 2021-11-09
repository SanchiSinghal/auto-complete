import React from 'react'
import './App.css'
import AutoCompleteFunction from './components/functionalComponent';
import AutoCompleteClass from './components/classComponent';

export default function App() {
  return (
    <div className="App">
      <h2>Functional Component</h2>
        <AutoCompleteFunction />
      <h2>Class Component</h2>
        <AutoCompleteClass />
    </div>
  );
}
