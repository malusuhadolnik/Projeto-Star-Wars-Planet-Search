import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterNumbersForm() {
  const { data, setSearch } = useContext(StarWarsContext);
  const [numInput, setNumInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = ({ target }) => {
    setNumInputs({ ...numInput, [target.name]: target.value });
  };

  const filterData = () => {
    console.log(selectedFilters);
    let filtered = [];

    switch (numInput.comparison) {
    case 'menor que':
      filtered = data.filter((planet) => { // resolução inspirada na gravação Mentoria de Revisão: Filtros e HOFs para o StarWars
        const bools = [];
        selectedFilters.forEach((singleFilter) => {
          bools.push(Number(planet[singleFilter.column]) < Number(singleFilter.value));
        });
        console.log(bools);
        console.log('entrou no case menor que');
        return bools.every((element) => element);
      });
      break;
    default:
      filtered = data;
      break;
    }
    console.log('chamou a func filterData');
    // console.log(filtered);
    return filtered;
  };

  const handleClick = () => {
    setSelectedFilters((prevState) => ([
      ...prevState,
      numInput,
    ]));
    console.log(selectedFilters);

    // setSearch(filterData());

    setNumInputs({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  // useEffect(() => {
  //   setSearch(filterData());
  // }, [setSearch, filterData]);

  return (
    <form>
      <label htmlFor="column-filter">
        Coluna
        <select
          data-testid="column-filter"
          name="column"
          value={ numInput.column }
          id="gender"
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          data-testid="comparison-filter"
          id="comparison"
          value={ numInput.quantity }
          name="comparison"
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ numInput.value }
          name="value"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </form>
  );
}