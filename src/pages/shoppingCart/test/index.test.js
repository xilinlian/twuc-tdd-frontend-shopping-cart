import {render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ShoppingCart from '../index';
import {getProducts} from '../../../service';

jest.mock('../../../service');

describe('Shopping Cart', () => {
  test('should show shopping cart page', () => {
    getProducts.mockResolvedValue([]);
    const { getByText } = render(<ShoppingCart/>);

    expect(getByText('Shopping Cart')).toBeInTheDocument();
  });

  test('should show empty shopping cart given product list is empty', () => {
    getProducts.mockResolvedValue([]);
    const {container, getByText} = render(<ShoppingCart/>);
    const products = container.getElementsByClassName('product');

    expect(products.length).toBe(0);
    expect(getByText('商品名称')).toBeInTheDocument();
    expect(getByText('数量')).toBeInTheDocument();
    expect(getByText('单价')).toBeInTheDocument();
  });

  test('should show shopping cart given product list has products', async () => {
    let mockProduct = [
      {'id': 1, 'name': '小米手环', 'price': 299.00, 'count': 1},
      {'id': 2, 'name': '任天堂 Nintendo Switch', 'price': 2099.00, 'count': 2},
      {'id': 3, 'name': 'SONY WH-1000XM4 无线智能降噪耳机', 'price': 2099.00, 'count': 1},
      {'id': 4, 'name': 'iPhone 13 256GB', 'price': 6799.00, 'count': 1}
    ];
    getProducts.mockResolvedValue(mockProduct);

    const {container} = render(<ShoppingCart/>);
    const products = container.getElementsByClassName('product');


    waitFor(() => {
      expect(products).toHaveLength(mockProduct.length);
      products.forEach((product, i) => {
        expect(product.getByText(mockProduct[i].name)).toBeInTheDocument();
        expect(product.getByText(mockProduct[i].price)).toBeInTheDocument();
        expect(product.getByText(mockProduct[i].count)).toBeInTheDocument();
      });
    });

  });
});
