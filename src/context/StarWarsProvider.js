import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

// O Provider é um componente do Context. É por isso que os estados que criamos aqui são chamados com o useContext
export default function StarWarsProvider({ children }) { // estes são os "estados globais" da aplicação, que serão compartilhados com os componentes filhos
  const [data, setData] = useState([]); // armazena retorno da API
  const [filters, setFilters] = useState([]); // irá armazenar quais filtros foram seleciondaos pelo usuário
  const [search, setSearch] = useState([]);

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
        setSearch(filteredResults);
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
    search,
    setSearch,
  }), [data, filters, setFilters, search, setSearch]);

  return (
    <StarWarsContext.Provider value={ values }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired, // dica do Breno Lavalle, turma 25B
};
