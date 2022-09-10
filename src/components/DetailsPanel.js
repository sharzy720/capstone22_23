
import React from 'react'
import {Paper} from "@mui/material";

//TODO fill with all information about the dataset

var numNodes = 200000; //Var so you can change it later

function DetailsPanel() {
    return (
        <Paper style={{backgroundColor: "lightcoral", height: "98vh"}}>
            <div style={{padding: "20px"}}>
                Elliptic dataset
                <br/>
                <div>Number of nodes - {numNodes}</div>

                <br/>
                <p>
                    All information pertaining to the elliptic dataset will be
                    put here
                </p>
            </div>
        </Paper>
    );
}

export default DetailsPanel