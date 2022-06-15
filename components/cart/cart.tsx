import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import styles from './Cart.module.css';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FoodDetail } from '../../interfaces/FoodDetail';

export default function Cart(props: any) {
    const { onClose, cartOpen, cartItems } = props;
    const parsedCartItems: FoodDetail[] = JSON.parse(cartItems);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        if (parsedCartItems.length > 0) {
            updateTotalCalories();
        } else {
            setTotalCalories(0);
        }
    }, [cartItems])

    const updateTotalCalories = () => {
        const itemCalorieArray = parsedCartItems.map((item) => item.foodNutrients.find((nut) => nut.nutrientNumber === '208'));
        if (itemCalorieArray.length > 1) {
            setTotalCalories(itemCalorieArray.map((nutrient) => nutrient.value).reduce((first, next) => first + next));
        } else {
            setTotalCalories(itemCalorieArray[0].value);
        }
    }

    const getCalories = (cartItem: FoodDetail) => {
        const item = cartItem.foodNutrients.find((nutrient) => nutrient.nutrientNumber === '208');
        return item ? `${item.value} calories` : '';
    }

    const getBrandName = (cartItem: FoodDetail) => {
        return cartItem.brandName ? `${cartItem.brandName}` : 'Unbranded'
    }

    const updateCart = (cartItem: FoodDetail) => {
        props.onCartChange(JSON.stringify(cartItem));
    }

    const DisplayCart = () => {
        if (parsedCartItems.length > 0) {
            return (
                <div>
                    {parsedCartItems.map((cartItem: FoodDetail) => (
                        <ListItem button key={cartItem.fdcId}>
                            <ListItemText
                                className={styles.linebreak}
                                primary={cartItem.description}
                                secondary={`${getBrandName(cartItem)}\n${getCalories(cartItem)}`}
                            />
                            <IconButton onClick={() => updateCart(cartItem)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </div>
            )
        } else {
            return (
                <ListItem button key={1}>
                    <ListItemText className={styles.center} primary='Cart is empty!' />
                </ListItem>
            )
        }
    }

    return (
        <Dialog onClose={props.handleCartClose} open={cartOpen}>
            <DialogTitle className={styles.center}>Food Cart</DialogTitle>
            <List sx={{ pt: 0 }}>
                <DisplayCart />
            </List>
            <h5 className={styles.center}>Total Calories: {totalCalories}</h5>
            <Stack sx={{ m: 2 }} className={styles.middle} spacing={1} direction="row">
                <Button
                    variant="text"
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={parsedCartItems.length === 0}
                    onClick={props.onCheckout}
                >
                    Checkout
                </Button>
            </Stack>
        </Dialog>
    );
}