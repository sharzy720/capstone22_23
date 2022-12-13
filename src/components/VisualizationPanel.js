/**
 * @file The visualization panel that contains the visualization and handles all the API requests
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React, {useEffect, useState} from 'react'
import {Paper} from "@mui/material";
import JSONForceGraph from "./JSONForceGraph";
import axios from "axios";

/**
 * Creates the visualization panel and calls the graph visualization
 *
 * @param {number} props.timestep
 * @param {number} props.limit
 * @returns {JSX.Element}
 * @constructor
 */
function VisualizationPanel(props) {
    /**
     * Whether to display the graph
     * @type {boolean}
     */
    let displayGraph = props.timestep !== 51;

    /**
     * Used to not display the graph when the app is first loaded
     * @type {number}
     */
    let noGraph = 50;

    /**
     * JSON object with all user nodes received from the database
     * @type {Object} nodes
     */
    const [nodes, setNodes]=useState()

    /**
     * JSON object with all transaction links received from the database
     * @type {Object} links
     */
    const [links, setLinks]=useState()

    

    // API request to get users JSON object

    /**
     * React to changes on node count
     */
    useEffect(() => {
        if (props.timestep <= noGraph) {
            console.log("====USERS USE EFFECT RUNNING====")

            axios.get("http://localhost:4000/users/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setNodes(res.data))
                .catch(err => console.log(err))
        }
    }, [props.timestep, props.limit, noGraph]);

    // API request to get transactions JSON object
    useEffect(() => {
        if (props.timestep <= noGraph) {
            
            axios.get("http://localhost:4000/transactions/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setLinks(res.data))
                .catch(err => console.log(err))
            console.log("Received links: " + JSON.stringify(links))


        }
    }, [nodes, links, noGraph, props.limit, props.timestep]);

    
    return (
        <Paper style={{backgroundColor: "lightblue",
                       minHeight: "98.5vh",
                       width: "100%"}}>

            {/*/!*Container for the graph visualization*!/*/}
            <div
                id={'visContainer'}
                style={{ height: "96vh",
                        width: "73vw",
                        padding: "0px"}}>

                <JSONForceGraph nodes={nodes} links={links} />
            </div>
        </Paper>
    );
}

export default VisualizationPanel