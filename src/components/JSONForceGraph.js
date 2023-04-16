/**
 * @file D3 Force graph visualization.
 * @author Johnathyn Strong and Nickolas Wofford
 */
import React, {useEffect} from 'react';
import * as d3 from 'd3';
import './JSONForceGraph.css';

/**
 * Creates a force directed graph using the given links and nodes
 * @param {Object} props.showGraph
 * @param {Number} props.timestep
 * @param {JSON} props.links
 * @param {JSON} props.nodes
 * @param {String} props.graphId
 * @param {String} props.vizPanelId
 * @returns {JSX.Element}
 */
function JSONForceGraph(props) {

    /**
     * Http object, change value to state where the svg will be attached
     * @type {Object}
     */
    const svg = d3.select("#" + props.graphId);

    /**
     * Last node clicked
     * @type {Object, Function}
     */
    const [previousNode, setPreviousNode] = React.useState();

    /**
     * Current node being moused over
     * @type {Object, Function}
     */
    const [mouseOverNode, setMouseOverNode] = React.useState();

    /**
     * Current node that the mouse moved off
     * @type {Object, Function}
     */
    const [mouseOffNode, setMouseOffNode] = React.useState();

    /**
     * Current width of the browser window
     * @type {Number, Function}
     */
    const [windowWidth, setWindowWidth] = React.useState();

    /**
     * Current height of the browser window
     * @type {Number, Function}
     */
    const [windowHeight, setWindowHeight] = React.useState();

    let transform = d3.zoomIdentity;

    /**
     * Get a node color using its class
     * @param {String} currentNodeClass
     * @returns {String}
     */
    function getNodeClassColor(currentNodeClass) {
        switch (currentNodeClass) {
            case "1":
                return "#00D0FF";
            case "2":
                return "#0C69FF";
            default:
                return "#06327A";
        }
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

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }

        window.addEventListener('resize', handleResize);
    });


    useEffect(() => {
        setTimeout(function() {

            /**
             * width of container
             * @type {Number}
             */
            let width = document.getElementById(props.vizPanelId).clientWidth;
            // width = document.getElementById(props.vizPanelId).clientWidth;

            /**
             * height of container
             * @type {Number}
             */
            let height = document.getElementById(props.vizPanelId).clientHeight;
            // height = document.getElementById(props.vizPanelId).clientHeight;
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
                // TODO center needs to be based on zoomRect as well as the zoomRect needs to be centered on the screen
                .force("center", d3.forceCenter((width * 2) / 2, (height * 2) / 2))
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

            const zoomRect = svg.append("rect")
                .attr("width", (width * 2))
                .attr("height", (height * 2))
                .style("fill", "none")
                .style("pointer-events", "all")

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
                    setMouseOverNode(currentNode.name);

                    // console.log("Over\n");
                    displayNodeDetails(true, currentNode.name + " | " + decodeNodeClass(currentNode.class));
                })
                // Hide node pop out when mouse moves off node
                .on('mouseout', function (currentNode) {
                    setMouseOffNode(currentNode.name);
                    //setMouseOverNode("");
                    // console.log("Off\n");
                    displayNodeDetails(false);
                })
                .on('click', function (currentNode) {
                    props.setSelectedNode(currentNode.name);
                    // previousNode = selectedNode;
                    //selectedNode = currentNode;

                })
                .call(
                    d3.drag()
                        .on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded)
                );

            const zoom = d3.zoom()
                .scaleExtent([1/2, 64])
                .translateExtent([[0, 0], [width * 2, height * 2]])
                .on("zoom", zoomed);

            zoomRect.call(zoom)
                .call(zoom.translateTo, width, height);



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
                        return (currentNode.x = Math.max(radius, Math.min((width * 2) - radius, currentNode.x)));
                    })
                    .attr("cy", function(currentNode) {
                        return (currentNode.y = Math.max(radius, Math.min((height * 2) - radius, currentNode.y)));
                    });
            }

            /**
             * Allows for a user to zoom into the visualization panel
             */
            function zoomed() {
                transform = d3.event.transform;
                node.attr("transform", d3.event.transform);
                link.attr("transform", d3.event.transform);
                // console.log("zoomRect height = " + zoomRect.height);
                // console.log("zoomRect width = " + zoomRect.width);
            }

            /**
             * Handle when a user clicks and drags a node
             * @param {Object} currentNode
             */
            function dragStarted(currentNode) {
                // States how fast nodes will spread out while dragging
                const alpha = 0.2

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
    }, [props.links, props.showGraph, windowWidth, windowHeight]);


    useEffect(() => {
        if (mouseOverNode !== "") {
            // console.log("OverE " + mouseOverNode + "\n");
            d3.selectAll("line").each(function (transaction) {
                // Check if the current node is a part of any transactions
                if (mouseOverNode === transaction.source.name) {
                    d3.selectAll("circle").each(function (targetNode) {

                        // Check if the target node is a target of any valid transactions
                        //  where the currentNode === the sourceNode
                        if (targetNode.name === transaction.target.name &&
                            targetNode.name !== props.selectedNode) {
                            colorNode(this, "#A50871")
                        }
                    })
                }
            })
            d3.selectAll("circle").each(function (targetNode) {
                if (targetNode.name === mouseOverNode && targetNode.name !== props.selectedNode) {
                    colorNode(this, "#FF4800");
                }
            })
            setMouseOverNode("");
        }
    }, [mouseOverNode, props.selectedNode]);

    useEffect(() => {
        if (mouseOffNode !== "") {
            // console.log("OffE " + mouseOffNode + "\n");
            d3.selectAll("line").each(function (transaction) {

                // Check if the current node is a part of any transactions
                if (mouseOffNode === transaction.source.name) {
                    d3.selectAll("circle").each(function (targetNode) {
                        // Check if the target node is a target of any valid transactions
                        //  where the currentNode === the sourceNode
                        if (targetNode.name === transaction.target.name &&
                            targetNode.name !== props.selectedNode) {
                            colorNode(this, getNodeClassColor(targetNode.class))
                        }
                    })
                }
            })

            d3.selectAll("circle").each(function (targetNode) {
                if (targetNode.name === mouseOffNode && targetNode.name !== props.selectedNode) {

                    colorNode(this, getNodeClassColor(targetNode.class))
                }
            })
            setMouseOffNode("");
        }

    }, [mouseOffNode, props.selectedNode]);

    useEffect(() => {
        //colorNode(props.select, "Yellow")
        d3.selectAll("circle").each(function (targetNode) {
            // Check if the target node is a target of any valid transactions
            //  where the currentNode === the sourceNode
            if (targetNode.name === props.selectedNode) {
                colorNode(this, "#E50E06");
                // console.log(targetNode.name + " " + props.selectedNode);
                //colorNode(this, getNodeClassColor(targetNode.class))
            }
            else if (targetNode.name === previousNode) {

                colorNode(this, getNodeClassColor(targetNode.class));
            }


        })
        setMouseOverNode(props.selectedNode);
        setPreviousNode(props.selectedNode);
    }, [props.selectedNode]);


    return (
        <div id='forceGraph'
             style={{
                 // width: '100%',
                 // height: '100%',
                 // display: 'flex',
                 // justifyContent: 'center',
                 // alignItems: 'center',
                 // margin: "0px",
                 // padding: "0px",
                 // display: 'inline-block',
                 position: 'relative',
                 // right: '50%',
                 // paddingBottom: '400px',
                 border: '1px solid red'
             }}>

            <svg id={props.graphId}
                {...svg}
                width={"100%"}
                height={"100%"}
            style={{
                // position: 'relative',
                // left: '30%',
            }}
            >
            </svg>

        </div>
    )
}

export default JSONForceGraph;