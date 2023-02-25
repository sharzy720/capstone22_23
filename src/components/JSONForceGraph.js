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
     * @type {Object}
     */
    const svg = d3.select("#" + props.graphId);

    useEffect(() => {
        setTimeout(function() {

            /**
            * width of container
            * @type {Number}
            */
            let width = document.getElementById('visContainer').clientWidth;

            /**
             * height of container
             * @type {Number}
             */
            let height = document.getElementById('visContainer').clientHeight;
            svg.selectAll("g").remove();

            /**
             * d3 force simulation
             * @type {Object}
             */
            let simulation = d3
                .forceSimulation(props.nodes)
                .force(
                    "link",
                    d3.forceLink()
                        .id(function (currentNode) {
                            if (currentNode != null) {
                                return currentNode.name;
                            }
                        })
                        .links(props.links)
                )
                .force("charge", d3.forceManyBody().strength(-0.3))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .on("tick", ticked);

            /**
             * Link data
             * @type {Object}
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
                    // unused mouse over event for a link
                });

            /**
             * Pop out div for displaying a nodes id
             * @type {Object}
             */
            let div = d3
                .select("body")
                .append("div")
                .attr("class", "node-details")
                .style("opacity", 0);

            /**
             * Node data
             * @type {Object}
             */
            let node = svg
                .append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(props.nodes)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("fill", function (currentNode) {
                    return getNodeClassColor(currentNode.class);
                })
                // Display node pop out on mouse over
                .on('mouseover', function (currentNode) {
                    d3.selectAll("line").each(function (transaction) {

                        // Check if the current node is a part of any transactions
                        if (currentNode.name === transaction.source.name) {
                            d3.selectAll("circle").each(function (targetNode) {

                                // Check if the target node is a target of any valid transactions
                                //  where the currentNode === the sourceNode
                                if (targetNode.name === transaction.target.name) {
                                    colorNode(this, "Blue")
                                }
                            })
                        }
                    })
                    colorNode(this, "Red");
                    displayNodeDetails(true, currentNode.name + " | " + decodeNodeClass(currentNode.class));
                })
                // Hide node pop out when mouse moves off node
                .on('mouseout', function (currentNode) {
                    d3.selectAll("line").each(function (transaction) {

                        // Check if the current node is a part of any transactions
                        if (currentNode.name === transaction.source.name) {
                            d3.selectAll("circle").each(function (targetNode) {

                                // Check if the target node is a target of any valid transactions
                                //  where the currentNode === the sourceNode
                                if (targetNode.name === transaction.target.name) {
                                    colorNode(this, getNodeClassColor(targetNode.class))
                                }
                            })
                        }
                    })
                    colorNode(this, getNodeClassColor(currentNode.class))
                    displayNodeDetails(false);
                })
                .call(
                    d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded)
                );

            /**
             * Display node detail pop out
             * @param {Boolean} display
             * @param {String} details
             */
            function displayNodeDetails(display, details = "") {
                if (!display) {
                    div.transition()
                        .duration(50)
                        .style("opacity", 0);
                    return;
                }
                div.transition()
                    .duration(50)
                    .style("opacity", 1);
                div.html(details)
                    .style("left", (d3.event.pageX + 25) + "px")    // Old value + 10
                    .style("top", (d3.event.pageY - 30) + "px");    // Old value - 15
            }

            /**
             * Fills a given node with the given color
             * @param {Object} nodeObject
             * @param {String} color
             */
            function colorNode(nodeObject, color) {
                d3.select(nodeObject)
                    .transition()
                    .duration('50')
                    .attr('fill', color)
            }

            /**
             * Get the type of node using its class
             * @param {String} nodeClass
             * @returns {String}
             */
            function decodeNodeClass(nodeClass) {
                switch (nodeClass) {
                    case "1":
                        return "Illicit";
                    case "2":
                        return "Licit";
                    default:
                        return "Unknown";
                }
            }

            /**
             * Get a node color using its class
             * @param {String} currentNodeClass
             * @returns {String}
             */
            function getNodeClassColor(currentNodeClass) {
                switch (currentNodeClass) {
                    case "1":
                        return "Chartreuse";
                    case "2":
                        return "DeepPink";
                    default:
                        return "Black";
                }
            }

            /**
             * What happens to each node and link during each time tick
             */
            function ticked() {
                // Allows for a boundary to be set up at the edges of the display area
                const radius = 0;

                link
                    .attr("x1", function(transaction) {
                        return transaction.source.x;
                    })
                    .attr("y1", function(transaction) {
                        return transaction.source.y;
                    })
                    .attr("x2", function(transaction) {
                        return transaction.target.x;
                    })
                    .attr("y2", function(transaction) {
                        return transaction.target.y;
                    });

                node
                    .attr("cx", function(currentNode) {
                        return (currentNode.x = Math.max(radius, Math.min(width - radius, currentNode.x)));
                    })
                    .attr("cy", function(currentNode) {
                        return (currentNode.y = Math.max(radius, Math.min(height - radius, currentNode.y)));
                    });
            }

            /**
             * Handle when a user clicks and drags a node
             * @param {Object} currentNode
             */
            function dragStarted(currentNode) {
                // States how fast nodes will spread out while dragging
                const alpha = 0.1

                if (!d3.event.active) simulation.alphaTarget(alpha).restart();
                currentNode.fx = currentNode.x;
                currentNode.fy = currentNode.y;
            }

            /**
             * Checks for when a node is dragged
             * @param {Object} currentNode
             */
            function dragged(currentNode) {
                currentNode.fx = d3.event.x;
                currentNode.fy = d3.event.y;
            }

            /**
             * Handle when a user stops dragging a node
             * @param {Object} currentNode
             */
            function dragEnded(currentNode) {

                // States how fast nodes will spread out when stopped dragging
                const alpha = 0;

                if (!d3.event.active) simulation.alphaTarget(alpha);
                currentNode.fx = null;
                currentNode.fy = null;
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