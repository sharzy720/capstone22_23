import React from 'react'
import {Paper} from "@mui/material";
import DetailsPanel from "./DetailsPanel";

function Button(props) {
    //const [counter, setCounter] = React.useState(20);

    return (
        <div>
            <div> Button </div>
        <button onClick={props.onClickFunction}>
            {<Paper style={{backgroundColor: "#109f8f", height: "6vh", width: "6vh"}}>
            {props.label}

            </Paper>}
        </button>
        </div>)
}

export default Button