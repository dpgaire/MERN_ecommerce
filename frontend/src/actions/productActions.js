import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispach) => {
  try {
    dispach({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    dispach({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispach({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

export const detailsProduct = (id) => async (dispach) => {
  try {
    dispach({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
    // const { data } = await axios.get("/api/products/62666ba9df000d919ba026ee");

    dispach({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispach({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};
