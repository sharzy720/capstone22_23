/**
 * @file App's menu title bar
 * @author Johnathyn Strong and Nickolas Wofford
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from "@mui/material/Drawer";
import {useState} from "react";
import SimpleAccordion from "./SimpleAccordion";

/**
 * Width of the drawer
 */
const drawerWidth = 300;

/**
 * ButtonAppBar component
 *
 * @param {Object} props.timestep
 * @param {Object} props.limit
 * @param {Object} props.vizColor
 * @param {Function} props.setTimestep
 * @param {Function} props.setLimit
 * @param {Function} props.setShowGraph
 * @param {Function} props.setVizColor
 * @returns {React.ReactElement} The component
 */
export default function ButtonAppBar(props) {

    /**
     * State variable to track if the drawer is open or not
     * @type {[boolean, function]}
     */
    const [open, setOpen] = useState(false);

    /**
     * Function to open the drawer
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    /**
     * Function to close the drawer
     */
    const handleDrawerClose = () => {
        setOpen(false);
    }

    return (
        <div style={{margin: "0px"}}>
            {/* AppBar */}
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="fixed" sx={{ backgroundColor: 'Black', height: '5vh'}}>
                    <Toolbar>

                        {/* Menu icon button to open the drawer */}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Title */}
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Elliptic Dataset Visualization
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>



            {/* Drawer */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    },
                    backgroundColor: 'PapayaWhip'
                }}
                variant="temporary"
                anchor="left"
                onClose={() => {
                    handleDrawerClose()
                }}
                open={open}
            >

                <div style={{ padding: '20px',
                    height: '100%',
                    // backgroundColor: 'PapayaWhip'
                }}>

                    {/* Title */}
                    <h1 style={{ margin: '0'}}>
                        Elliptic dataset
                    </h1>

                    <br/>

                    {/* sub information */}
                    <h3>Number of transactions in database: 4000</h3>


                    {/* Details about the dataset */}
                    <p style={{ fontSize: '16px' }}>
                        The Elliptic dataset is a collection of transactions made using bitcoin taken over the course of 50 time steps.
                        Each time step has around 7,000 unique transactions. However, our subset of this dataset only has 1,000 unique transactions per time step.
                    </p>

                    <h5>
                        Warning: Using 500 or more transactions for multiple graphs will lead to a significant performance impact
                    </h5>

                    <SimpleAccordion timestep={props.timestep} setTimestep={props.setTimestep}
                                     limit={props.limit} setLimit={props.setLimit}
                                     setShowGraph={props.setShowGraph} vizColor={props.vizColor}
                                     setVizColor={props.setVizColor}
                    />
                </div>
            </Drawer>
        </div>
    );
}