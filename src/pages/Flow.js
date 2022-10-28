import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";
import { useCallback, useEffect } from "react";
import nodeTypes from "../data/nodeTypes.js";
import { useBoundStore } from "../store/useBoundStore.js";

const edgeOptions = {
  animated: true,
  style: {
    stroke: "black",
  },
};

const connectionLineStyle = { stroke: "black" };

function Flow() {
  const nodes = useBoundStore((state) => state.nodes);
  const edges = useBoundStore((state) => state.edges);
  const getAllIdeas = useBoundStore((state) => state.getAllIdeas);
  const createEdge = useBoundStore((state) => state.createEdge);

  useEffect(() => {
    getAllIdeas();
  }, [getAllIdeas]);

  const onConnect = useCallback(
    (params) => createEdge(params.source, params.target),
    [createEdge]
  );
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => console.log(oldEdge, newConnection),
    []
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={nodes}
        defaultEdges={edges}
        defaultEdgeOptions={edgeOptions}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        connectionLineStyle={connectionLineStyle}
        fitView
      />
      <Background />
      <Controls />
    </ReactFlowProvider>
  );
}

export default Flow;
