const getAPIData = async (apiQuery: string, aditional?: string) => {
  const axios = require("axios");
  const apiRoot = "https://api.themoviedb.org/3/";
  const apiKey = "&api_key=6507f6186210afe2e01d68be1466a2f7";

  const apiUrl = apiRoot + apiQuery + apiKey;

  let apiData = [];

  try {
    const { data: response } = await axios.get(apiUrl);
    apiData = response.results;
  } catch (error) {
    console.log(error);
  }

  return apiData;
};

export default getAPIData;
