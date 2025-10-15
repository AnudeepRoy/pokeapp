import { useEffect, useState } from "react";
import PokemonCard from "../components/card";
import { Grid } from "@mui/material";

export default function FilterByType({selectedType, getPokemonIdFromUrl}) {

    useEffect(() => {
        fetchData(`https://pokeapi.co/api/v2/type/${selectedType}/?limit=151`, setTypePokemons);
    }, [selectedType]);

    const [typePokemons, setTypePokemons] = useState([]);
    const [loading, setLoading] = useState(true);

    function fetchData(url, setter) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setter(data.pokemon);
            setLoading(false);
        }
        )
        .catch(error => console.error("Error fetching data:", error));
    }

  return (
    loading ? <p>Loading...</p> : (
        <div className="card-grid">
            <Grid container spacing={2}> 
                {typePokemons
                    .filter(entry => getPokemonIdFromUrl(entry.pokemon.url) < 151)
                    .map((entry, index) => (
                        <PokemonCard
                        key={index}
                        pokemon={entry.pokemon.name}
                        id={getPokemonIdFromUrl(entry.pokemon.url)}
                        />
                    ))
                }
            </Grid>
        </div>
    )
  )
}