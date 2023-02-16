/**
 * @file The display button component.
 * @author Johnathyn Strong and Nickolas Wofford
 */
import React from 'react'
import {Button} from "@mui/material";

/**
 * Creates a button to update the visualization using the user selected values
 * @param {Function} props.onClickFunction
 * @param {String} props.graphNum
 * @returns {JSX.Element}
 * @constructor
 */
function RemoveGraphButton(props) {
//props.onClickFunction(props.graphNum)
    return (
        <Button variant="contained" onClick={() => props.onClickFunction(props.graphNum)} style={{
            height: '50px', width: '100%',
            marginTop: '4px',
            backgroundColor: 'IndianRed', color: 'black'
        }}>
            Remove
        </Button>
    )
}

export default RemoveGraphButton