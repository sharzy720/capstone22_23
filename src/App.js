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
     * ID of selected node
     * @type {Object, Function}
     */

    const [select, setSelect] = React.useState();

    /**
     * Grid size for a large graph
     * @type {number}
     */
    const largeGraph = 12;

    /**
     * Grid size for a small graph
     * @type {number}
     */
    const smallGraph = 6;


    return (
        <div style={{
            backgroundColor: "PapayaWhip",
            width: '100%',
            height: '94.12vh',
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
                    showGraph.graph1? <Grid item md={showGraph.graph2? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}
                                            graphId={graphId.graph1} color={vizColor.graph1}
                                            select={select} setSelect={setSelect}/>

                    </Grid> : null
                }

                {
                    showGraph.graph2? <Grid item md={showGraph.graph1? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}
                                            graphId={graphId.graph2} color={vizColor.graph2}
                                            select={select} setSelect={setSelect} />

                    </Grid> :null
                }

                {
                    showGraph.graph3? <Grid item md={showGraph.graph4? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}
                                            graphId={graphId.graph3} color={vizColor.graph3}
                                            select={select} setSelect={setSelect}/>

                    </Grid> :null
                }

                {
                    showGraph.graph4? <Grid item md={showGraph.graph4? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}
                                            graphId={graphId.graph4} color={vizColor.graph4}
                                            select={select} setSelect={setSelect}/>

                    </Grid> :null
                }
            </Grid>
      </div>
    );
}

export default App