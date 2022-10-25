import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { event } from 'd3-drag';
import './JSONForceGraph.css';
import createJsonFiles from '../neo4j/test3';

// import nodes and links from JSON files
// import nodes from '../JSONFiles/test_nodenames3.json';
// import links from '../JSONFiles/test_nodelinks3.json';
// import nodes from '../neo4j/test_ids.json';
// import links from '../neo4j/test.json';
// import createCompleteJson from "../neo4j/test3";

function JSONForceGraph(props) {

    //initilize svg or grab svg
    var svg = d3.select("svg");

    // Creates JSON files from database
    // createJsonFiles();

    // let test = createCompleteJson();

    let graph = ""

    useEffect(() => {
        let tmp = "";
        const getData = async () => {
            tmp = await createJsonFiles();
            console.log("Received JSON1 = " + tmp);
        };

        // getData().then(r => {console.log("Getting data from database")});
        return () => {
            // this now gets called when the component unmounts
            graph = tmp
            console.log("Raw graph value1: " + graph.toString())
        };
    }, []);

    console.log("GRAPH = " + graph)
    if (graph != null) {
        console.log("NULL")

    } else {
        console.log("NOT NULL")
        graph = JSON.parse(graph);


        //var width = 1150
        //var height = 1150
        setTimeout(function () {
            console.log("Received JSON2 = " + test);
            var width = document.getElementById('visContainer').clientWidth;
            var height = document.getElementById('visContainer').clientHeight;


            // var offsetwidth = document.getElementById("visContainer").offsetWidth;
            // var offsetheight = document.getElementById("visContainer").offsetHeight;
            // console.log("width = " + document.getElementById("forceGraph").offsetWidth
            //     + "\theight = " + document.getElementById("forceGraph").offsetHeight)

            // let graph = ""
            // setTimeout(() => { graph = JSON.parse(test.toString()); }, 100);


            console.log("GRAPH JSON OBJECT 1= " + JSON.stringify(graph).toString() + " Raw graph value2: " + graph.toString());

            var simulation = d3
                .forceSimulation(graph.nodes)
                .force(
                    "link",
                    d3
                        .forceLink()
                        .id(function (d) {
                            if (d != null) {
                                return d.name;
                            }
                        })
                        .links(graph.links)
                )

                .force("charge", d3.forceManyBody().strength(-0.3))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .on("tick", ticked);

            console.log("GRAPH JSON OBJECT 2= " + JSON.stringify(graph));

            var link = svg
                .append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(graph.links)
                .enter()
                .append("line")
                .attr("stroke-width", function (d) {
                    return 3;
                });

            var node = svg
                .append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(graph.nodes)
                .enter()
                .append("circle")
                .attr("r", 5)
                .attr("fill", function (d) {
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
                    .attr("x1", function (d) {
                        return d.source.x;
                    })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });

                node
                    .attr("cx", function (d) {
                        // return d.x;
                        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
                    })
                    .attr("cy", function (d) {
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
    }
    return (
        <div id='forceGraph'
             style={{
                 width: '100%',
                 height: '100%'
             }}>
            <svg id={'graph'}
                 ref={svg}
                 width={"100%"}
                 height={"100%"}></svg>
        </div>
    )
}

export default JSONForceGraph;