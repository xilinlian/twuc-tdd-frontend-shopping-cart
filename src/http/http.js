import axios from 'axios';

const PRODUCTS_URL = 'http://127.0.0.1:8000/';

export const getData = async () => {
  const result = await axios.get(PRODUCTS_URL);
  return result.data;
};
