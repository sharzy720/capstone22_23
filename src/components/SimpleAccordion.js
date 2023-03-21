/**
 * @file Accordion that holds all user choices pertaining to displaying graphs
 * @author Johnathyn Strong and Nickolas Wofford
 */

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimestepDropdown from "./TimestepDropdown";
import LimitDropdown from "./LimitDropdown";
import ColorDropdown from "./ColorDropdown";
import DisplayButton from "./DisplayButton";
import RemoveGraphButton from "./RemoveGraphButton";

/**
 *
 *
 * @param {Object} props.timestep
 * @param {Object} props.limit
 * @param {Object} props.vizBackgroundColor
 * @param {Function} props.setTimestep
 * @param {Function} props.setLimit
 * @param {Function} props.setVizBackgroundColor
 * @returns {JSX.Element}
 * @constructor
 */
export default function SimpleAccordion(props) {

    /**
     * User selected timestep of transactions to query
     * @type {Object, Function}
     */
    const [timeStep, setTimeStep] = React.useState(props.timestep);

    /**
     * User selected number of transactions to return from the database
     * @type {Object, Function}
     */
    const [limit, setLimit] = React.useState(props.limit);

    /**
     * User selected color for visualization
     * @type {Object, Function}
     */
    const [selectedBackgroundColors, setSelectedBackgroundColors] = React.useState(props.vizBackgroundColor);


    /**
     * Updates the timestep and limit values in the parent component
     */
    const updateValue = () => {
        props.setTimestep(timeStep);
        props.setLimit(limit);
        props.setVizBackgroundColor(selectedBackgroundColors);
    }

    /**
     * Displays the graph relative to the pressed to button
     * @param {String} graph
     */
    const showGraph = (graph) => {
        switch (parseInt(graph)) {
            case 1:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph1: true}
                });
                break;
            case 2:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph2: true}
                });
                // console.log("display button 2")
                // setDisabledAccordion(previousState => {
                //     console.log("ADDING GRAPH3 ACCORDION")
                //     return { ...previousState, graph3: false}
                // });
                break;
            case 3:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph3: true}
                });
                // setDisabledAccordion(previousState => {
                //     return { ...previousState, graph4: false}
                // });
                break;
            case 4:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph4: true}
                });
                break;
            default:
                console.log("Received value of: " + graph.toString());
        }
        updateValue();
        // console.log("SHOW TIMESTEP VALUE" + JSON.stringify(timeStep))
        // console.log("SHOW SELECTED LIMIT VALUE" + JSON.stringify(limit))
    }

    /**
     * Hides the graph relative to the pressed to button
     * @param {String} graph
     */
    const removeGraph = (graph) => {
        switch (parseInt(graph)) {
            case 1:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph1: false}
                });
                break;
            case 2:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph2: false}
                });
                break;
            case 3:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph3: false}
                });
                break;
            case 4:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph4: false}
                });
                break;
            default:
                console.log("Received value of: " + graph.toString());
        }
        console.log("SHOW GRAPH VALUES" + JSON.stringify(showGraph))
    }

    /**
     * The open state of each accordion displayed
     * @type {Array, Function}
     */
    const [accordionState, setAccordionState] = React.useState([false, false, false, false])

    /**
     * Closes all accordions except the most recently clicked one
     * @param {Number} accordionIndex
     */
    function closeAccordions(accordionIndex) {
        setAccordionState(accordionState.map((state, index) => {
            return index === accordionIndex;
        }))
    }

    return (
        <div>
            {/* Graph 1 details */}
            <Accordion expanded={accordionState[0]} onChange={(event, expanded) => {
                expanded && closeAccordions(0);
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        backgroundColor: "#2763D1",
                        color: "white"
                    }}
                >
                    <Typography>Graph 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Selecting the time step to display */}
                    <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep.graph1} graph={"1"} />

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown setLimit={setLimit} limit={limit.graph1} graph={"1"}/>

                    <br/>

                    {/* Selecting the background color for the graph */}
                    <ColorDropdown setSelectedBackgroundColors={setSelectedBackgroundColors} selectedBackgroundColor={selectedBackgroundColors.graph1} graph={"1"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={"1"}/>
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={"1"}/>
                </AccordionDetails>
            </Accordion>


            {/* Graph 2 details */}
            <Accordion expanded={accordionState[1]} onChange={(event, expanded) => {
                expanded && closeAccordions(1);
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                        backgroundColor: "#2763D1",
                        color: "white"
                    }}
                >
                    <Typography>Graph 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Selecting the time step to display */}
                    <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep.graph2} graph={"2"}/>

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown setLimit={setLimit} limit={limit.graph2} graph={"2"}/>

                    <br/>

                    {/* Selecting the background color for the graph */}
                    <ColorDropdown setSelectedBackgroundColors={setSelectedBackgroundColors} selectedBackgroundColor={selectedBackgroundColors.graph2} graph={"2"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={"2"}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={"2"}/>
                </AccordionDetails>
            </Accordion>


            {/* Graph 3 details */}
            <Accordion expanded={accordionState[2]} onChange={(event, expanded) => {
                expanded && closeAccordions(2);
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    sx={{
                        backgroundColor: "#2763D1",
                        color: "white"
                    }}
                >
                    <Typography>Graph 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Selecting the time step to display */}
                    <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep.graph3} graph={"3"}/>

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown setLimit={setLimit} limit={limit.graph3} graph={"3"}/>

                    <br/>

                    {/* Selecting the background color for the graph */}
                    <ColorDropdown setSelectedBackgroundColors={setSelectedBackgroundColors} selectedBackgroundColor={selectedBackgroundColors.graph3} graph={"3"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={"3"}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={"3"}/>
                </AccordionDetails>
            </Accordion>


            {/* Graph 4 details */}
            <Accordion expanded={accordionState[3]} onChange={(event, expanded) => {
                expanded && closeAccordions(3);
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                    sx={{
                        backgroundColor: "#2763D1",
                        color: "white"
                    }}
                >
                    <Typography>Graph 4</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* Selecting the time step to display */}
                    <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep.graph4} graph={"4"}/>

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown setLimit={setLimit} limit={limit.graph4} graph={"4"}/>

                    <br/>

                    {/* Selecting the background color for the graph */}
                    <ColorDropdown setSelectedBackgroundColors={setSelectedBackgroundColors} selectedBackgroundColor={selectedBackgroundColors.graph4} graph={"4"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={"4"}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={"4"}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}