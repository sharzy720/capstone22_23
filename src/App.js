
import React from 'react'
import Grid from '@mui/material/Grid'
import {Paper, Container} from "@mui/material";

//TODO get container to have no extra spacing around it

const App = () => {
  return (
      <div>
          <Grid container>
              <Grid item md={8}>
                  <Paper style={{backgroundColor: "lightblue", width: "100%"}}>
                      Visualization
                  </Paper>
              </Grid>
              <Grid item md={4}>
                  <Paper style={{backgroundColor: "lightcoral"}}>
                      Details
                  </Paper>

              </Grid>
          </Grid>
      </div>
  );
}

export default App