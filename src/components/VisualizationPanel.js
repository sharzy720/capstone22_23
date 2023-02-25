/**
 * @file The visualization panel that contains the visualization and handles all the API requests
 * @author Johnathyn Strong and Nickolas Wofford
 */

import React, {useEffect, useState} from 'react'
import JSONForceGraph from "./JSONForceGraph";
import axios from "axios";

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
     * @type {Object, Function} nodes
     */
    const [nodes, setNodes]=useState()

    /**
     * JSON object with all transaction links received from the database
     * @type {Object, Function} links
     */
    const [links, setLinks]=useState()



    // API request to get users JSON object

    /**
     * React to changes on node count
     */
    useEffect(() => {
        console.log("Visualization panel getting users")
        if (props.timestep <= noGraph) {
            axios.get("http://localhost:4000/users/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setNodes(res.data))
                .catch(err => console.log(err))
        }
    }, [props.timestep, props.limit]);

    // API request to get transactions JSON object
    useEffect(() => {
        console.log("Visualization panel getting transactions")
        if (props.timestep <= noGraph) {
            axios.get("http://localhost:4000/transactions/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setLinks(res.data))
                .catch(err => console.log(err))
        }
    }, [nodes]);

    
    return (
        // Container for the graph visualization
        <div
            id={'visContainer'}
            style={{
                backgroundColor: props.color,
                height: "47.3vh", // According to math 47.5vh should be the perfect height, but it runs offscreen
                width: "100%",
                margin: "0px"}}>
            {/*{*/}
            {/*    props.timestep <= noGraph? <JSONForceGraph nodes={nodes} links={links} graphId={props.graphId}/> : null*/}
            {/*}*/}
            <JSONForceGraph nodes={nodes} links={links} graphId={props.graphId}/>
        </div>
    );
}

export default VisualizationPanel