import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_DETAILS_RESET,
} from "../constants/userConstants";
import { ORDER_LIST_RESET } from "../constants/orderConstants";
import axios from "axios";
export const userLogin = (email, password) => async (dispach) => {
  try {
    dispach({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispach({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispach({
      type: USER_LOGIN_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

export const userRegister = (email, password, name) => async (dispach) => {
  try {
    dispach({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register",
      { email, password, name },
      config
    );
    dispach({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispach({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispach({
      type: USER_REGISTER_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispach, getState) => {
  try {
    dispach({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);
    dispach({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispach({
      type: USER_DETAILS_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispach, getState) => {
  try {
    dispach({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispach({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispach({
      type: USER_DETAILS_FAIL,
      payload:
        error.resonse && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
   dispatch({ type: USER_DETAILS_RESET });
   dispatch({ type: ORDER_LIST_RESET });

};
