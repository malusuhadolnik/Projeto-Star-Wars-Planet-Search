import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const dataJson = await response.json();
        const onlyResults = dataJson.results;

        const filteredResults = onlyResults.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setData(filteredResults);
      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchData();
  }, []);

  const values = useMemo(() => ({
    data,
    filters,
    setFilters,
  }), [data, filters, setFilters]);

  return (
    <StarWarsContext.Provider value={ values }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired, // dica do Breno Lavalle, turma 25B
};
