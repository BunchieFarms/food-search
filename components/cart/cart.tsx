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

// const emails = ['username@gmail.com', 'user02@gmail.com'];

// export interface SimpleDialogProps {
//   open: boolean;
//   selectedValue: string;
//   onClose: (value: string) => void;
// }

export default function Cart(props: any) {
    const { onClose, cartOpen, cartItems } = props;
    const parsedCartItems = JSON.parse(cartItems);
    const [totalCalories, setTotalCalories] = useState(0);

    useEffect(() => {
        if (parsedCartItems.length > 0) {
            updateTotalCalories();
        }
    }, [cartItems])

    const updateTotalCalories = () => {
        console.log(parsedCartItems)
        const itemCalorieArray = parsedCartItems.map((item) => item.foodNutrients.find((nut) => nut.nutrientNumber === '208'));
        if (itemCalorieArray.length > 1) {
            setTotalCalories(itemCalorieArray.reduce((first, next) => first.value + next.value));
        } else {
            setTotalCalories(itemCalorieArray[0].value);
        }
        // setTotalCalories(totalItemCalories);
    }

    // const handleClose = () => {
    //     onClose(selectedValue);
    // };

    // const handleListItemClick = (value: string) => {
    //     onClose(value);
    // };

    const getCalories = (cartItem: any) => {
        const item = cartItem.foodNutrients.find((nutrient) => nutrient.nutrientNumber === '208');
        return item ? `${item.value} calories` : '';
    }

    const getBrandName = (cartItem: any) => {
        return cartItem.brandName ? `${cartItem.brandName}` : 'Unbranded'
    }

    const updateCart = (cartItem: any) => {
        props.onCartChange(JSON.stringify(cartItem));
    }

    const DisplayCart = () => {
        if (parsedCartItems.length > 0) {
            return (
                parsedCartItems.map((cartItem) => (
                    <ListItem button key={cartItem.fdcId}>
                        <ListItemText className={styles.linebreak} primary={cartItem.description} secondary={`${getBrandName(cartItem)}\n${getCalories(cartItem)}`} />
                        <IconButton onClick={() => updateCart(cartItem)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                ))
            )
        } else {
            return (
                <ListItem button key={1}>
                    <ListItemText primary='Cart is empty!' />
                </ListItem>
            )
        }
    }

    return (
        <Dialog onClose={props.handleCartClose} open={cartOpen}>
            <DialogTitle>Food Cart</DialogTitle>
            <List sx={{ pt: 0 }}>
                <DisplayCart />
            </List>
            <h3>total cal: {totalCalories}</h3>
            <Stack spacing={1} direction="row">
                <Button variant="text" onClick={props.onClose}>Cancel</Button>
                <Button variant="contained" disabled={parsedCartItems.length === 0}>Checkout</Button>
            </Stack>
        </Dialog>
    );
}