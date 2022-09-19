import axios from 'axios';
import { getData } from '../http';
import PRODUCTS from '../../mockData/products.json';

jest.mock('axios');

const PRODUCTS_URL = 'http://127.0.0.1:8000/';
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

      expect(axios.get).toBeCalledWith(PRODUCTS_URL);

      expect(actual).toEqual(mockData);
    });
  });
});
