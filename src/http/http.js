import axios from 'axios';

export const getData = async () => {
  const result = await axios.get('http://127.0.0.1:8000/');
  return result.data;
};
