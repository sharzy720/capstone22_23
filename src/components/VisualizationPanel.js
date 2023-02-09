/**
 * @file The visualization panel that contains the visualization and handles all the API requests
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React, {useEffect, useState} from 'react'
import {Paper} from "@mui/material";
import JSONForceGraph from "./JSONForceGraph";
import axios from "axios";
import nodes from "../testData/users.json";
import links from "../testData/transactions.json";

/**
 * Creates the visualization panel and calls the graph visualization
 *
 * @param {Object} props.timestep
 * @param {Object} props.limit
 * @param {String} props.graphId
 * @returns {JSX.Element}
 * @constructor
 */
function VisualizationPanel(props) {

    // const nodes = require('../testData/users.json');
    // const links = require('../testData/transactions.json');

    /**
     * Whether to display the graph
     * @type {boolean}
     */
    // let displayGraph = props.timestep !== 51;

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
            // console.log("====NODE USE EFFECT RUNNING====")
            // console.log("VALUE OF TIMESTEP == " + props.timestep)
            // console.log("VALUE OF LIMIT == " + props.limit)
            // console.log("URL == http://localhost:4000/users/" + props.timestep + "/" + props.limit)

            axios.get("http://localhost:4000/users/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setNodes(res.data))
                .catch(err => console.log(err))
            // console.log("====RECEIVED NODES====")
            // console.log(nodes)
            // console.log("====RECEIVED NODES====")
        }
    }, [props.timestep, props.limit]);

    // API request to get transactions JSON object
    useEffect(() => {
        if (props.timestep <= noGraph) {
            // console.log("====LINK USE EFFECT RUNNING====")
            // console.log("VALUE OF TIMESTEP == " + props.timestep)
            // console.log("VALUE OF LIMIT == " + props.limit)
            // console.log("URL == http://localhost:4000/transactions/" + props.timestep + "/" + props.limit)

            axios.get("http://localhost:4000/transactions/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setLinks(res.data))
                .catch(err => console.log(err))
            // console.log("====RECEIVED LINKS====")
            // console.log(links)
            // console.log("====RECEIVED LINKS====")
        }
    }, [nodes]); // removed dependency: links

    
    return (
        // <Paper style={{
        //     // backgroundColor: "lavender",
        //                // minHeight: "98.5vh",
        //                // width: "100%"
        // }}>

            // Container for the graph visualization
            <div
                id={'visContainer'}
                style={{
                    backgroundColor: props.color,
                    height: "46.25vh",
                    width: "100%",
                    margin: "0px",
                    border: "1px solid black"}}>
                {/*{*/}
                {/*    props.timestep <= noGraph? <JSONForceGraph nodes={nodes} links={links} graphId={props.graphId}/> : null*/}
                {/*}*/}
                <JSONForceGraph nodes={nodes} links={links} graphId={props.graphId}/>
            </div>
        // {/*</Paper>*/}
    );
}

export default VisualizationPanel