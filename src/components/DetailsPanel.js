
import React from 'react'
import {Paper} from "@mui/material";
import Button from "./Button";
import Dropdown from "./Dropdown";

//TODO fill with all information about the dataset

var numNodes = 200000; //Var so you can change it later

function DetailsPanel() {
    const [counter, setCounter] = React.useState(10);
    const incrementCounter = () => setCounter(counter+1);
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

                <Dropdown/>

                {/*<Button onClickFunction={incrementCounter} label={counter} />*/}
                {/*<Button onClickFunction={incrementCounter} label={"Pineapple"} />*/}
            </div>
        </Paper>
    );
}

export default DetailsPanel