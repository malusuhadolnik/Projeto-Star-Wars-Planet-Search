import React from 'react';
import Table from './components/Table';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';

function App() {
  return (
    // <span>Hello, App!</span>
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
    // <Table />
  );
}

export default App;
