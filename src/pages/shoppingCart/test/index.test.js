import { getByText, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import ShoppingCart from "../index";
import { getProducts } from "../../../service";
import PRODUCTS from "../../../mockData/products.json";

jest.mock("../../../service");

describe("Shopping Cart", () => {
  test("should show shopping cart page", () => {
    getProducts.mockResolvedValue([]);
    const { getByText } = render(<ShoppingCart />);

    expect(getByText("Shopping Cart")).toBeInTheDocument();
  });

  test("should show empty shopping cart given product list is empty", () => {
    getProducts.mockResolvedValue([]);
    const { container, getByText } = render(<ShoppingCart />);
    const products = container.getElementsByClassName("product");

    expect(products.length).toBe(0);
    expect(getByText("商品名称")).toBeInTheDocument();
    expect(getByText("数量")).toBeInTheDocument();
    expect(getByText("单价")).toBeInTheDocument();
  });

  test("should show shopping cart given product list has products", async () => {
    let mockProduct = PRODUCTS;
    getProducts.mockResolvedValue(mockProduct);

    const { container } = render(<ShoppingCart />);

    await waitFor(() => {
      const products = Array.from(container.getElementsByClassName("product"));
      expect(products).toHaveLength(mockProduct.length);
      products.forEach((product, i) => {
        expect(getByText(product, mockProduct[i].name)).toBeInTheDocument();
        expect(getByText(product, mockProduct[i].price)).toBeInTheDocument();
        expect(getByText(product, mockProduct[i].count)).toBeInTheDocument();
      });
    });
  });
});
