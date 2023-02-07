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

    /**
     * If one of 3 extra graphs should be displayed
     * @type {Object, Function}
     */
    const [showGraph, setShowGraph] = React.useState({
        graph2: false,
        graph3: false,
        graph4: false
    })



    // console.log("====INTIAL VALUES OF LIMIT AND TIMESTEP====")
    // console.log("TIMESTEP == " + timestep.graph1)
    // console.log("LIMIT == " + limit.graph1)

    return (
        <div style={{
            backgroundColor: "PapayaWhip",
            width: '100vw',
            height: '100vh',
            // width: '50vw'
            // border: "1px solid black"
            }}>
            <ButtonAppBar timestep={timestep} setTimestep={setTimestep} limit={limit}
                          setLimit={setLimit} setShowGraph={setShowGraph}/>

            <Grid style={{
                // border: "1px solid black"
                marginTop: "5vh"
            }}
                container
                direction={"row"}
                // spacing={{ md: 1, xl: 2}}
                // style={{padding: "10px"}}
            >

                <Grid item md={6}>

                        <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}/>

                </Grid>

                {
                    showGraph.graph2? <Grid item md={6} style={{
                        border: "1px solid black"
                    }}>

                        <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}/>

                    </Grid> :null
                }

                {
                    showGraph.graph3? <Grid item md={6} style={{
                        border: "1px solid black"
                    }}>

                        <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}/>

                    </Grid> :null
                }

                {
                    showGraph.graph4? <Grid item md={6} style={{
                        border: "1px solid black"
                    }}>

                        <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}/>

                    </Grid> :null
                }
            </Grid>

            <button onClick={()=>setShowGraph(
                previousState => {
                    return { ...previousState, graph2: !showGraph.graph2}
                }
            )}>Toggle graph2</button>
            <button onClick={()=>setShowGraph(
                previousState => {
                    return { ...previousState, graph3: !showGraph.graph3}
                }
            )}>Toggle graph3</button>
            <button onClick={()=>setShowGraph(
                previousState => {
                    return { ...previousState, graph4: !showGraph.graph4}
                }
            )}>Toggle graph4</button>
            <button onClick={()=>setTimestep(
                previousState => {
                    return { ...previousState, graph1: '1'}
                }
            )}>Show Graph1</button>
            <button onClick={()=>setTimestep(
                previousState => {
                    return { ...previousState, graph2: '1'}
                }
            )}>Show Graph2</button>
            <button onClick={()=>setTimestep(
                previousState => {
                    return { ...previousState, graph3: '1'}
                }
            )}>Show Graph3</button>
            <button onClick={()=>setTimestep(
                previousState => {
                    return { ...previousState, graph4: '1'}
                }
            )}>Show Graph4</button>
      </div>
    );
}

export default App