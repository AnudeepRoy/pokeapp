import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PokemonCard from "../components/card";
import { Grid } from "@mui/material";

export default function Pokecards() {
  
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/pokemon/?limit=151", setAllPokemons);
    fetchData("https://pokeapi.co/api/v2/type", setTypes);
    fetchData("https://pokeapi.co/api/v2/region", setRegions);
    fetchData(`https://pokeapi.co/api/v2/pokemon/?limit=151&offset=${offset}`, setPokemons);
    setLoading(false);
  }, []);

  function fetchData(url, setter) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        setter(data.results);
    })
    .catch(error => console.error("Error fetching data:", error));
  }

  function getPokemonIdFromUrl(url) {
    // Match the last number before an optional trailing slash
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : null;
  }
  
  return (
    <div className="filter-section">
      <Filters 
        allPokemons={allPokemons}
        types={types}
        regions={regions}
      />
      <h1>Pokecards Section</h1>
      {loading ? <p>Loading...</p> : (
        <div className="card-grid">
          <Grid container spacing={2}>
          {pokemons.map((pokemon, index) => (
              <PokemonCard key={index} pokemon={pokemon.name} id={getPokemonIdFromUrl(pokemon.url)} />
          ))}
           </Grid>
        </div>
      )}
    </div>
  )
}