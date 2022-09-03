import { useState } from 'react';
import Card from './components/Card';

function App() {
  let pokemonArray = [];

  for (let i = 4; i <= 905; i++) {
    pokemonArray.push(i);
  }

  async function addNewPokemon(id) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const res = await data.json();

    const resName = res.species.name;
    const resSprite =
      res.sprites.front_default || 'https://via.placeholder.com/150';

    setCards((prev) => {
      const newCard = {
        name: resName[0].toUpperCase() + resName.slice(1),
        sprite: resSprite,
      };

      return [...prev, newCard];
    });
  }

  const [cards, setCards] = useState([
    {
      name: 'Bulbasaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
      name: 'Ivysaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
    {
      name: 'Venusaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    },
  ]);

  const [clickedCards, setClickedCards] = useState([]);

  return (
    <div className="bg-white">
      <header className="bg-red-500 w-screen py-5 flex justify-center">
        <a href="https://fontmeme.com/shadow-effect/">
          <img
            src="https://fontmeme.com/permalink/220829/215fd743f978851e37e29ed61a053dac.png"
            alt="shadow-effect"
            border="0"
          />
        </a>
      </header>
      <div className="flex justify-center items-center bg-black h-5">
        <div className="bg-white h-20 w-20 rounded-full border-black border-8"></div>
      </div>
      <main className="flex flex-col gap-5 items-center">
        <div className="flex justify-around items-center mt-5 w-screen">
          <div className="bg-red-500 stats">Current Score:</div>
          <div className="text-2xl">Current Level: {1}</div>
          <button
            onClick={() => {
              const randNum = Math.floor(Math.random() * pokemonArray.length);
              const currId = pokemonArray.splice(randNum, 1);
              addNewPokemon(currId);
            }}
          >
            Button
          </button>
          <div className="bg-blue-500 stats">Best Score:</div>
        </div>
        <div className="flex flex-row justify-center flex-wrap gap-5 py-5 px-16">
          {/* {console.log(cards)} */}
          {cards.map((card) => (
            <Card key={card.name} name={card.name} sprite={card.sprite} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
