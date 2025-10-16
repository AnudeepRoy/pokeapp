import { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import {Skeleton} from "@mui/material";

export default function InfoDrawer({open, onClose, pokemon}) {

    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        if (open) {
            // Fetch additional data about the Pokémon when the drawer opens
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then(response => response.json())
            .then(data => {
                // Handle the fetched data (e.g., set it to state)
                setPokemonInfo(data);
                console.log(data);
            })
            .catch(error => console.error("Error fetching Pokémon data:", error));
        }
    }, [open, pokemon]);

    function getPokemonIdFromUrl(url) {
        // Match the last number before an optional trailing slash
        const match = url.match(/\/(\d+)\/?$/);
        return match ? parseInt(match[1], 10) : null;
    }


    return (
        <Drawer 
            anchor="left"
            open={open}
            onClose={onClose}
        >
            {pokemonInfo === null ?
                <Skeleton variant="rounded" width={210} height={60} />
                :
                <div className="drawer-container" style={{width: 250, padding: 20}}>
                    <h2>{pokemonInfo?.name}</h2>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`} />
                    <div>
                        {pokemonInfo?.types.map(typeInfo => (
                            <img 
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${getPokemonIdFromUrl(typeInfo.type.url)}.png`}
                                alt={typeInfo.type.name}
                                key={typeInfo.type.name}
                            />
                        ))}
                    </div>
                    <p>ID: {pokemonInfo?.id}</p>
                    <p>Height: {pokemonInfo?.height}</p>
                    <p>Weight: {pokemonInfo?.weight}</p>
                    <p>Base Experience: {pokemonInfo?.base_experience}</p>
                    <p>Types: {pokemonInfo?.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
                    <p>Abilities: {pokemonInfo?.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ")}</p>
                </div>
            }
        </Drawer>

    );
}