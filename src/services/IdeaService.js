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
