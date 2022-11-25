import React, { useState, useContext, useEffect, useCallback } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterNumbersForm() {
  const { setSearch, data } = useContext(StarWarsContext);
  const [numInput, setNumInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = ({ target }) => {
    setNumInputs({ ...numInput, [target.name]: target.value });
  };

  // const filterData = useCallback(() => {
  //   if (selectedFilters.length > 0 && numInput.comparison === 'igual a') {
  //     const filtered = data.filter((planet) => {
  //       const bools = [];
  //       selectedFilters.forEach((singleFilter) => {
  //         bools.push(Number(planet[singleFilter.column]) === Number(singleFilter.value));
  //       });
  //       return bools.every((element) => element); // (element) => element === true, tiramos  a comparação pq vai ficar redundante
  //       // resolução inspirada na gravação Mentoria de Revisão: Filtros e HOFs para o StarWars
  //     });
  //     setSearch(filtered);
  //   }
  //   if (selectedFilters.length > 0 && numInput.comparison === 'menor que') {
  //     const filtered = data.filter((planet) => {
  //       const bools = [];
  //       selectedFilters.forEach((singleFilter) => {
  //         bools.push(Number(planet[singleFilter.column]) < Number(singleFilter.value));
  //       });
  //       return bools.every((element) => element);
  //     });
  //     setSearch(filtered);
  //   }
  //   if (selectedFilters.length > 0 && numInput.comparison === 'maior que') {
  //     const filtered = data.filter((planet) => {
  //       const bools = [];
  //       selectedFilters.forEach((singleFilter) => {
  //         bools.push(Number(planet[singleFilter.column]) > Number(singleFilter.value));
  //       });
  //       return bools.every((element) => element);
  //     });
  //     setSearch(filtered);
  //   }
  // }, [data, numInput.comparison, selectedFilters, setSearch]);

  const filterNumericData = useCallback(() => {
    const filter = data.filter((planet) => {
      const filterResults = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'maior que':
          return Number(planet[column]) > Number(value);
        case 'menor que':
          return Number(planet[column]) < Number(value);
        case 'igual a':
          return Number(planet[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterResults.every((element) => element);
    });
    return filter;
  }, [data, selectedFilters]);

  const handleClick = () => {
    setSelectedFilters((prevState) => ([
      ...prevState,
      numInput,
    ]));
  };

  // useEffect(() => {
  //   filterData();
  // }, [filterData]);

  useEffect(() => {
    setSearch(filterNumericData());
  }, [filterNumericData, setSearch]);

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
