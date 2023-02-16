/**
 * @file The root element of the app
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React from 'react'
import Grid from '@mui/material/Grid'
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
        graph1: '9999',
        graph2: '9999',
        graph3: '9999',
        graph4: '9999'
    });

    /**
     * If any of the graphs should be displayed
     * @type {Object, Function}
     */
    const [showGraph, setShowGraph] = React.useState({
        graph1: false,
        graph2: false,
        graph3: false,
        graph4: false
    })

    /**
     * Unique ids for each div that a graph is rendered in
     * @type {Object}
     */
    const [graphId] = React.useState({
        graph1: "graph1",
        graph2: "graph2",
        graph3: "graph3",
        graph4: "graph4"
    })

    /**
     * Color for the background of each visualization
     * @type {Object, Function}
     */
    const [vizColor, setVizColor] = React.useState({
        graph1: "9999",
        graph2: "9999",
        graph3: "9999",
        graph4: "9999"
    })

    /**
     * Sizes for the grid sections that
     * @type {number[]}
     */
    const graphSize = [12, 6]

    return (
        <div style={{
            backgroundColor: "PapayaWhip",
            width: '100%',
            height: '95vh',
            }}>
            <ButtonAppBar timestep={timestep} setTimestep={setTimestep} limit={limit}
                          setLimit={setLimit} setShowGraph={setShowGraph} vizColor={vizColor}
                          setVizColor={setVizColor}/>

            <Grid style={{
                marginTop: "5vh",
                marginBottom: "0px"
            }}
                container
                direction={"row"}
            >

                {
                    showGraph.graph1? <Grid item md={graphSize[0]} xl={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}
                                            graphId={graphId.graph1} color={vizColor.graph1}/>

                    </Grid> : null
                }

                {
                    showGraph.graph2? <Grid item md={graphSize[0]} xl={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}
                                            graphId={graphId.graph2} color={vizColor.graph2}/>

                    </Grid> :null
                }

                {
                    showGraph.graph3? <Grid item md={graphSize[0]} xl={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}
                                            graphId={graphId.graph3} color={vizColor.graph3}/>

                    </Grid> :null
                }

                {
                    showGraph.graph4? <Grid item md={graphSize[0]} xl={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}
                                            graphId={graphId.graph4} color={vizColor.graph4}/>

                    </Grid> :null
                }
            </Grid>
      </div>
    );
}

export default App