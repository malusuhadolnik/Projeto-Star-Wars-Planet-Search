import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
// import React from 'react';

function Table() {
  const { data } = useContext(StarWarsContext);
  // const [search, setSearch] = useState([]);

  return (
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>rotation period</td>
          <td>orbital period</td>
          <td>diameter</td>
          <td>climate</td>
          <td>gravity</td>
          <td>terrain</td>
          <td>surface water</td>
          <td>population</td>
          <td>films</td>
          <td>created</td>
          <td>edited</td>
          <td>url</td>
        </tr>
        {
          data.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited}</td>
              <td>{ planet.url }</td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

export default Table;
