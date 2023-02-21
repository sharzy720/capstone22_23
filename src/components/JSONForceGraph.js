/**
 * @file D3 Force graph visualization.
 * @author Johnathyn Strong and Nickolas Wofford
 */
import React, {useEffect} from 'react';
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

    /**
     * Http object, change value to state where the svg will be attached
     * @type {object}
     */
    const svg = d3.select("#" + props.graphId);

    /**
     * useEffect() reaction to change. Might remove.
     */
    // useEffect(() => {
    //     svg.selectAll("g").remove();
    // }, [props.links]);
    useEffect(() => {
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
                })
                .on('mouseover', function (d, i) {
                    // console.log("the value of d3.select is: " + JSON.stringify(d3.selectAll("circle")))

                });

            /**
             * Pop out div for displaying a nodes id
             */
            var div = d3.select("body").append("div")
                .attr("class", "node-details")
                .style("opacity", 0);


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
                    return "black";
                })
                // Display node pop out on mouse over
                .on('mouseover', function (d) {
                    d3.selectAll("line").each(function (f) {
                        if (f.source.name === d.name) { // finding the source
                            // console.log("f's source name = " + f.source.name)
                            // console.log("f's target name = " + f.target.name)
                            d3.selectAll("circle").each(function (j) { // finding the targets
                                if (j.name === f.target.name) {
                                    // console.log("j as a string = " + JSON.stringify(j))
                                    d3.select(this).transition()
                                        .duration('50')
                                        .attr('fill', 'Blue')
                                }

                                // d3.select(f.target).transition()
                                //     .duration('50')
                                //     .attr('fill', 'blue')
                            })
                        }
                        // console.log("d's source name = " + f.source.name)
                        // console.log("d's target name = " + f.target.name)
                    })
                    d3.select(this).transition()
                        .duration('50')
                        .attr('fill', 'Red');
                    div.transition()
                        .duration(50)
                        .style("opacity", 1);
                    // let nodeDetails = ("id: " + d.name + " | class: " + decodeNodeClass(d.class));
                    let nodeDetails = (d.name + " | " + decodeNodeClass(d.class));
                    div.html(nodeDetails)
                        .style("left", (d3.event.pageX + 25) + "px")    // Old value + 10
                        .style("top", (d3.event.pageY - 30) + "px");    // Old value - 15
                })
                // Hide node pop out when mouse moves off node
                .on('mouseout', function (d) {
                    d3.selectAll("line").each(function (f) {
                        if (f.source.name === d.name) { // finding the source
                            d3.selectAll("circle").each(function (j) { // finding the targets
                                if (j.name === f.target.name) {
                                    console.log("j as a string = " + JSON.stringify(j))
                                    d3.select(this).transition()
                                        .duration('50')
                                        .attr('fill', 'black')
                                }
                            })
                        }
                    })
                    d3.select(this).transition()
                        .duration('50')
                        .attr('fill', 'black');
                    div.transition()
                        .duration('50')
                        .style("opacity", 0);
                })
                .call(
                    d3
                        .drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded)
                );

            /**
             *
             * @param {string} nodeClass
             * @returns {string}
             */
            function decodeNodeClass(nodeClass) {
                let userClass;
                switch (nodeClass) {
                    case "1":
                        userClass = "Illicit";
                        break;
                    case "2":
                        userClass = "Licit";
                        break;
                    default:
                        userClass = "Unknown";
                        break;
                }
                return userClass;
            }

            function ticked() {
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
    }, [props.links]);

    return (
        <div id='forceGraph'
            style={{
                width: '100%',
                height: '100%',
                margin: "0px",
                padding: "0px"
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