import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '44820639-952f0c833853b1e1c1ece8d2c';

export const searchImages = async (query, page = 1, perPage = 15) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
