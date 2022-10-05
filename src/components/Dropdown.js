import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Dropdown (props) {
    const [time_step, setTime_step] = React.useState('');

    const handleChange = (event) => {
        setTime_step(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="time-step-select-label">Time Step</InputLabel>
                <Select
                    labelId="time-step-select-label"
                    id="time-step-select"
                    value={time_step}
                    label="time"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

export default Dropdown