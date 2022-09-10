import React from 'react'
import {Paper} from "@mui/material";
import DetailsPanel from "./DetailsPanel";

function Button() {
    const [counter, setCounter] = React.useState(20);
    return (
        <div>
            <div> Tall button? </div>
            <button onClick={() => setCounter(counter+10)}>
            {<Paper style={{backgroundColor: "#109f8f", height: counter, width: "6vh"}}>
            {counter}

            </Paper>}
        </button>
        </div>)
}

export default Button