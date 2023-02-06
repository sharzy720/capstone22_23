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

export default function disableableAccordion(props) {



    return (
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
    );
}