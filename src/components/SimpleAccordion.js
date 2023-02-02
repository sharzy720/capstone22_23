import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TimestepDropdown from "./TimestepDropdown";
import LimitDropdown from "./LimitDropdown";
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

    console.log("====ACCORDIAN PROP VALUES====")
    console.log("props.timestep.graph1 == " + props.timestep.graph1)
    console.log("props.limit.graph1 == " + props.limit.graph1)

    /**
     * User selected timestep of transactions to query
     * @type {String, Function}
     */
    const [timeStep, setTimeStep] = React.useState(props.timestep);

    /**
     * User selected number of transactions to return from the database
     * @type {Number, Function}
     */
    const [limit, setLimit] = React.useState(props.limit)

    console.log("====ACCORDIAN LOCAL VALUES====")
    console.log("timestep.graph1 == " + timeStep.graph1)
    console.log("limit.graph1 == " + limit.graph1)

    /**
     * Updates the timestep and limit values in the parent component
     */
    const updateValue = () => {
        console.log("====Accordian prop values====\nTIMESTEP == " + props.timestep.graph1 + "\n LIMIT == " + props.limit.graph1);
        console.log("====Accordian local values====\nTIMESTEP == " + timeStep.graph1 + "\n LIMIT == " + limit.graph1);
        props.setTimestep(timeStep);
        props.setLimit(limit);
        console.log("====Accordian prop values after sent====\nTIMESTEP == " + props.timestep.graph1 + "\n LIMIT == " + props.limit.graph1);
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
                    <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep} graph={"1"} />

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown setLimit={setLimit} limit={limit} graph={"1"}/>

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton onClickFunction={updateValue}/>
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
                    <TimestepDropdown />

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown />

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton />

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton/>
                </AccordionDetails>
            </Accordion>

            {/* Graph 3 details */}
            <Accordion disabled>
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
                    <TimestepDropdown />

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown />

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton />

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton/>
                </AccordionDetails>
            </Accordion>

            {/* Graph 4 details */}
            <Accordion disabled>
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
                    <TimestepDropdown />

                    <br/>

                    {/* Selecting the number of transactions to display */}
                    <LimitDropdown />

                    <br/>

                    {/* Button to display a graph with the users selected parameters */}
                    <DisplayButton />

                    <br/>

                    {/* Button to remove the associated graph*/}
                    <RemoveGraphButton/>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}