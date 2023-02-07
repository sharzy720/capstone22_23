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
        graph1: '9999',
        graph2: '9999',
        graph3: '9999',
        graph4: '9999'
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

    /**
     * Unique ids for each div that is a graph is rendered in
     * @type {Object, Function}
     */
    const [graphId, setGraphId] = React.useState({
        graph1: "graph1",
        graph2: "graph2",
        graph3: "graph3",
        graph4: "graph4"
    })

    const graphSize = [12, 6]



    // console.log("====INTIAL VALUES OF LIMIT AND TIMESTEP====")
    // console.log("TIMESTEP == " + timestep.graph1)
    // console.log("LIMIT == " + limit.graph1)

    return (
        <div style={{
            backgroundColor: "PapayaWhip",
            width: '100%',
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

                <Grid item md={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph1} limit={limit.graph1}
                                            graphId={graphId.graph1}/>

                </Grid>

                {
                    showGraph.graph2? <Grid item md={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph2} limit={limit.graph2}
                                            graphId={graphId.graph2}/>

                    </Grid> :null
                }

                {
                    showGraph.graph3? <Grid item md={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph3} limit={limit.graph3}
                                            graphId={graphId.graph3}/>

                    </Grid> :null
                }

                {
                    showGraph.graph4? <Grid item md={graphSize[1]}>

                        <VisualizationPanel timestep={timestep.graph4} limit={limit.graph4}
                                            graphId={graphId.graph4}/>

                    </Grid> :null
                }
            </Grid>

            {/*<button onClick={()=>setShowGraph(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph2: !showGraph.graph2}*/}
            {/*    }*/}
            {/*)}>Toggle graph2</button>*/}
            {/*<button onClick={()=>setShowGraph(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph3: !showGraph.graph3}*/}
            {/*    }*/}
            {/*)}>Toggle graph3</button>*/}
            {/*<button onClick={()=>setShowGraph(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph4: !showGraph.graph4}*/}
            {/*    }*/}
            {/*)}>Toggle graph4</button>*/}
            {/*<button onClick={()=>setTimestep(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph1: '1'}*/}
            {/*    }*/}
            {/*)}>Show Graph1</button>*/}
            {/*<button onClick={()=>setTimestep(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph2: '1'}*/}
            {/*    }*/}
            {/*)}>Show Graph2</button>*/}
            {/*<button onClick={()=>setTimestep(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph3: '1'}*/}
            {/*    }*/}
            {/*)}>Show Graph3</button>*/}
            {/*<button onClick={()=>setTimestep(*/}
            {/*    previousState => {*/}
            {/*        return { ...previousState, graph4: '1'}*/}
            {/*    }*/}
            {/*)}>Show Graph4</button>*/}
      </div>
    );
}

export default App