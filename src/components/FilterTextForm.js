import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function FilterTextForm() {
  const { data, setFilters, setSearch } = useContext(StarWarsContext);
  const [inputs, setInputs] = useState({
    typedText: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleTypedText = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
    setFilters(inputs);

    if (target.name) {
      const filteredName = data.filter((planet) => (
        planet.name.toUpperCase().includes(target.value.toUpperCase())
      ));
      console.log(filteredName);
      setSearch(filteredName);
    } else {
      setSearch(data);
    }
  };

  return (
    <form>
      <label htmlFor="nametypedText">
        Nome:
        <input
          data-testid="name-filter"
          type="text"
          name="typedText"
          value={ inputs.typedText }
          id="typedText"
          onChange={ handleTypedText }
        />
      </label>
    </form>
  );
}
