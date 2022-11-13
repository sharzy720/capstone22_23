import React from 'react'
import {Paper} from "@mui/material";
import DisplayButton from "./DisplayButton";
import TimestepDropdown from "./TimestepDropdown";
import LimitDropdown from "./LimitDropdown";

const numNodes = 4000; // Temp data value for amount of nodes in the graph

function DetailsPanel(props) {
    const [timeStep, setTimeStep] = React.useState('1');
    const [limit, setLimit] = React.useState('500')

    const updateValue = () => props.setGraph(timeStep);
    return (
        // old background color 'lightcoral
        <Paper style={{
            backgroundColor: 'lightblue',
            minHeight: '98.5vh'
        }}>
            <div style={{padding: '20px'}}>

                {/* Title */}
                <h1 style={{ margin: '0'}}>
                    Elliptic dataset
                </h1>

                <br/>

                {/* sub information */}
                <h4>Number of transactions in database: {numNodes}</h4>

                {/*<br/>*/}

                {/* Details about the dataset */}
                <p style={{ fontSize: '16px' }}>
                    The Elliptic dataset is a collection of transactions made using bitcoin taken over the course of 50 time steps.
                    Each time step has around 7,000 unique transactions. However, our subset of this dataset only has 1,000 unique transactions per time step.
                </p>

                {/* Selecting the time step to display */}
                <TimestepDropdown setTime_step={setTimeStep} timeStep={timeStep} />
                {/*<DisplayButton onClickFunction={updateValue} label={props.graph} />*/}

                <br/>
                {/*<br/>*/}

                {/* Selecting the number of transactions to display */}
                <LimitDropdown setLimit_step={setLimit} limit={limit} />

                <br/>

                {/* Button to display a graph with the users selected parameters */}
                <DisplayButton onClickFunction={updateValue} label={props.graph} />

                {/* Footer */}
                {/*<div style={{*/}
                {/*    display: 'flex',*/}
                {/*    justifyContent: 'flex-end',*/}
                {/*    alignItems: 'flex-end'*/}
                {/*}}>*/}
                    <h4 style={{
                        position: 'absolute',
                        bottom: '0'
                    }}>Developed by Johnathyn Strong and Nick Wofford</h4>
                {/*</div>*/}

            </div>
        </Paper>
    );
}

export default DetailsPanel