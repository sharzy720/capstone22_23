/**
 * @file The display button component.
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React from 'react'
import {Button} from "@mui/material";

/**
 * Creates a button to update the visualization using the user selected values
 * @param {String} props.graphNum
 * @param {Function} props.onClickFunction
 * @returns {JSX.Element}
 * @constructor
 */
function DisplayButton(props) {
    
    return (
        <Button variant="contained" onClick={() => props.onClickFunction(props.graphNum)} style={{
            height: '40px', width: '100%',
            marginTop: '4px',
            backgroundColor: '#98C3E2', color: 'black'
        }}>
            Display
        </Button>
    )
}

export default DisplayButton