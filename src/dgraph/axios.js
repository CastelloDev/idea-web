const axios = require("axios").default;

var axiosClient;

export const getAxiosClient = () => {
  if (!axiosClient) {
    axiosClient = axios.create({
      baseURL: "http://localhost:8080/graphql",
      timeout: 4000,
      headers: {
        "Content-Type": "application/graphql",
      },
    });
  }
  return axiosClient;
};
