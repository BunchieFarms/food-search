import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.css';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../cart/cart';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function Header(props: any) {
    const [cartOpen, setCartOpen] = useState(false);

    const handleCartOpen = () => {
        setCartOpen(true);
    }

    const handleCartClose = () => {
        setCartOpen(false);
    }

    function handleCartChange(foodItem) {
        props.onCartChange(foodItem);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar
                className={styles.toolbar}
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <div className={styles.half}>
                    <Typography
                        variant="h3"
                        component="div"
                        align="center"
                        sx={{ flexGrow: 1 }}
                        className={styles.half}
                    >
                        Food Search
                    </Typography>
                    <IconButton onClick={handleCartOpen} aria-label="cart">
                        <StyledBadge badgeContent={JSON.parse(props.cart).length} color="primary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                </div>
            </Toolbar>
            <Cart onCartChange={handleCartChange} cartOpen={cartOpen} cartItems={props.cart} onClose={handleCartClose} />
        </Box>
    );
}