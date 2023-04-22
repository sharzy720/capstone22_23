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

    /**
     * Dynamically sizes the grid depending on home many and what graphs are displayed
     * @param currentGraph The current graph being displayed
     * @param graphObject Object holding boolean values for what graphs are currently displayed
     * @return {number} Width of the current graphs grid container
     */
    function dynamicGridSize(currentGraph, graphObject) {
        // Array of booleans pertaining to what graphs are currently displayed
        let currGraphs = Object.values(graphObject);
        // Number of graphs currently displayed
        let count = currGraphs.filter(e => { return e === true; }).length;

        // If only 1 or 2 graphs are displayed
        if (count === 1) {
            return largeGraph;
        } else if (count === 2) {
            return smallGraph;
        }

        // If 3 or 4 graphs are displayed
        switch (currentGraph) {
            case 1:
                return (graphObject.graph2) ? smallGraph : largeGraph

            case 2:
                return (graphObject.graph1) ? smallGraph : largeGraph

            case 3:
                return (graphObject.graph4) ? smallGraph : largeGraph

            case 4:
                return (graphObject.graph3) ? smallGraph : largeGraph
        }
    }


    /**
     * Dynamically change the height and border of graphs depending on how many and what graphs are
     * displayed
     * @param currentGraph The current graph being displayed
     * @param graphObject Object holding boolean values for what graphs are currently displayed
     * @return {
     * {height: string}|
     * {borderBottom: string, height: string}|
     * {borderRight: string, height: string}|
     * {borderRight: string, borderBottom: string, height: string}
     * } Styling for the current graphs grid container
     */
    function dynamicGrids(currentGraph, graphObject) {// before: 63 after: 53
        // Array of booleans pertaining to what graphs are currently displayed
        let currGraphs = Object.values(graphObject);
        // Height of a graph container
        let sizeString = "47.5vh";
        // Number of graphs currently displayed
        let count = currGraphs.filter(e => { return e === true }).length;

        // If 1 or 2 graphs are displayed take up the full screen
        if (count <= 2) {
            sizeString = "95vh";
        }

        // Dynamically change what borders are displayed on a given graph container
        switch (currentGraph) {
            case 1:
                if (count === 1) {
                    return {height:sizeString}

                } else if (count === 2) {
                    return {borderRight:"thin solid black", height:sizeString}

                } else {
                    return {borderRight:"thin solid black", borderBottom:"thin solid black", height:sizeString}
                }

            case 2:
                if (count === 1) {
                    return {height:sizeString}

                } else if (count === 2 && !currGraphs[0]) { // If 2 graphs and graph 1 is not displayed
                    return {borderRight:"thin solid black", height:sizeString}

                } else {
                    return (currGraphs[0]) // If there are more than 3 graphs and graph 1 is displayed
                        ? {borderBottom:"thin solid black", height:sizeString}
                        : {borderRight:"thin solid black", borderBottom:"thin solid black", height:sizeString}
                }

            case 3:
                if (count === 1) {
                    return {height:sizeString}

                } else if (currGraphs[0] && currGraphs[1]) { // If graphs 1 and 2 exist
                    return (currGraphs[3])
                        ? {borderRight:"thin solid black", height:sizeString}
                        : {height:sizeString}

                } else {
                    return {borderRight:"thin solid black", borderBottom:"thin solid black", height:sizeString}
                }

            case 4:
                return {height:sizeString}
        }
    }

    return (
        <div style={{
            width: '100%',
            height: "95vh",//'94.12vh',
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
                    showGraph.graph1?
                        <Grid item md={dynamicGridSize(1, showGraph)}
                              style={dynamicGrids(1, showGraph)}>

                            <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}
                                                graphId={graphId.graph1} vizBackgroundColor={vizBackgroundColor.graph1}
                                                selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                                showGraph={showGraph} vizPanelId={vizPanelId.graph1}/>
                        </Grid>
                    : null
                }

                {
                    showGraph.graph2?
                        <Grid item md={dynamicGridSize(2, showGraph)}
                              style={dynamicGrids(2, showGraph)}>

                            <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}
                                                graphId={graphId.graph2} vizBackgroundColor={vizBackgroundColor.graph2}
                                                selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                                showGraph={showGraph} vizPanelId={vizPanelId.graph2}/>
                        </Grid>
                    : null
                }

                {
                    showGraph.graph3?
                        <Grid item md={dynamicGridSize(3, showGraph)}
                              style={dynamicGrids(3, showGraph)}>

                            <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}
                                                graphId={graphId.graph3} vizBackgroundColor={vizBackgroundColor.graph3}
                                                selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                                showGraph={showGraph} vizPanelId={vizPanelId.graph3}/>
                        </Grid>
                    : null
                }

                {
                    showGraph.graph4?
                        <Grid item md={dynamicGridSize(4, showGraph)}
                              style={dynamicGrids(4, showGraph)}>

                            <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}
                                                graphId={graphId.graph4} vizBackgroundColor={vizBackgroundColor.graph4}
                                                selectedNode={selectedNode} setSelectedNode={setSelectedNode}
                                                showGraph={showGraph} vizPanelId={vizPanelId.graph4}/>
                        </Grid>
                    : null
                }
            </Grid>
      </div>
    );
}

export default App