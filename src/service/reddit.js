import axios from "axios";

export const getSubmissions = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.pushshift.io/reddit/search/submission/?q=${query}`)
      .then((response) => {
        return resolve(response.data.data);
      })
      .catch((err) => {
        return reject(err.response.data);
      });
  });
};
