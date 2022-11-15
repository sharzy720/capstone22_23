
import React from 'react'
import {Paper} from "@mui/material";
import JSONForceGraph from "./JSONForceGraph";


function VisualizationPanel(props) {
    let displayGraph = props.timestep !== 51;

    console.log("displayGraph: " + displayGraph)

    return (
        <Paper style={{backgroundColor: "lightblue",
                       minHeight: "98.5vh",
                       width: "100%"}}>
            {/*<div style={{padding: "20px"}}>*/}
            {/*    Visualization*/}
            {/*    <br/>*/}
            {/*    <p>*/}
            {/*        The visualization of our dataset will be placed here*/}
            {/*    </p>*/}
            {/*</div>*/}

            {/*/!*Container for the graph visualization*!/*/}
            <div
                id={'visContainer'}
                style={{ height: "96vh",
                        width: "73vw",
                        padding: "0px"}}>

                {displayGraph ?
                    <JSONForceGraph timestep={props.timestep} limit={props.limit} /> :
                    console.log("No graph displayed")
                }
            </div>
        </Paper>
    );
}

export default VisualizationPanel