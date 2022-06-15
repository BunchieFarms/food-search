import React, { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItem from "@mui/material/ListItem";

export default function FoodList(props: any) {
    const foods = props.foods;
    const [open, setOpen] = useState<number[]>([] );

    const handleClick = (index: number) => {
        const openArr = open;
        openArr[index] = openArr[index] === 0 ? 1 : 0;
        console.log(openArr)
        setOpen(openArr);
    };

    function DisplayList() {
        if (foods && foods.foods.length > 0) {
            return (
                foods.foods.map((food, index) => {
                    return (
                        <div>
                            <ListItemButton key={index} onClick={() => handleClick(index)}>
                                <ListItemText primary={food.description} />
                                {open[index] === 1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={open[index] === 1} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem key={index*1000} sx={{ pl: 4 }}>
                                        <ListItemText primary="Starred" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </div>
                    )
                })
            )
        } else {
            return (
                <ListItem key={-1} onClick={handleClick}>
                    <ListItemText primary="No results!" />
                </ListItem>
            )
        }
    }

    return (
        <List
            sx={{ width: '100%', bgcolor: 'background.paper', textAlign: "center" }}
            component="nav"
        >
            <DisplayList></DisplayList>
        </List>
    );
}