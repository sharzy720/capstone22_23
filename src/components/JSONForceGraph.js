/**
 * @file D3 Force graph visualization.
 * @author Johnathyn Strong and Nickolas Wofford
 */
import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import './JSONForceGraph.css';

/**
 * Creates a force directed graph using the given links and nodes
 * @param {Number} props.timestep
 * @param {JSON} props.links
 * @param {JSON} props.nodes
 * @param {String} props.graphId
 * @returns {JSX.Element}
 */
function JSONForceGraph(props) {

    // console.log("Prop nodes = " + props.nodes)
    // console.log("Prop links = " + props.links)

    // const test = useRef(null);

    /**
     * Http object, change value to state where the svg will be attached
     * @type {object}
     */
    const svg = d3.select("#" + props.graphId);

    /**
     * useEffect() reaction to change. Might remove.
     */
    useEffect(() => {
        svg.selectAll("g").remove();
    }, [props.links]);

    setTimeout(function() {

        /**
         * width of container
         * @type {number}
         */
        let width = document.getElementById('visContainer').clientWidth;

        /**
         * height of container
         * @type {number}
         */
        let height = document.getElementById('visContainer').clientHeight;
        svg.selectAll("g").remove();

        /**
         * d3 force simulation
         * @type {object}
         */
        let simulation = d3
            .forceSimulation(props.nodes)
            .force(
                "link",
                d3
                    .forceLink()
                    .id(function (d) {
                        if (d != null) {
                            return d.name;
                        }
                    })
                    .links(props.links)
            )
            .force("charge", d3.forceManyBody().strength(-0.3))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        /**
         * Link data
         * @type {list}
         */
        let link = svg
            .append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(props.links)
            .enter()
            .append("line")
            .attr("stroke-width", function () {
                return 3;
            });

        /**
         * Node data
         * @type {list}
         */
        let node = svg
            .append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(props.nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", function () {
                return "red";
            })
            .call(
                d3
                    .drag()
                    .on("start", dragStarted)
                    .on("drag", dragged)
                    .on("end", dragEnded)
            );


        function ticked() {
            // console.log("JSON FORCE GRAPH TICKED IS RUNNING")
            // Allows for a boundary to be set up at the edges on the display area
            const radius = 0;

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

        function dragStarted(d) {
            // States how fast nodes will spread out while dragging
            const alpha = 0.1

            if (!d3.event.active) simulation.alphaTarget(alpha).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {

            // States how fast nodes will spread out when stopped dragging
            const alpha = 0;

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
            <svg id={props.graphId}
                 {...svg}
                 width={"100%"}
                 height={"100%"}>
            </svg>
        </div>
    )
}

export default JSONForceGraph;