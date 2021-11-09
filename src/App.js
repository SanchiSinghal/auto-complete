import React from 'react'

import './App.css'
import AutoCompleteClass from './components/classComponent'
import AutoCompleteFunction from './components/functionalComponent'

export default function App() {
  return (
    <div className="App">
      <h2>Functional Component</h2>
      <AutoCompleteFunction />
      <h2>Class Component</h2>
      <AutoCompleteClass />
    </div>
  )
}
