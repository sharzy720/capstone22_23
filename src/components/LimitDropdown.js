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
function LimitDropdown (props) {

    // console.log("====TIMESTEP DROPDOWN PROP VALUES====")
    // console.log("props.limit.graph1 == " + JSON.stringify(props.limit))

    /**
     * User selected number of transactions
     * @type {String, Function}
     */
    const [limit, setLimit] = React.useState("")


    useEffect(() => {
        console.log("testing received limit value")
        if (parseInt(props.limit) < 9999) {
            console.log("value acceptable")
            setLimit(props.limit);
        } else {
            console.log("value is too small")
            setLimit("");
        }
    }, [props.limit]);

    /**
     * Event handle for user interacting with the drop-down.
     * @param event
     */
    const handleChange = (event) => {
        switch (props.graph) {
            case "1":
                props.setLimit(previousState => {
                    return { ...previousState, graph1: event.target.value }
                });
                break;
            case "2":
                props.setLimit(previousState => {
                    return { ...previousState, graph2: event.target.value }
                });
                break;
            case "3":
                props.setLimit(previousState => {
                    return { ...previousState, graph3: event.target.value }
                });
                break;
            case "4":
                props.setLimit(previousState => {
                    return { ...previousState, graph4: event.target.value }
                });
                break;
        }
        setLimit(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, height: '50px' }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="limit-select-label">Transactions to display</InputLabel>
                <Select
                    labelId="limit-select-label"
                    id="limit-select"
                    value={limit}
                    label="limit"
                    onChange={handleChange}
                >
                    <MenuItem value={125}>125</MenuItem>
                    <MenuItem value={250}>250</MenuItem>
                    <MenuItem value={500}>500</MenuItem>
                    <MenuItem value={1000}>1,000</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default LimitDropdown