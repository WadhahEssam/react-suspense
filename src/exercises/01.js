// Simple Data-fetching

// http://localhost:3000/isolated/exercises/01

import React from 'react'
import {PokemonDataView, ErrorBoundary} from '../utils'
import fetchPokemon from '../fetch-pokemon'


// this is only to make the code that we already dealt with more readable, and it is suggested by facebook
// in the react docs of suspense 
function createResource(asyncFn) {
  let result;
  let error;
  let promise = asyncFn().then(
    r => (result = r),
    e => (error = e), // catching an error
  )

  return {
    read: () => {
      // this is something  called error boundaries, it is a react feature, where you throw an error
      // to tell react to render something if an error happened.
      if (error) {
        throw error;
      }

      // this way is probably going to change, ( detecting when to return a promise )
      if (!result) {
        throw promise; 
      }

      return result;
    }
  }
}

let pokemonResource = createResource(() => fetchPokemon('pikachu'))

window.FETCH_TIME = 3000

function PokemonInfo() {
  const pokemon = pokemonResource.read();
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
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading pokemon info</div>}>
          <PokemonInfo />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
