import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let pokemones = [];

let resultados = [];

class PokeApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemons: []
    };
  }
  
  componentDidMount() {

    const URL = "https://pokeapi.co/api/v2/pokemon-form";
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {

          /*this.setState({
            isLoaded: true,

            // Almacenamos el contenido de cada pokemon (nombre y url) en pokemons
            pokemons: result.results
          });*/

          let lista = result.results;
            
          lista.forEach(item => {
            pokemones.push(item.url);
          });

          pokemones.forEach(poke => {
            
            fetch(poke)
            .then(res => res.json())
            .then(
              (result) => {

                
                resultados.push(result);
                
                console.log(result.name);
                
                console.log(result.sprites.front_default);
                
              },
            )
          });

          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        } 
      )

      this.setState({
        isLoaded: true,

        // Almacenamos el contenido de cada pokemon (nombre y url) en pokemons
        pokemons: resultados
      });

      
      
  }

  render() {
    const { error, isLoaded, pokemons } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.name}>
              {pokemon.name}
              <li key={pokemon.url}>
                {pokemon.url}
              </li>
            </li>
          ))}
        </ul>
      );
    }
  }
}

// ========================================

ReactDOM.render(
  <PokeApi />,
  document.getElementById('root')
);
