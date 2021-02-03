import { createReducer } from "./reducerUtil";
import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/constants";

const initialState = [];

export const createProduct = (state, payload) => {
  return [...state, Object.assign({}, payload.product)];
};

export const fetchProducts = (state, payload) => {
  return payload.products;
};

export const updateProduct = (state, payload) => {
  return [
    // Object.assign({}, payload.product),
    ...state.map((product) => {
      if (product.id === payload.product.id) return payload.product;
      else return product;
    }),
  ];
};

export default createReducer(initialState, {
  [CREATE_PRODUCT]: createProduct,
  [FETCH_PRODUCTS]: fetchProducts,
  [UPDATE_PRODUCT]: updateProduct,
});
