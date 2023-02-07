import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Drawer from "@mui/material/Drawer";
import {useState} from "react";
import SimpleAccordion from "./SimpleAccordion";

/**
 * Style for the drawer header
 * @typedef {object} Props
 * @property {object} theme - Theme for the component
 * @returns {object} Style for the drawer header
 */
const DrawerHeader = styled('div')((({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.padding(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
})))

/**
 * Width of the drawer
 */
const drawerWidth = 300;

/**
 * ButtonAppBar component
 *
 * @param {Object} props.timestep
 * @param {Object} props.limit
 * @param {Function} props.setTimestep
 * @param {Function} props.setLimit
 * @param {Function} props.setShowGraph
 * @returns {React.ReactElement} The component
 */
export default function ButtonAppBar(props) {

    // console.log("====APPBAR PROP VALUES====")
    // console.log("props.timestep.graph1 == " + props.timestep.graph1)
    // console.log("props.limit.graph1 == " + props.limit.graph1)

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
        <div>
            {/* AppBar */}
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="fixed" sx={{ backgroundColor: 'Black', height: '5vh'}}>

                    <Toolbar>

            {/*            /!* Menu icon button to open the drawer *!/*/}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                            {/*<button onClick={handleDrawerOpen}>Drawer</button>*/}
                        </IconButton>

            {/*            /!* Title *!/*/}
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
                    }
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
                    backgroundColor: 'PapayaWhip' }}>

                    {/* Title */}
                    <h1 style={{ margin: '0'}}>
                        Elliptic dataset
                    </h1>

                    <br/>

                    {/* sub information */}
                    <h4>Number of transactions in database: 4000</h4>


                    {/* Details about the dataset */}
                    <p style={{ fontSize: '16px' }}>
                        The Elliptic dataset is a collection of transactions made using bitcoin taken over the course of 50 time steps.
                        Each time step has around 7,000 unique transactions. However, our subset of this dataset only has 1,000 unique transactions per time step.
                    </p>

                    <SimpleAccordion timestep={props.timestep} setTimestep={props.setTimestep}
                                     limit={props.limit} setLimit={props.setLimit}
                                     setShowGraph={props.setShowGraph}
                    />
                </div>
            </Drawer>
        </div>
    );
}