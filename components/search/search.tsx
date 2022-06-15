import React, { useState, useEffect, useRef } from "react";
import styles from './Search.module.css';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FoodList from "../foodList/foodList";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Search(props: any) {
    const [query, setQuery] = useState('');
    const [foods, setFoods] = useState(null);
    const [page, setPage] = useState(1);

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        if (query.length > 0) {
            searchFoods();
        } else {
            setFoods(null);
        }
        setPage(1);
    }, [query])

    useEffect(() => {
        if (query.length > 0) {
            searchFoods();
        }
    }, [page])

    function searchFoods() {
        fetch('/api/searchFood', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                page: page
            })
        })
            .then(response => response.json())
            .then(data => {
                setFoods(data.foods.length === 0 ? null : data);
            })
    }

    function handleCartChange(foodItem) {
        props.onCartChange(foodItem);
    }

    function handleChangePage(change: number) {
        setPage(page + change);
    }

    function DisplayPages() {
        if (foods) {
            return (
                <div>
                    <Stack className={styles.middle} spacing={1} direction="row">
                        <Button variant="contained" disabled={page === 1} onClick={() => handleChangePage(-1)}>Previous Page</Button>
                        <Button variant="contained" disabled={page === foods.totalPages} onClick={() => handleChangePage(1)}>Next Page</Button>
                    </Stack>
                    <p>page {page} of {foods.totalPages}</p>
                </div>
            )
        }
    }

    return (
        <div className={styles.center}>
            <Box mt={2}>
                <Grid container spacing={1}>
                    <Grid item md={3} xs={12}></Grid>
                    <Grid item md={6} xs={12}>
                        <TextField id="foodSearch" label="Search Any Food" variant="standard" onChange={(e) => setQuery(e.target.value)} />
                        {query.length > 0 && <FoodList onCartChange={handleCartChange} cart={props.cart} foods={foods}></FoodList>}
                        <DisplayPages />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}