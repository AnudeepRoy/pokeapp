import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Grid } from "@mui/material";


export default function Filters({allPokemons, types, regions, setSelectedPokemon, setSelectedType, setSelectedRegion}) {
  return (
    <>
      <h1>Filters</h1>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 4 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allPokemons.map(pokemon => pokemon.name)}
            renderInput={(params) => <TextField {...params} label="Pokemon" />}
            onChange={(event, newValue) => {
              setSelectedPokemon(newValue);
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={types.map(type => type.name)}
            renderInput={(params) => <TextField {...params} label="Types" />}
            onChange={(event, newValue) => {
              setSelectedType(newValue);
            }}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={regions.map(region => region.name)}
            renderInput={(params) => <TextField {...params} label="Regions" />}
            onChange={(event, newValue) => {
              setSelectedRegion(newValue);
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}