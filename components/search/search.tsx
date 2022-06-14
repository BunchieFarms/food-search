import React, { useState, useEffect, useRef } from "react";
import styles from './Search.module.css';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FoodList from "../foodList/foodList";

export default function Search(props: any) {
    const [query, setQuery] = useState('');
    const [foods, setFoods] = useState(null);

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (query.length > 0) {
            searchFoods(query);
        }
    }, [query])

    function searchFoods (query: string) {
        fetch('/api/searchFood', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then(response => response.json())
        .then(data => setFoods(data))
    }

    return (
        <div className={styles.center}>
            <Box mt={2}>
                <Grid container spacing={1}>
                    <Grid item md={3} xs={12}></Grid>
                    <Grid item md={6} xs={12}>
                        <TextField id="foodSearch" label="Search Any Food" variant="standard" onChange={(e) => setQuery(e.target.value)} />
                        <FoodList foods={foods}></FoodList>
                        
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}