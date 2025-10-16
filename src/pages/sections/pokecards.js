import Filters from "../components/filters";
import { useEffect, useState } from "react";
import PokemonCard from "../components/card";
import { Grid } from "@mui/material";


import PokePagination from "../components/pagination";

import FilterByType from "./filterByType";
import FilterByRegion from "./filterByRegion";

export default function Pokecards() {
  
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  //pagination states
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(151 / itemsPerPage);

  //filter states
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/pokemon/?limit=2000", setAllPokemons);
    fetchData("https://pokeapi.co/api/v2/type", setTypes);
    fetchData("https://pokeapi.co/api/v2/region", setRegions);
    fetchData(`https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}&offset=${offset}`, setPokemons);
    setLoading(false);
  }, [page]);

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
        setSelectedPokemon={setSelectedPokemon}
        setSelectedType={setSelectedType}
        setSelectedRegion={setSelectedRegion}
      />
      
      {loading ? <p>Loading...</p> : (
        <div className="card-grid">
          {!(selectedPokemon || selectedType || selectedRegion) && (
            <PokePagination 
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              setOffset={setOffset}
            />
          )}
          <Grid container spacing={2}> 
            {selectedPokemon ? ( //this will show only the selected pokemon
               allPokemons
                .filter(pokemon => pokemon.name.toLowerCase() === selectedPokemon.toLowerCase())
                .map((pokemon, index) => (
                  <PokemonCard key={index} pokemon={pokemon.name} id={getPokemonIdFromUrl(pokemon.url)} />
                ))
            ) : selectedType ? ( //this will show pokemons of selected type
              <FilterByType 
                selectedType={selectedType}
                getPokemonIdFromUrl={getPokemonIdFromUrl}
              />
            ) : selectedRegion ? (
              <FilterByRegion 
                selectedRegion={selectedRegion}
              />
            ) : (
             pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon.name} id={getPokemonIdFromUrl(pokemon.url)} />
              ))
            )}
          </Grid>
           {!(selectedPokemon || selectedType || selectedRegion) && (
            <PokePagination 
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              setOffset={setOffset}
            />
          )}
        </div>
      )}
    </div>
  )
}