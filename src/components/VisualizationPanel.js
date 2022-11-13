
import React from 'react'
import {Paper} from "@mui/material";
import JSONForceGraph from "./JSONForceGraph";


function VisualizationPanel(props) {
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
                style={{ height: "85%",
                        width: "100%",
                        padding: "0px"}}>
                <JSONForceGraph timestep={props.timestep} />
            </div>
        </Paper>
    );
}

export default VisualizationPanel