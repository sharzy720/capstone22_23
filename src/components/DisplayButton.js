/**
 * @file The display button component.
 * @author Johnathyn Strong and Nickolas Wofford
 */
import React from 'react'
import {Button} from "@mui/material";

/**
 * Creates a button to update the visualization using the user selected values
 * @param {Function} props.onClickFunction
 * @returns {JSX.Element}
 * @constructor
 */
function DisplayButton(props) {
    
    return (
        <Button variant="contained" onClick={props.onClickFunction} style={{
            height: '100%', width: '100%',
            marginTop: '4px',
            backgroundColor: 'white', color: 'black'
        }}>
            Display
        </Button>
    )
}

export default DisplayButton