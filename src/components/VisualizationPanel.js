
import React from 'react'
import {Paper, Container} from "@mui/material";
import D3Visualization from "./D3Visualization";
import ForceGraphVis from "./ForceGraphVis";
import Vis1 from './Vis1.js';
import JSONForceGraph from "./JSONForceGraph";

//TODO fill with all things visualization
//TODO on larger screens the visualization container does not take up the full screen

function VisualizationPanel() {
    return (
        <Paper style={{backgroundColor: "lightblue",
                       height: "98vh",
                       width: "100%"}}>
            <div style={{padding: "20px"}}>
                Visualization
                <br/>
                <p>
                    The visualization of our dataset will be placed here
                </p>
            </div>

            {/*Container for the graph visualization*/}
            <Container
                id={'visContainer'}
                style={{ height: "100%",
                                width: "100%",
                                border: "black 1px solid",
                                padding: "0px"}}>
                {/*<ForceGraphVis/>*/}

                {/*<JSONForceGraph width={1150} height={1150}/>*/}
                <JSONForceGraph/>
            </Container>
        </Paper>
    );
}

export default VisualizationPanel