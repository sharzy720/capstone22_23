
import React from 'react'
import Grid from '@mui/material/Grid'
import DetailsPanel from "./components/DetailsPanel";
import VisualizationPanel from "./components/VisualizationPanel";

//TODO get container to have no extra spacing around it

const App = () => {
    const [graph, setGraph] = React.useState('1');

    return (
        <div style={{backgroundColor: "black"}}>
            <Grid
                container
                direction={"row"}
                spacing={{ md: 1, xl: 2}}
                style={{padding: "10px"}}>

                <Grid item md={8}>
                    <VisualizationPanel graph={graph}/>

                </Grid>
                <Grid item md={4}>
                    <DetailsPanel graph={graph} setGraph={setGraph} />

                </Grid>
            </Grid>
      </div>
    );
}

export default App