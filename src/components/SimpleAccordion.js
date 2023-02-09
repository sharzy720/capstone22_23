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
 * @param {Function} props.setTimestep
 * @param {Function} props.setLimit
 * @returns {JSX.Element}
 * @constructor
 */
export default function SimpleAccordion(props) {

    // console.log("====ACCORDIAN PROP VALUES====")
    // console.log("props.timestep.graph1 == " + props.timestep.graph1)
    // console.log("props.limit.graph1 == " + props.limit.graph1)

    /**
     * User selected timestep of transactions to query
     * @type {String, Function}
     */
    const [timeStep, setTimeStep] = React.useState(props.timestep);

    /**
     * User selected number of transactions to return from the database
     * @type {Number, Function}
     */
    const [limit, setLimit] = React.useState(props.limit);

    /**
     * User selected number of transactions to return from the database
     * @type {Number, Function}
     */
    const [color, setColor] = React.useState(props.color);


    const [disabledAccordion, setDisabledAccordion] = React.useState({
        graph3: false,
        graph4: false
    })

    // console.log("====ACCORDIAN LOCAL VALUES====")
    // console.log("timestep.graph1 == " + timeStep.graph1)
    // console.log("limit.graph1 == " + limit.graph1)

    /**
     * Updates the timestep and limit values in the parent component
     */
    const updateValue = () => {
        // console.log("====Accordian prop values====\nTIMESTEP == " + props.timestep.graph1 + "\n LIMIT == " + props.limit.graph1);
        // console.log("====Accordian local values====\nTIMESTEP == " + timeStep.graph1 + "\n LIMIT == " + limit.graph1);
        props.setTimestep(timeStep);
        props.setLimit(limit);
        props.setColor(color);
        // console.log("====Accordian prop values after sent====\nTIMESTEP == " + props.timestep.graph1 + "\n LIMIT == " + props.limit.graph1);
    }

    /**
     *
     * @param graph
     */
    const showGraph = (graph) => {
        switch (graph) {
            case 1:
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
        console.log("SHOW TIMESTEP VALUE" + JSON.stringify(timeStep))
        console.log("SHOW SELECTED LIMIT VALUE" + JSON.stringify(limit))
    }

    /**
     *
     * @param graph
     */
    const removeGraph = (graph) => {
        switch (graph) {
            case 2:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph2: false}
                });
                break;
            case 3:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph3: false}
                });
                // setDisabledAccordion(previousState => {
                //     console.log("REMOVING GRAPH3 ACCORDION")
                //     return { ...previousState, graph3: true}
                // });
                break;
            case 4:
                props.setShowGraph(previousState => {
                    return { ...previousState, graph4: false}
                });
                // setDisabledAccordion(previousState => {
                //     return { ...previousState, graph4: true}
                // });
                break;
            default:
                console.log("Received value of: " + graph.toString());
        }
        console.log("SHOW GRAPH VALUES" + JSON.stringify(showGraph))
    }

    return (
        <div>
            {/* Graph 1 details */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        backgroundColor: "Lavender"
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

                    {/* Selecting the backgroun color for the graph */}
                    <ColorDropdown setColor={setColor} color={color.graph1} graph={"1"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={1}/>
                </AccordionDetails>
            </Accordion>

            {/* Graph 2 details */}
            <Accordion >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                        backgroundColor: "Lavender"
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

                    {/* Selecting the backgroun color for the graph */}
                    <ColorDropdown setColor={setColor} color={color.graph2} graph={"2"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={2}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={2}/>
                </AccordionDetails>
            </Accordion>

            {/* Graph 3 details */}
            <Accordion disabled={disabledAccordion.graph3}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    sx={{
                        backgroundColor: "Lavender"
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

                    {/* Selecting the backgroun color for the graph */}
                    <ColorDropdown setColor={setColor} color={color.graph3} graph={"3"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={3}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={3}/>
                </AccordionDetails>
            </Accordion>

            {/* Graph 4 details */}
            <Accordion disabled={disabledAccordion.graph4}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                    sx={{
                        backgroundColor: "Lavender"
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

                    {/* Selecting the backgroun color for the graph */}
                    <ColorDropdown setColor={setColor} color={color.graph4} graph={"4"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={showGraph} graphNum={4}/>

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton onClickFunction={removeGraph} graphNum={4}/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}