/**
 * @file Dropdown menu for Limits
 * @author Johnathyn Strong and Nickolas Wofford
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect} from "react";

/**
 * Creates a drop-down menu for selecting a timestep to visualize
 * @param {Function} props.setLimit
 * @param {String} props.limit
 * @param {String} props.graph
 * @returns {JSX.Element}
 */
function ColorDropdown (props) {

    // console.log("====TIMESTEP DROPDOWN PROP VALUES====")
    // console.log("props.limit.graph1 == " + JSON.stringify(props.limit))

    /**
     * User selected number of transactions
     * @type {String, Function}
     */
    const [color, setColor] = React.useState("")


    useEffect(() => {
        console.log("testing received limit value")
        if (parseInt(props.color) < 9999) {
            console.log("value acceptable")
            setColor(props.color);
        } else {
            console.log("value is too small")
            setColor("");
        }
    }, [props.color]);

    /**
     * Event handle for user interacting with the drop-down.
     * @param event
     */
    const handleChange = (event) => {
        switch (props.graph) {
            case "1":
                props.setColor(previousState => {
                    return { ...previousState, graph1: event.target.value }
                });
                break;
            case "2":
                props.setColor(previousState => {
                    return { ...previousState, graph2: event.target.value }
                });
                break;
            case "3":
                props.setColor(previousState => {
                    return { ...previousState, graph3: event.target.value }
                });
                break;
            case "4":
                props.setColor(previousState => {
                    return { ...previousState, graph4: event.target.value }
                });
                break;
        }
        setColor(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, height: '50px' }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="color-select-label">Background Color</InputLabel>
                <Select
                    labelId="color-select-label"
                    id="color-select"
                    value={color}
                    label="color"
                    onChange={handleChange}
                >
                    <MenuItem value={'PapayaWhip'}>PapayaWhip</MenuItem>
                    <MenuItem value={'Snow'}>Snow</MenuItem>
                    <MenuItem value={'SteelBlue'}>SteelBlue</MenuItem>
                    <MenuItem value={'SlateGrey'}>SlateGrey</MenuItem>
                    <MenuItem value={'Black'}>Black</MenuItem>
                    <MenuItem value={'DarkSeaGreen'}>DarkSeaGreen</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default ColorDropdown