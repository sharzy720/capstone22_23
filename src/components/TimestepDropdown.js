/**
 * @file Dropdown menu for timestep
 * @author Johnathyn Strong and Nickolas Wofford
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Creates a drop-down menu for selecting a timestep to visualize
 * @param {Function} props.setTimestep
 * @param {Number} props.graph What graph is associated to this dropdown
 * @returns {JSX.Element}
 */
function TimestepDropdown (props) {

    // console.log("====TIMESTEP DROPDOWN PROP VALUES====")
    // console.log("props.timestep.graph1 == " + JSON.stringify(props.timestep))

    /**
     * User selected timestep of transactions
     * @type {String, Function}
     */
    const [timeStep, setTimeStep] = React.useState("");

    /**
     * Event handle for user interacting with the drop-down.
     * @param event
     */
    const handleChange = (event) => {
        setTimeStep(event.target.value);
        switch (props.graph) {
            case "1":
                props.setTimestep(previousState => {
                    return { ...previousState, graph1: event.target.value }
                });
                break;
            case "2":
                props.setTimestep(previousState => {
                    return { ...previousState, graph2: event.target.value }
                });
                break;
            case "3":
                props.setTimestep(previousState => {
                    return { ...previousState, graph3: event.target.value }
                });
                break;
            case "4":
                props.setTimestep(previousState => {
                    return { ...previousState, graph4: event.target.value }
                });
                break;
        }
    };

    // const updateTimeStep = () => {
    //     props.setTimestep(previousState => {
    //         return { ...previousState, graph1: timeStep }
    //     })
    // }

    return (
        <Box sx={{ minWidth: 120, height: '50px' }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="time-step-select-label">Time Step</InputLabel>
                <Select
                    labelId="time-step-select-label"
                    id="time-step-select"
                    value={timeStep}
                    label="time"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default TimestepDropdown