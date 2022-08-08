import { getAxiosClient } from "../dgraph/axios";

export const getAllIdeas = async () => {
  const client = getAxiosClient();
  const query = `query {
        queryIdea {
          id
          title
          ideas {
            id
          }
        }
      }`;
  const res = await client.post("", query);
  return res.data.data.queryIdea;
};
