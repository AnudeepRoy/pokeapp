import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function PokemonCard({pokemon, id}) {
    return (
        <>
            <Grid size={{ xs: 6, md: 3 }} >
                <Card>
                    <CardMedia
                        component="img"
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        alt={pokemon}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {pokemon}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}