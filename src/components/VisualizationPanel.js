
import React from 'react'
import {Paper, Container} from "@mui/material";

//TODO fill with all things visualization
//TODO on larger screens the visualization container does not take up the full screen

const VisualizationPanel = () => {
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
            <Container style={{ height: "88vh",
                                width: "100vh",
                                border: "black 1px solid"}}>
                {/*Call the d3 visualization here*/}

            </Container>
        </Paper>
    );
}

export default VisualizationPanel