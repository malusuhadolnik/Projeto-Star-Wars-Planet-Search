import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockStarWarsAPI from './helpers/mockStarWarsAPI'
import StarWarsProvider from '../context/StarWarsProvider';

describe('Testa componente FilterTextForm', () => {
    test('se ao digitar o nome de um planeta na busca de texto, seu valor é capturado', () => {
        render(<App />);
    
        const textInput = screen.getByTestId('name-filter');
        expect(textInput).toBeInTheDocument();

        const searchedPlanet = 'alderaan'
        userEvent.type(textInput, searchedPlanet);
        expect(textInput).toHaveValue(searchedPlanet);

      });
      test('se ao digitar o nome de um planeta na busca de texto, ele é filtrado', async () => {
        global.fetch = jest.fn().mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockStarWarsAPI)
      })
  
          render(<App />);
  
          await screen.findByText('Alderaan')
          expect(screen.getAllByRole('row')).toHaveLength(11)
    
        const textInput = screen.getByTestId('name-filter');
        userEvent.type(textInput, 'alderaan');

        waitFor(() => expect(screen.getAllByRole('Alderaan')).toBeInTheDocument);

      });
});