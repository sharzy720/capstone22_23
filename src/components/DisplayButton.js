import React from 'react'
import {Button} from "@mui/material";


function DisplayButton(props) {
    //const [counter, setCounter] = React.useState(20);

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