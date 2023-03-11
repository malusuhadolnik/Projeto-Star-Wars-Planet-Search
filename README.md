# Projeto Star Wars Planet Search

# Sobre
Este projeto foi desenvolvido durante o Módulo 2 - Front-End do curso de Desenvolvimento Web da Trybe. 

Nesta aplicação, a pessoa usuária pode pesquisar os planetas da franquia Star Wars através de filtros compostos:
- Filtro por nome do planeta, que atualiza a tabela à medida em que a pessoa usuária digita;
- Filtros numéricos para as colunas Population, Orbital period, Diameter, Rotation period e Surface water, que podem ser combinados para retornar um resultado mais específico (ex.: Orbital period maior que 400 e Diameter menor que 10000).
- É possível limpar todos os filtros definidos para que uma nova busca seja realizado


Esta aplicação consome os dados da **The Star Wars API** para realizar a busca por planetas (endpoint:
https://swapi.dev/api/planets).

Também foram desenvolvidos testes unitários/integração usando a biblioteca React Testing Library.

Os arquivos desenvolvidos por mim estão na pasta src, com exceção de setupTests.js. Os demais foram desenvolvidos pelo time da Trybe.

## Tecnologias usadas

React.js, Context API, React Hooks, React Testing Library

## Instalando Dependências

```bash
cd src/
npm install
``` 

## Executando aplicação

  ```
    cd src/ && npm start
  ```
