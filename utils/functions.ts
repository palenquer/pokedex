import axios from "axios";

async function fetchData(url: string) {
  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export function fetchAllData(urls: []) {
  return Promise.all(urls.map(fetchData));
}
