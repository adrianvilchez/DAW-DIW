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

  componentDidMount() {

    const URL = "https://pokeapi.co/api/v2/pokemon";
    fetch(URL)
      .then(res => res.json())
      .then(
        (result) => {

          console.log(result.results[0].name);
          
          this.setState({
            isLoaded: true,
            pokemons: result.results
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
