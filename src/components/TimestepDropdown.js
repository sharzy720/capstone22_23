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
import {useEffect} from "react";

/**
 * Creates a drop-down menu for selecting a timestep to visualize
 * @param {Function} props.setTimestep
 * @param {String} props.timestep
 * @param {String} props.graph What graph is associated to this dropdown
 * @returns {JSX.Element}
 */
function TimestepDropdown (props) {

    /**
     * User selected timestep of transactions
     * @type {String, Function}
     */
    const [timeStep, setTimeStep] = React.useState("");


    useEffect(() => {
        if (parseInt(props.timestep) < 50) {
            setTimeStep(props.timestep);
        } else {
            setTimeStep("");
        }
    }, [props.timestep]);

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

    return (
        <Box sx={{ minWidth: 120, height: '50px', backgroundColor: "2D82C4" }}>
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
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={13}>13</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={15}>15</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={17}>17</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={19}>19</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={21}>21</MenuItem>
                    <MenuItem value={22}>22</MenuItem>
                    <MenuItem value={23}>23</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={26}>26</MenuItem>
                    <MenuItem value={27}>27</MenuItem>
                    <MenuItem value={28}>28</MenuItem>
                    <MenuItem value={29}>29</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={31}>31</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                    <MenuItem value={33}>33</MenuItem>
                    <MenuItem value={34}>34</MenuItem>
                    <MenuItem value={35}>35</MenuItem>
                    <MenuItem value={36}>36</MenuItem>
                    <MenuItem value={37}>37</MenuItem>
                    <MenuItem value={38}>38</MenuItem>
                    <MenuItem value={39}>39</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={41}>41</MenuItem>
                    <MenuItem value={42}>42</MenuItem>
                    <MenuItem value={43}>43</MenuItem>
                    <MenuItem value={44}>44</MenuItem>
                    <MenuItem value={45}>45</MenuItem>
                    <MenuItem value={46}>46</MenuItem>
                    <MenuItem value={47}>47</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                    <MenuItem value={49}>49</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default TimestepDropdown