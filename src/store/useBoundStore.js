import create from "zustand";
import { createEdge, getAllIdeas } from "../services/IdeaService";
import { createIdeaNode, getNodeEdges } from "../util/general";

export const useBoundStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getAllIdeas: async () => {
    const ideas = await getAllIdeas();
    const nodes = ideas.map((idea) => createIdeaNode(idea));
    const edges = getNodeEdges(ideas);

    set((state) => ({ ...state, nodes, edges }));
  },
  createEdge: async (sourceNodeId, targetNodeId) => {
    await createEdge(sourceNodeId, targetNodeId);

    const { getAllIdeas } = get();
    await getAllIdeas();
  },
}));
