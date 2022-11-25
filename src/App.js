import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import FilterTextForm from './components/FilterTextForm';
import FilterNumbersForm from './components/FilterNumbersForm';
import './App.css';

function App() {
  return (
    // <span>Hello, App!</span>
    <StarWarsProvider>
      <FilterTextForm />
      <FilterNumbersForm />
      <Table />
    </StarWarsProvider>
    // <Table />
  );
}

export default App;
