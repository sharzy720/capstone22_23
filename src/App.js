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
     * Unique ids for each svg that a graph is rendered in
     * @type {Object}
     */
    const [graphId] = React.useState({
        graph1: "graph1",
        graph2: "graph2",
        graph3: "graph3",
        graph4: "graph4"
    })

    /**
     * Unique ids for each visualization panel that houses a graph
     * @type {Object}
     */
    const [vizPanelId] = React.useState({
        graph1: "visContainer1",
        graph2: "visContainer2",
        graph3: "visContainer3",
        graph4: "visContainer4"
    })

    /**
     * Color for the background of each visualization
     * @type {Object, Function}
     */
    const [vizBackgroundColor, setVizBackgroundColor] = React.useState({
        graph1: "9999",
        graph2: "9999",
        graph3: "9999",
        graph4: "9999"
    })

    /**
     * ID of selected node
     * @type {Object, Function}
     */
    const [selectedNode, setSelectedNode] = React.useState();

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

            width: '100%',
            height: '94.12vh',
            backgroundColor: '#E2D6BE'
            }}>
            <ButtonAppBar timestep={timestep} setTimestep={setTimestep} limit={limit}
                          setLimit={setLimit} setShowGraph={setShowGraph} vizBackgroundColor={vizBackgroundColor}
                          setVizBackgroundColor={setVizBackgroundColor}/>

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
                                            graphId={graphId.graph1} vizBackgroundColor={vizBackgroundColor.graph1}
                                            selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                            showGraph={showGraph} vizPanelId={vizPanelId.graph1}/>

                    </Grid> : null
                }

                {
                    showGraph.graph2? <Grid item md={showGraph.graph1? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}
                                            graphId={graphId.graph2} vizBackgroundColor={vizBackgroundColor.graph2}
                                            selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                            showGraph={showGraph} vizPanelId={vizPanelId.graph2}/>

                    </Grid> :null
                }

                {
                    showGraph.graph3? <Grid item md={showGraph.graph4? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}
                                            graphId={graphId.graph3} vizBackgroundColor={vizBackgroundColor.graph3}
                                            selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                            showGraph={showGraph} vizPanelId={vizPanelId.graph3}/>

                    </Grid> :null
                }

                {
                    showGraph.graph4? <Grid item md={showGraph.graph4? smallGraph : largeGraph}>

                        <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}
                                            graphId={graphId.graph4} vizBackgroundColor={vizBackgroundColor.graph4}
                                            selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                            showGraph={showGraph} vizPanelId={vizPanelId.graph4}/>

                    </Grid> :null
                }
            </Grid>
      </div>
    );
}

export default App