import axios from 'axios';
import { getData } from '../http';
import PRODUCTS from '../../mockData/products.json';

jest.mock('axios');

describe('http', function () {
  describe('getData', function () {
    it('should send request and return data', async function () {
      let mockData = {
        products: PRODUCTS,
      };

      axios.get.mockResolvedValue({
        data: mockData,
      });

      const actual = await getData();

      expect(axios.get).toBeCalledWith('http://127.0.0.1:8000/');

      expect(actual).toEqual(mockData);
    });
  });
});
