/**
 * @file The detail panel that contains information about the dataset and handles all user inputted data
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React from 'react'
import {Paper} from "@mui/material";
import DisplayButton from "./DisplayButton";
import TimestepDropdown from "./TimestepDropdown";
import LimitDropdown from "./LimitDropdown";

/**
 * Current number of transactions in the database
 * @type {number}
 */
const numOfTransactions = 4000;

/**
 * Creates the detail panel and handles user input
 *
 * @param {Function} props.setTimestep
 * @param {Function} props.setLimit
 * @returns {JSX.Element}
 * @constructor
 */
function DetailsPanel(props) {
    /**
     * User selected timestep of transactions to query
     * @type {String, Function}
     */
    const [timeStep, setTimeStep] = React.useState();

    /**
     * User selected number of transactions to return from the database
     * @type {Number, Function}
     */
    const [limit, setLimit] = React.useState()

    /**
     * Updates the timestep and limit values in the parent component
     */
    const updateValue = () => {
        props.setTimestep(timeStep);
        props.setLimit(limit);
    }


    return (
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
                <h4>Number of transactions in database: {numOfTransactions}</h4>


                {/* Details about the dataset */}
                <p style={{ fontSize: '16px' }}>
                    The Elliptic dataset is a collection of transactions made using bitcoin taken over the course of 50 time steps.
                    Each time step has around 7,000 unique transactions. However, our subset of this dataset only has 1,000 unique transactions per time step.
                </p>

                {/* Selecting the time step to display */}
                <TimestepDropdown setTimestep={setTimeStep} timestep={timeStep} />
                {/*<DisplayButton onClickFunction={updateValue} label={props.graph} />*/}

                <br/>

                {/* Selecting the number of transactions to display */}
                <LimitDropdown setLimit={setLimit} limit={limit} />

                <br/>

                {/* Button to display a graph with the users selected parameters */}
                <DisplayButton onClickFunction={updateValue} label={props.timestep} />


                <h4 style={{
                    position: 'absolute',
                    bottom: '0'
                }}>Developed by Johnathyn Strong and Nick Wofford</h4>
            </div>
        </Paper>
    );
}

export default DetailsPanel