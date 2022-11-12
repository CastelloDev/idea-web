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
  const updateIdeaPosition = useBoundStore((state) => state.updateIdeaPosition);

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
  const onNodeDragStop = useCallback(
    (event, node, nodes) => {
      updateIdeaPosition(node);
    },
    [updateIdeaPosition]
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={nodes}
        defaultEdges={edges}
        defaultEdgeOptions={edgeOptions}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onEdgeUpdate={onEdgeUpdate}
        connectionLineStyle={connectionLineStyle}
      />
      <Background />
      <Controls />
    </ReactFlowProvider>
  );
}

export default Flow;
