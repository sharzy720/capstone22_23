
import React from 'react'
import Grid from '@mui/material/Grid'
import DetailsPanel from "./components/DetailsPanel";
import VisualizationPanel from "./components/VisualizationPanel";

//TODO get container to have no extra spacing around it

const App = () => {
  return (
      <div style={{border: "black 1px solid", backgroundColor: "black"}}>
          <Grid
              container
              direction={"row"}
              spacing={{ md: 1, xl: 2}}
              style={{padding: "10px"}}>

              <Grid item md={8}>
                  <VisualizationPanel/>

              </Grid>
              <Grid item md={4}>
                  <DetailsPanel/>

              </Grid>
          </Grid>
      </div>
  );
}

export default App