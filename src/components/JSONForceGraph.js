import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from "axios";

// import { event } from 'd3-drag';
import './JSONForceGraph.css';

// import nodes and links from JSON files
import nodes from '../JSONFiles/users.json';
import links from '../JSONFiles/transactions.json';

function JSONForceGraph(props) {

    //initilize svg or grab svg
    var svg = d3.select("svg");
    // Make request
    axios.get('http://localhost:4000/transactions/4')
        // Show response data
        .then(res => console.log(res.data))
        .catch(err => console.log(err))


    //svg = svg.clear();
    //var width = 1150
    //var height = 1150
    setTimeout(function() {
        var width = document.getElementById('visContainer').clientWidth;
        var height = document.getElementById('visContainer').clientHeight;
        svg.selectAll("g").remove();
        console.log("hello world");
        // TODO Query here.

        // var offsetwidth = document.getElementById("visContainer").offsetWidth;
        // var offsetheight = document.getElementById("visContainer").offsetHeight;
        // console.log("width = " + document.getElementById("forceGraph").offsetWidth
        //     + "\theight = " + document.getElementById("forceGraph").offsetHeight)



        var simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink()
                    .id(function (d) {
                        if (d != null) {
                            return d.name;
                        }
                    })
                    .links(links)
            )
            .force("charge", d3.forceManyBody().strength(-0.3))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);



        var link = svg
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("stroke-width", function(d) {
                return 3;
            });

        var node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", function(d) {
                return "red";
            })
            .call(
                d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            );

        function ticked() {
            // var tick_width = document.getElementById("forceGraph").offsetWidth;
            // var tick_height = document.getElementById("forceGraph").offsetHeight;

            // Allows for a boundry to be set up at the edges on the display area
            var radius = 0;

            link
                .attr("x1", function(d) {
                    return d.source.x;
                })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });

            node
                .attr("cx", function(d) {
                    // return d.x;
                    return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
                })
                .attr("cy", function(d) {
                    // return d.y;
                    return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
                });
        }

        function dragstarted(d) {
            // States how fast nodes will spread out while dragging
            var alpha = 0.1

            if (!d3.event.active) simulation.alphaTarget(alpha).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
            // States how fast nodes will spread out when stopped dragging
            var alpha = 0

            if (!d3.event.active) simulation.alphaTarget(alpha);
            d.fx = null;
            d.fy = null;
        }
    }, 100);
    return (
        <div id='forceGraph'
            style={{
                width: '100%',
                height: '100%'
            }}>
            {props.timestep}
            <svg id={'graph'}
                 ref={svg}
                 width={"100%"}
                 height={"100%"}>
            </svg>
        </div>
    )
}

export default JSONForceGraph;