import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PokeApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      pokemons: []
    };
  }
  
  datosPokemon(url) {
     return fetch(url)
     .then(res => res.json())
     .then(resp => {
       return resp;
     })
  }

  componentDidMount() {

    //const URL = "https://pokeapi.co/api/v2/pokemon-form/?limit=980";
    const URL = "https://pokeapi.co/api/v2/pokemon-form/";
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {

          let pk = [];

          result.results.forEach(poke => {
            pk.push(this.datosPokemon(poke.url));
          });

          Promise.all(pk).then(resp => {

            console.log(resp[0]);
            
            this.setState({
              isLoaded: true,
  
              // Almacenamos el contenido de cada pokemon (nombre y url) en pokemons
                pokemons: resp
            })
            
          })
        }
      )
  }

  render() {
    const { error, isLoaded, pokemons } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <div id='pokemons'>
          {pokemons.map(pokemon => (
            <div id={pokemon.name} class ='pokemon' key={pokemon.name}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      );
    }
  }
}

class Cabecera extends React.Component {
  render() {
     return (
      <header>
        sdsad
      </header>
     );
  }
}

class Pie extends React.Component {
  render() {
     return (
      <footer>
        sdsad
      </footer>
     );
  }
}

class App extends React.Component {
  render() {
     return (
      <div>
        <Cabecera/>
        <PokeApi/>
        <Pie/>
      </div>
     );
  }
}
// ========================================

ReactDOM.render(
  <App />, document.getElementById('root')
);