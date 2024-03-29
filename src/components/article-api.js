import axios from 'axios';

axios.defaults.baseURL = "<https://api.unsplash.com/photos";

export const fetchArticles = async (searchQuery, page) => {
  const response = await axios.get("/client_id=FXcisqttO3AWLgRA0roFWk5Y5dXec7WnnIkC_aylQ_k", {
    params: {
      query: searchQuery,
      per_page: 10,
      page,
     
    },
  });
  return response.data.hits;
    
};

