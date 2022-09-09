
import React from 'react'
import Grid from '@mui/material/Grid'
import {Paper, Container} from "@mui/material";

//TODO get container to have no extra spacing around it

const App = () => {
  return (
      <div style={{border: "black 1px solid"}}>
          <Grid container spacing={1} style={{padding: "10px"}}>
              <Grid item md={8}>
                  <Paper style={{backgroundColor: "lightblue", height: "98vh"}}>
                      Visualization
                  </Paper>
              </Grid>
              <Grid item md={4}>
                  <Paper style={{backgroundColor: "lightcoral", height: "98vh"}}>
                      Details
                  </Paper>

              </Grid>
          </Grid>
      </div>
  );
}

export default App