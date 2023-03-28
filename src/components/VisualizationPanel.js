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
 * @param {String} props.timestep
 * @param {String} props.limit
 * @param {Object} props.showGraph
 * @param {String} props.vizPanelId
 * @param {String} props.graphId
 * @param {String} props.vizBackgroundColor
 * @param {String} props.selectedNode
 * @param {Function} props.setSelectedNode
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
        console.log(props.vizPanelId + " getting users")
        if (props.timestep <= noGraph) {
            axios.get("http://localhost:4000/users/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setNodes(res.data))
                .catch(err => console.log(err))
        }
    }, [props.timestep, props.limit]);

    // API request to get transactions JSON object
    useEffect(() => {
        console.log(props.vizPanelId + " getting transactions")
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
            id={props.vizPanelId}
            style={{
                backgroundColor: props.vizBackgroundColor,
                height: "47.1652vh", // According to math 47.5vh should be the perfect height, but it runs offscreen
                width: "99.8%",
                border: "thin solid black",
                margin: "0px"}}>
            {/*{*/}
            {/*    props.timestep <= noGraph? <JSONForceGraph nodes={nodes} links={links} graphId={props.graphId}/> : null*/}
            {/*}*/}
            <JSONForceGraph nodes={nodes} links={links}
                            graphId={props.graphId} selectedNode={props.selectedNode}
                            setSelectedNode={props.setSelectedNode} showGraph={props.showGraph}
                            vizPanelId={props.vizPanelId}/>

        </div>
    );
}

export default VisualizationPanel