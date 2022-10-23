
import React from 'react'
import {Paper, Container} from "@mui/material";
// import D3Visualization from "./D3Visualization";
// import ForceGraphVis from "./ForceGraphVis";
// import Vis1 from './Vis1.js';
// import Vis2 from "./Vis2";
// import JSONForceGraph from "./JSONForceGraph";
import JSONForceGraph_V2 from "./JSONForceGraph_V2";

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
            <div
                id={'visContainer'}
                style={{ height: "85%",
                        width: "100%",
                        padding: "0px"}}>
                {/*<ForceGraphVis/>*/}

                {/*<JSONForceGraph width={1150} height={1150}/>*/}
                <JSONForceGraph_V2/>
                {/*<Vis2/>*/}
            </div>
        </Paper>
    );
}

export default VisualizationPanel