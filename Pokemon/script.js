const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const colors = {
  Fire: "#FDDFDF",
  Grass: "#DEFDE0",
  Electric: "#FCF7DE",
  Water: "#DEF3FD",
  Ground: "#f4e7da",
  Rock: "#d5d5d4",
  Fairy: "#fceaff",
  Poison: "#98d7a5",
  Bug: "#f8d5a3",
  Dragon: "#97b3e6",
  Psychic: "#eaeda1",
  Flying: "#F5F5F5",
  Fighting: "#E6E0D4",
  Normal: "#F5F5F5",
  Ice: "#e0f5ff",
};

const pokeCount = 100;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemon(data);
};

const createPokemon = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const weight = pokemon.weigh;
  const type =
    pokemon.types[0].type.name[0].toUpperCase() +
    pokemon.types[0].type.name.slice(1);
  const color = colors[type];
  // const type = pokemon.types.map((typeEntry) => typeEntry.type.name);
  // const color = type.map((type) => colors[type]);

  const pokemonElement = document.createElement("div");
  pokemonElement.classList.add("poke-box");
  pokemonElement.style.backgroundColor = `${color}`;



  pokemonElement.innerHTML = `
     <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">

            <p class="poke-id">#${id}</p>
            <h4 class="poke-name">${name}</h4>
            <p class="poke-class">Type: ${type}</p>
    `;
  pokeContainer.appendChild(pokemonElement);
};

initPokemon();

searchInput.addEventListener("input", function (e) {
  const pokeNames = document.querySelectorAll(".poke-name")
  const search = searchInput.value.toLowerCase();

  pokeNames.forEach(pokeName => {
    pokeName.parentElement.style.display = "block";

    if(!pokeName.innerHTML.toLowerCase().includes(search)) {
        pokeName.parentElement.style.display = "none";
    }
  });



});
