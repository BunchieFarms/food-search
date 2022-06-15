import React, { useState, useEffect } from "react";
import styles from './FoodList.module.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { FoodDetail } from "../../interfaces/FoodDetail";
import { FoodItems } from "../../interfaces/FoodItems";
import { FoodNutrient } from "../../interfaces/FoodNutrient";

export default function FoodList(props: any) {
    const foods: FoodItems = props.foods;
    const cart: FoodDetail[] = JSON.parse(props.cart);
    const [open, setOpen] = useState(new Set());

    useEffect(() => {
        setOpen(new Set());
    }, [foods]);

    const toggleCollapse = (index: number) => {
        const tempOpen = new Set(open);
        open.has(index) ? tempOpen.delete(index) : tempOpen.add(index);
        setOpen(tempOpen);
    };

    const updateCart = (fdcId: number) => {
        props.onCartChange(JSON.stringify(foods.foods.find((x) => x.fdcId === fdcId)));
    }

    const itemInCart = (fdcId: number) => {
        return cart.find((item) => item.fdcId === fdcId);
    }

    function buildNutrition(nutrients: FoodNutrient[]) {
        const nutrientNumberMap = new Map();
        nutrientNumberMap.set('203', 'Protein');
        nutrientNumberMap.set('204', 'Fats');
        nutrientNumberMap.set('205', 'Carbs');
        nutrientNumberMap.set('208', 'Calories');
        nutrientNumberMap.set('269', 'Sugars');

        const nutrientStringArr = [];

        nutrients.sort((a, b) => parseInt(a.nutrientNumber) - parseInt(b.nutrientNumber));

        nutrients.forEach((nut) => {
            nutrientStringArr.push(`${nutrientNumberMap.get(nut.nutrientNumber)}: ${nut.value} ${nut.unitName}`);
        });

        return nutrientStringArr.join('\n');
    }

    function DisplayList() {
        if (foods && foods.foods.length > 0) {
            return (
                <div>
                    {foods.foods.map((food, index) => {
                        return (
                            <div key={food.fdcId} className={styles.outline}>
                                <ListItemButton onClick={() => toggleCollapse(index)}>
                                    <ListItemText
                                        primary={food.description}
                                        secondary={food.brandName || 'Unbranded'}
                                    />
                                    {open.has(index) ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open.has(index)} timeout="auto" unmountOnExit>
                                    <Box>
                                        <Grid container>
                                            <Grid item md={6}>
                                                <Typography
                                                    sx={{ pl: 4 }}
                                                    className={styles.linebreak}>
                                                    {buildNutrition(food.foodNutrients)}
                                                </Typography>
                                            </Grid>
                                            <Grid item md={6} className={styles.middle}>
                                                <Button
                                                    sx={{ mt: 0.5 }}
                                                    variant="contained"
                                                    onClick={() => updateCart(food.fdcId)}>
                                                    {itemInCart(food.fdcId) ? 'Remove from Cart' : 'Add to Cart'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Collapse>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <h3 className={styles.center}>No results!</h3>
            )
        }
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', textAlign: "center" }}
            component="nav"
            dense={true}
        >
            <DisplayList />
        </List>
    );
}