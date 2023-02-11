/**
 * @file Dropdown menu for visualization background color
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
 * @param {String} props.graph
 * @param {String} props.vizColor
 * @param {Function} props.setVizColor
 * @returns {JSX.Element}
 */
function ColorDropdown (props) {

    /**
     * User selected number of transactions
     * @type {String, Function}
     */
    const [color, setColor] = React.useState("")

    /**
     * Background color options for the visualizations, colors should go from light to dark
     * @type {*[String]}
     */
    const vizBackground = ['Snow', 'LightSalmon', 'DarkSeaGreen', 'SteelBlue', 'SlateGrey', 'Black']



    /**
     * If the user has already selected a background color then that color will be reselected
     */
    useEffect(() => {
        console.log("testing received limit value")
        if (props.vizColor !== '9999') {
            console.log("Color acceptable")
            setColor(props.vizColor);
        }
    }, [props.vizColor]);

    /**
     * Event handle for user interacting with the drop-down.
     * @param event
     */
    const handleChange = (event) => {
        switch (props.graph) {
            case "1":
                props.setVizColor(previousState => {
                    return { ...previousState, graph1: event.target.value }
                });
                break;
            case "2":
                props.setVizColor(previousState => {
                    return { ...previousState, graph2: event.target.value }
                });
                break;
            case "3":
                props.setVizColor(previousState => {
                    return { ...previousState, graph3: event.target.value }
                });
                break;
            case "4":
                props.setVizColor(previousState => {
                    return { ...previousState, graph4: event.target.value }
                });
                break;
        }
        setColor(event.target.value);
    };

    return (
        <Box sx={{ height: '50px' }}>
            <FormControl fullWidth variant={"filled"}>
                <InputLabel id="color-select-label">Background Color</InputLabel>
                <Select
                    labelId="color-select-label"
                    id="color-select"
                    value={color}
                    label="color"
                    onChange={handleChange}
                    inputProps={{
                        MenuProps: {
                            MenuListProps: {
                                sx: {
                                    // Color of the background behind the menu options
                                    background: "linear-gradient(" + vizBackground[0] + ", " + vizBackground[5] + ")"
                                }
                            }
                        }
                    }}
                >
                    <MenuItem value={vizBackground[0]} style={{
                        backgroundColor: vizBackground[0]
                    }}>{vizBackground[0]}</MenuItem>

                    <MenuItem value={vizBackground[1]} style={{
                        backgroundColor: vizBackground[1]
                    }}>{vizBackground[1]}</MenuItem>

                    <MenuItem value={vizBackground[2]} style={{
                        backgroundColor: vizBackground[2]
                    }}>{vizBackground[2]}</MenuItem>

                    <MenuItem value={vizBackground[3]} style={{
                        backgroundColor: vizBackground[3]
                    }}>{vizBackground[3]}</MenuItem>

                    <MenuItem value={vizBackground[4]} style={{
                        backgroundColor: vizBackground[4]
                    }}>{vizBackground[4]}</MenuItem>

                    <MenuItem value={vizBackground[5]} style={{
                        backgroundColor: vizBackground[5],
                        color: 'white'
                    }}>{vizBackground[5]}</MenuItem>

                </Select>
            </FormControl>
        </Box>
    );
}

export default ColorDropdown