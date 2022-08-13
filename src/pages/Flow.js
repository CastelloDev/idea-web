import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";
import defaultNodes from "../data/nodes.js";
import defaultEdges from "../data/edges.js";
import { getAllIdeas } from "../services/IdeaService.js";
import { useEffect, useState } from "react";
import { createIdeaNode, getNodeEdges } from "../util/general.js";
import nodeTypes from "../data/nodeTypes.js";
import dagre from "dagre";

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

const connectionLineStyle = { stroke: "black" };

function getDagreNodeEdges(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });
  const nodeWidth = 240;
  const nodeHeight = 140;
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = "top";
    node.sourcePosition = "bottom";

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
}

function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  useEffect(() => {
    getAllIdeas().then((ideas) => {
      const _nodes = ideas.map((idea) => createIdeaNode(idea));
      const _edges = getNodeEdges(ideas);

      // Without dagre
      // setNodes(_nodes);
      // setEdges(_edges);

      const { nodes: dagreNodes, edges: dagreEdges } = getDagreNodeEdges(
        _nodes,
        _edges
      );
      setNodes(dagreNodes);
      setEdges(dagreEdges);
    });
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={nodes}
        defaultEdges={edges}
        defaultEdgeOptions={edgeOptions}
        fitView
        connectionLineStyle={connectionLineStyle}
      />
      <Background />
      <Controls />
    </ReactFlowProvider>
  );
}

export default Flow;
