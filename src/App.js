import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import FilterForms from './components/FilterForm';
import './App.css';

function App() {
  return (
    // <span>Hello, App!</span>
    <StarWarsProvider>
      <FilterForms />
      <Table />
    </StarWarsProvider>
    // <Table />
  );
}

export default App;
