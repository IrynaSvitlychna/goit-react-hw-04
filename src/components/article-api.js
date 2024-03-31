import axios from 'axios';

const API_KEY = "FXcisqttO3AWLgRA0roFWk5Y5dXec7WnnIkC_aylQ_k";

axios.defaults.baseURL = "<https://api.unsplash.com/";

 async function fetchImages(searchQuery, page = 1) {
  const respose = await axios.get("/search/photos", {
    params: {
      query: searchQuery,
      per_page: 10,
      page,
      client_id: API_KEY, 
    },
  });
  return respose.data;
    
};

export default fetchImages;