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

  const filterNumericData = useCallback(() => { // desenvolvida após mentoria com Tiago Quadros
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

    setNumInputs({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  useEffect(() => {
    setSearch(filterNumericData());
  }, [filterNumericData, setSearch]);

  const columnOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const removeOption = (option) => !selectedFilters.find((filter) => { // o retorno é se a opção é igual ou não à chave coluna do filtro (true or false)
    const teste = option === filter.column;
    // console.log(teste);
    return teste;
  });

  const handleRemoveAFilter = ({ target }) => {
    const targetColumn = target.value;
    console.log(targetColumn);
    const filtered = selectedFilters.filter((filter) => filter.column !== targetColumn);
    console.log(filtered);
    setSelectedFilters(filtered);
  };

  const handleRemoveAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div>
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
            {
              columnOptions.filter(removeOption).map((option) => (
                <option value={ option } key={ option }>{ option }</option>
              ))
            }
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
        >
          Remover todas filtragens
        </button>
      </form>
      <div>
        <h2>Filtros selecionados</h2>
        {
          selectedFilters.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <p>
                { `${filter.column} ${filter.comparison} ${filter.value}` }
              </p>
              <button
                type="button"
                value={ filter.column }
                name={ filter.column }
                onClick={ handleRemoveAFilter }
              >
                Remover este filtro
              </button>
            </div>

          ))
        }
      </div>
    </div>

  );
}
