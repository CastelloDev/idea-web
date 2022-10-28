import { getAxiosClient } from "../dgraph/axios";

export const getAllIdeas = async () => {
  const client = getAxiosClient();
  const query = `query {
        queryIdea {
          id
          title
          description
          ideas {
            id
          }
        }
      }`;
  const res = await client.post("", query);
  console.log("🚀 ~ file: IdeaService.js ~ line 16 ~ getAllIdeas ~ res", res);
  return res.data.data.queryIdea;
};

export const createIdea = async (idea) => {
  const client = getAxiosClient();
  const input = JSON.stringify(idea).replace(/"([^"]+)":/g, "$1:");
  const query = `mutation {
    addIdea(input: [${input}]) {
      idea {
        title
        ideas {
            title
        }
      }
    }
  }`;
  const res = await client.post("", query);
  return res.data.data.addIdea;
};

export const createEdge = async (sourceNodeId, targetNodeId) => {
  const client = getAxiosClient();
  const toIds = [{ id: targetNodeId }];
  const input = JSON.stringify(toIds).replace(/"([^"]+)":/g, "$1:");
  console.log(
    "🚀 ~ file: IdeaService.js ~ line 40 ~ createEdge ~ input",
    input
  );
  const query = `
  mutation {
    updateIdea(input: {
      filter: { id: "${sourceNodeId}"},
      set: { ideas: ${input} }
    }) {
      numUids
    }
  }
  `;
  console.log(
    "🚀 ~ file: IdeaService.js ~ line 46 ~ createEdge ~ query",
    query
  );
  const res = await client.post("", query);
  console.log("🚀 ~ file: IdeaService.js ~ line 57 ~ createEdge ~ res", res);
  return res.data.data.updateIdea;
};

export const removeEdge = async (fromId, toId) => {
  const client = getAxiosClient();
  const toIds = [{ id: toId }];
  const input = JSON.stringify(toIds).replace(/"([^"]+)":/g, "$1:");
  console.log(
    "🚀 ~ file: IdeaService.js ~ line 40 ~ createEdge ~ input",
    input
  );
  const query = `
  mutation {
    updateIdea(input: {
        filter: { id: "${fromId}"},
        remove: { ideas: ${input} }
    }) {
        numUids
    }
  }
  `;
  const res = await client.post("", query);
  return res.data.data.updateIdea;
};
