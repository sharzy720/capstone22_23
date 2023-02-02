/**
 * @file The root element of the app
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React from 'react'
import Grid from '@mui/material/Grid'
import DetailsPanel from "./components/DetailsPanel";
import VisualizationPanel from "./components/VisualizationPanel";
import ButtonAppBar from './components/AppBar';

/**
 * creates the root element of the app
 *
 * @returns {JSX.Element}
 * @constructor
 */
const App = () => {
    /**
     * User selected timestep of transactions to query
     * @type {Object, Function}
     */
    const [timestep, setTimestep] = React.useState({
        graph1: '51',
        graph2: '51',
        graph3: '51',
        graph4: '51'
    });

    /**
     * User selected number of transactions to return from the database
     * @type {Object, Function}
     */
    const [limit, setLimit] = React.useState({
        graph1: '125',
        graph2: '125',
        graph3: '125',
        graph4: '125'
    });

    console.log("====INTIAL VALUES OF LIMIT AND TIMESTEP====")
    console.log("TIMESTEP == " + timestep.graph1)
    console.log("LIMIT == " + limit.graph1)

    return (
        <div style={{
            // backgroundColor: "black",
            // minWidth: '1280px',
            // minHeight: '720px',
            // width: '50vw'
            }}>
            <ButtonAppBar timestep={timestep} setTimestep={setTimestep} limit={limit} setLimit={setLimit}/>
            <Grid
                // container
                // direction={"row"}
                // spacing={{ md: 1, xl: 2}}
                // style={{padding: "10px"}}
            >

                <Grid item md={9}>

                    <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}/>

                </Grid>
                {/*<Grid item md={3}>*/}

                {/*    <DetailsPanel timestep={timestep} setTimestep={setTimestep} limit={limit} setLimit={setLimit} />*/}

                {/*</Grid>*/}
            </Grid>
      </div>
    );
}

export default App