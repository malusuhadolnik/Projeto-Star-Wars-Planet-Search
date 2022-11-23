// import React, { useContext, useEffect, useState } from 'react';
// import StarWarsContext from '../context/StarWarsContext';
import React from 'react';

function Table() {
  // const { data, filters, isLoading } = useContext(StarWarsContext);
  return (
    <div>
      <h2>Renderiza tabela</h2>
      <Table>
        <tr>
          <td>Name</td>
          <td>rotation_period</td>
          <td>orbital_period</td>
          <td>diameter</td>
          <td>climate</td>
          <td>gravity</td>
          <td>terrain</td>
          <td>surface_water</td>
          <td>population</td>
          <td>films</td>
          <td>created</td>
          <td>edited</td>
          <td>url</td>
        </tr>
      </Table>

    </div>
  );
}

export default Table;
