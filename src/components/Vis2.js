import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { event } from 'd3-drag';
import './Vis2.css';

function Vis2()  {
    console.log("Hang1\n");
    let margin = {top: 10, right: 30, bottom: 30, left: 40};
    let svg = d3.select("svg");


    //const width = parseInt(d3.select('#vis').style('width')) - margin.left - margin.right;
    //const height = parseInt(d3.select('#vis').style('height')) - margin.top - margin.bottom;
    console.log("Hang2\n");
    let graph = {
        nodes: [
            { name: "Alice" },
            { name: "Bob" }
        ],
        links: [
            { source: "Alice", target: "Bob" }
        ]
    };
    console.log("Hang3\n");
    let link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke-width", function(d) {
            return 3;
        });
    console.log("Hang4\n");
    let node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", function(d) {
            return "red";
        });
    console.log("Hang5\n");
    return (
        <div id='vis'>
            <svg ref={svg}></svg>
        </div>
    )

}

export default Vis2;