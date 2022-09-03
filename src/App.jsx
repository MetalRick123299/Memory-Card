import { useEffect } from 'react';
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
        id: id,
      };

      return [...prev, newCard];
    });
  }
  const [cards, setCards] = useState([
    {
      name: 'Bulbasaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      id: 1,
    },
    {
      name: 'Ivysaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      id: 2,
    },
    {
      name: 'Venusaur',
      sprite:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      id: 3,
    },
  ]);

  function getNodeIndex(elm) {
    const c = elm.parentNode.children;
    for (let i = 0; i < c.length; i++) if (c[i] == elm) return i;
  }
  function clickCard(e) {
    const id = getNodeIndex(e.target.parentNode);
    const pokeId = cards[id].id;

    if (clickedCards.findIndex((card) => card === pokeId) !== -1) {
      console.log('Loser');
      setCurrScore(0);
      setClickedCards([]);
      setCards([
        {
          name: 'Bulbasaur',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          id: 1,
        },
        {
          name: 'Ivysaur',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
          id: 2,
        },
        {
          name: 'Venusaur',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
          id: 3,
        },
      ]);
      setLevel(1);
      return;
    }

    setClickedCards((prev) => [...prev, pokeId]);

    setCurrScore((prev) => prev + 1);

    setCards((prev) => prev.sort((a, b) => 0.5 - Math.random()));
  }

  const [clickedCards, setClickedCards] = useState([]);

  const [currScore, setCurrScore] = useState(0);
  const [level, setLevel] = useState(1);

  const LOCAL_BEST_SCORE = localStorage.getItem('bestScore');
  const LOCAL_BEST_LEVEL = localStorage.getItem('bestLvl');
  const [bestScore, setBestScore] = useState(LOCAL_BEST_SCORE || 0);
  const [bestLvl, setBestLvl] = useState(LOCAL_BEST_LEVEL || 1);

  useEffect(() => {
    if (currScore >= bestScore) setBestScore(currScore);

    const currCardsNum = level + 2;
    if (currScore >= currCardsNum) {
      setLevel((prev) => prev + 1);

      const randNum = Math.floor(Math.random() * pokemonArray.length);
      addNewPokemon(randNum);

      setClickedCards([]);
      setCurrScore(0);
    }
  }, [currScore]);

  useEffect(() => {
    if (level > bestLvl) setBestLvl(level);
  }, [level]);

  useEffect(() => {
    localStorage.setItem('bestScore', bestScore);
    localStorage.setItem('bestLvl', bestLvl);
  }, [bestLvl, bestScore]);

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
        <div className="flex justify-around items-center mt-10 w-screen">
          <div className="bg-red-500 stats justify-center">
            Current Score: {currScore}
          </div>
          <div className="bg-black stats justify-center">
            Current Level: {level}
          </div>
          {/* <button
            onClick={() => {
              const randNum = Math.floor(Math.random() * pokemonArray.length);
              const currId = pokemonArray.splice(randNum, 1);
              addNewPokemon(currId);
            }}
          >
            Button
          </button> */}
          <div className="bg-blue-500 stats justify-evenly">
            <span>Best Score: {bestScore}</span>
            <span>Best Level: {bestLvl}</span>
          </div>
        </div>
        <div className="flex flex-row justify-center flex-wrap gap-5 py-5 px-16">
          {/* {console.log(cards)} */}
          {cards.map((card) => (
            <Card
              key={card.name}
              name={card.name}
              sprite={card.sprite}
              onClick={clickCard}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
