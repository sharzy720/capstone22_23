
import React, {useEffect, useState} from 'react'
import {Paper} from "@mui/material";
import JSONForceGraph from "./JSONForceGraph";
import axios from "axios";

function VisualizationPanel(props) {
    let displayGraph = props.timestep !== 51;

    console.log("displayGraph: " + displayGraph)

    const [nodes, setNodes]=useState()
    const [links, setLinks]=useState()
    useEffect(() => {
        if (props.timestep <= 50) {
            console.log("====USE EFFECT RUNNING====")
            // TODO Query here.
            
            axios.get("http://localhost:4000/users/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setNodes(res.data))
                .catch(err => console.log(err))
            console.log("Received nodes: " + JSON.stringify(nodes))
        }
    }, [props.timestep, props.limit]);
    useEffect(() => {
        if (props.timestep <= 50) {
            console.log("====USE EFFECT RUNNING====")
            // TODO Query here.
            axios.get("http://localhost:4000/transactions/" + props.timestep + "/" + props.limit)
                // Show response data
                .then(res => setLinks(res.data))
                .catch(err => console.log(err))
            console.log("Received links: " + JSON.stringify(links))
        }
    }, [nodes]);

    
    return (
        <Paper style={{backgroundColor: "lightblue",
                       minHeight: "98.5vh",
                       width: "100%"}}>
            {/*<div style={{padding: "20px"}}>*/}
            {/*    Visualization*/}
            {/*    <br/>*/}
            {/*    <p>*/}
            {/*        The visualization of our dataset will be placed here*/}
            {/*    </p>*/}
            {/*</div>*/}

            {/*/!*Container for the graph visualization*!/*/}
            <div
                id={'visContainer'}
                style={{ height: "96vh",
                        width: "73vw",
                        padding: "0px"}}>

                {/*{displayGraph ?
                    <JSONForceGraph timestep={props.timestep} limit={props.limit} /> :
                    console.log("No graph displayed")
                }*/}
                <JSONForceGraph nodes={nodes} links={links} />
            </div>
        </Paper>
    );
}

export default VisualizationPanel