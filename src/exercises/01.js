// Simple Data-fetching

// http://localhost:3000/isolated/exercises/01

import React from 'react'
import {PokemonDataView} from '../utils'
import fetchPokemon from '../fetch-pokemon'

let pokemon;
let pokemonPromise = fetchPokemon('pikachu').then(
  p => (pokemon = p),
)

window.FETCH_TIME = 3000

function PokemonInfo() {
  // this way is probably going to change, ( detecting when to return a promise )
  if (!pokemon) {
    throw pokemonPromise; 
  }

  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  // What is happening
  // if any component inside of the component <React.Suspense> is returning 
  // a promise, then the <React.Suspense> is going to render the stuff that are inside
  // of the fallback prop, until the promise is resolved, and after that it will actually
  // render the component that is inside of the <React.Suspense> 
  return (
    <div className="pokemon-info">
      <React.Suspense fallback={<div>Loading pokemon info</div>}>
        <PokemonInfo />
      </React.Suspense>
    </div>
  )
}

export default App
