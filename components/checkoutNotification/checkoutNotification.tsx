import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function CheckoutNotification(props: any) {
    const { open, checkoutText } = props;

    return (
        <div>
            <Snackbar
                open={open}
                message={checkoutText}
            />
        </div>
    );
}