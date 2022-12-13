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

function LimitDropdown (props) {
    /**
     * Event handle for user interacting with the drop down.
     * @param event
     */
    const handleChange = (event) => {
        props.setLimit(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="limit-select-label">Transactions to display</InputLabel>
                <Select
                    labelId="limit-select-label"
                    id="limit-select"
                    value={props.limit}
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