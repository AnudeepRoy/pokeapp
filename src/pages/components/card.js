import { useState } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import {CardActionArea} from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import InfoDrawer from "./infoDrawer";

export default function PokemonCard({pokemon, id}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (state) => {
        setOpen(state);
    }

    return (
        <>
            <Grid size={{ xs: 6, md: 3 }} >
                <Card 
                    className="poke-card"
                    onClick={()=>toggleDrawer(true)}
                >
                    <CardActionArea className="card-action">
                    <CardMedia
                        component="img"
                        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
                        alt={pokemon}
                        style={{
                            height:100,
                            width:`auto`
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom component="p">
                            {pokemon} : {id}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            {open &&
                <InfoDrawer 
                    open={open} 
                    onClose={() => toggleDrawer(false)} 
                    pokemon={pokemon} 
                />
            }
        </>
    );
}