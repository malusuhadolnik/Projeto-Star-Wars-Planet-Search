import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const values = useMemo(() => ({
    isLoading,
    data,
    filters,
    setFilters,
  }), [isLoading, data, filters, setFilters]);

  return (
    <StarWarsContext.Provider value={ values }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired, // dica do Breno Lavalle, turma 25B
};
