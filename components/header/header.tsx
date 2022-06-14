import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './Header.module.css';

export default function Header() {
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
                </div>
            </Toolbar>
        </Box>
    );
}