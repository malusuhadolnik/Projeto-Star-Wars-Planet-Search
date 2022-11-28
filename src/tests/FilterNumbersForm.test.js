import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockStarWarsAPI from './helpers/mockStarWarsAPI'

describe('Testa componente FilterNumbersForm', () => {
    test('se ao selecionar surface_water maior que 20 o filtro retorna 3 linhas de tabela', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockStarWarsAPI)
    })

        render(<App />);

        await screen.findByText('Hoth')
        expect(screen.getAllByRole('row')).toHaveLength(11)


        const columnFilter = screen.getByTestId('column-filter');
        const comparisonFilter = screen.getByTestId('comparison-filter');
        const valueFilter = screen.getByTestId('value-filter');
        const filterButton = screen.getByRole('button', { name: 'Filtrar' });


        userEvent.selectOptions(columnFilter,  ['surface_water']);
        userEvent.selectOptions(comparisonFilter, ['maior que']);
        userEvent.type(valueFilter, '20');
        userEvent.click(filterButton);

        const tableRows = screen.getAllByRole('row');
        waitFor(() => expect(tableRows).toHaveLength(2));

      });

    test('se o botão remover filtro único funciona', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockStarWarsAPI)
      })
  
          render(<App />);
  
          await screen.findByText('Tatooine')
          expect(screen.getAllByRole('row')).toHaveLength(11)
  
        const selectDropdownMenus = screen.getAllByRole('combobox');
        const valueFilter = screen.getByTestId('value-filter');
        const filterButton = screen.getByRole('button', { name: 'Filtrar' });

        userEvent.selectOptions(selectDropdownMenus[0],  ['diameter']);
        userEvent.selectOptions(selectDropdownMenus[1], ['igual a']);
        userEvent.type(valueFilter, '10465');
        userEvent.click(filterButton);

        const removeFilterBtn = screen.getByText('Remover este filtro')
        waitFor(() => expect(removeFilterBtn).toBeInTheDocument());

        waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(3));

        userEvent.click(removeFilterBtn);

        const tableRows = screen.getAllByRole('row');
        waitFor(() => expect(tableRows).toHaveLength(9));        

      });

    test('se o botão de remover todos os filtros funciona', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockStarWarsAPI)
      })
  
          render(<App />);
  
          await screen.findByText('Alderaan')  //sem isto o teste não passa, nem dá cobertura
          expect(screen.getAllByRole('row')).toHaveLength(11)
  

        const selectDropdownMenus = screen.getAllByRole('combobox');
        const valueFilter = screen.getByTestId('value-filter');
        const filterButton = screen.getByRole('button', { name: 'Filtrar' });

        userEvent.selectOptions(selectDropdownMenus[0],  ['population']);
        userEvent.selectOptions(selectDropdownMenus[1], ['menor que']);
        userEvent.type(valueFilter, '60000000');
        
        expect(selectDropdownMenus[0]).toHaveValue('population')
        expect(selectDropdownMenus[1]).toHaveValue('menor que')

        userEvent.click(filterButton);

        waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(4));

        userEvent.selectOptions(selectDropdownMenus[0],  ['diameter']);
        userEvent.selectOptions(selectDropdownMenus[1], ['menor que']);
        userEvent.type(valueFilter, '10000');
        userEvent.click(filterButton);

        waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(5));

        const removeFilterBtn = screen.getByText('Remover todas filtragens');
        userEvent.click(removeFilterBtn);

        waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(9));

      });

});