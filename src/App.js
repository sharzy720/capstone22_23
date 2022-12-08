/**
 * @file The root element of the app
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React from 'react'
import Grid from '@mui/material/Grid'
import DetailsPanel from "./components/DetailsPanel";
import VisualizationPanel from "./components/VisualizationPanel";

/**
 * creates the root element of the app
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    /**
     * User selected timestep of transactions to query
     * @type {Number}
     */
    const [timestep, setTimestep] = React.useState('51');

    /**
     * User selected number of transactions to return from the database
     * @type {Number}
     */
    const [limit, setLimit] = React.useState('125');

    return (
        <div style={{
            backgroundColor: "black",
            minWidth: '1280px',
            minHeight: '720px'
        }}>
            <Grid
                container
                direction={"row"}
                spacing={{ md: 1, xl: 2}}
                style={{padding: "10px"}}>

                <Grid item md={9}>

                    <VisualizationPanel timestep={timestep} limit={limit}/>

                </Grid>
                <Grid item md={3}>

                    <DetailsPanel timestep={timestep} setTimestep={setTimestep} limit={limit} setLimit={setLimit} />

                </Grid>
            </Grid>
      </div>
    );
}

export default App