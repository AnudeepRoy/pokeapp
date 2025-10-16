import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PokemonCard from "../components/card";

export default function FilterByRegion({ selectedRegion }) {
    let generations = [
        "kanto",
        "johto",
        "hoenn",
        "sinnoh",
        "unova",
        "kalos",
        "alola",
        "galar",
        "paldea"
    ];
    const [regionPokemons, setRegionPokemons] = useState([]);
    const [loading, setLoading] = useState(true);

   function getPokemonIdFromUrl(url) {
        // Match the last number before an optional trailing slash
        const match = url.match(/\/(\d+)\/?$/);
        return match ? parseInt(match[1], 10) : null;
    }

    useEffect(() => {
        let currGeneration = generations.indexOf(selectedRegion) + 1;
        if (currGeneration === 0) {
            setRegionPokemons([]);
            setLoading(false);
            return;
        } else {
            fetch(`https://pokeapi.co/api/v2/generation/${currGeneration}/`)
            .then(response => response.json())
            .then(data => {
                let pokemons = data.pokemon_species
                setRegionPokemons(pokemons);
                console.log(pokemons);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching data:", error));
        }
    }, [selectedRegion]);

    return (
        loading ? <p>Loading...</p> : (
            <div className="card-grid">
                <Grid container spacing={2}>
                {regionPokemons.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        pokemon={pokemon.name}
                        id={getPokemonIdFromUrl(pokemon.url)}
                    />
                ))}
                </Grid>
            </div>
        )   
    );
}