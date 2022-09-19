import { getData } from '../../http/http';
import { getProducts } from '../index';
import PRODUCTS from '../../mockData/products.json';

jest.mock('../../http/http');

describe('service', function () {
  describe('getProducts', function () {
    it('should return products', async function () {
      const mockProducts = PRODUCTS;
      getData.mockResolvedValue({ products: mockProducts });
      const result = await getProducts();

      expect(result).toEqual(mockProducts);
    });
  });
});
