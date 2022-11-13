
import React from 'react'
import Grid from '@mui/material/Grid'
import DetailsPanel from "./components/DetailsPanel";
import VisualizationPanel from "./components/VisualizationPanel";


const App = () => {
    const [graph, setGraph] = React.useState('1');

    return (
        <div style={{
            backgroundColor: "black",
            minWidth: '1280px',
            minHeight: '720px'
        }}>
            <Grid
                container
                direction={"row"}
                spacing={{ md: 1, xl: 2}}
                style={{padding: "10px"}}>

                <Grid item md={9}>
                    <VisualizationPanel timestep={graph}/>

                </Grid>
                <Grid item md={3}>
                    <DetailsPanel graph={graph} setGraph={setGraph} />

                </Grid>
            </Grid>
      </div>
    );
}

export default App