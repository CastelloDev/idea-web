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

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

const connectionLineStyle = { stroke: "black" };

function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  useEffect(() => {
    getAllIdeas().then((ideas) => {
      setNodes(ideas.map((idea) => createIdeaNode(idea)));
      setEdges(getNodeEdges(ideas));
    });
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
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
