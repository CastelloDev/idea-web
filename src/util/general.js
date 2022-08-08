export const createIdeaNode = (idea) => {
  return {
    id: idea.id,
    data: { label: idea.title },
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
  };
};

export const getNodeEdges = (ideas) => {
  let edges = [];
  ideas.forEach((idea) => {
    const ideaEdges = idea.ideas.map((i) => ({
      id: `e${idea.id}-${i.id}`,
      source: idea.id,
      target: i.id,
    }));
    edges = [...edges, ...ideaEdges];
  });

  return edges;
};
