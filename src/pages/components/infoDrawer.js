import { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import {Skeleton} from "@mui/material";

export default function InfoDrawer({open, onClose, pokemon}) {

    const [pokemonInfo, setPokemonInfo] = useState(null);

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


    return (
        pokemonInfo === null ?
        <Skeleton variant="rounded" width={210} height={60} />
        :
        <Drawer 
            anchor="left"
            open={open}
            onClose={onClose}
        >
            <div className="drawer-container" style={{width: 250, padding: 20}}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo?.id}.png`} />
                <h2>{pokemonInfo?.name}</h2>
                <p>ID: {pokemonInfo?.id}</p>
                <p>Height: {pokemonInfo?.height}</p>
                <p>Weight: {pokemonInfo?.weight}</p>
                <p>Base Experience: {pokemonInfo?.base_experience}</p>
                <p>Types: {pokemonInfo?.types.map(typeInfo => typeInfo.type.name).join(", ")}</p>
                <p>Abilities: {pokemonInfo?.abilities.map(abilityInfo => abilityInfo.ability.name).join(", ")}</p>
            </div>
        </Drawer>

    );
}