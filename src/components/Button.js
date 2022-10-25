import React from 'react'
//import DetailsPanel from "./DetailsPanel";
import Box from '@mui/material/Box';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';
//import muiButton from '@mui/material/Button';


function Button(props) {
    //const [counter, setCounter] = React.useState(20);

    return (
        <Box sx={{ height: 50, width: 50, color:'green' }} >
            <button onClick={props.onClickFunction}>
                {props.label}
            </button>
        </Box>)
}

export default Button