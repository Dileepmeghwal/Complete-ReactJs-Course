// src/redux/actions/authActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../types";

const API_URL = "https://api.escuelajs.co/api/v1";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.status === 201) {
      const token = response.data.access_token;
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      localStorage.setItem("token", token);
      console.log("Login successful:", response);

      return token;
    } else {
      dispatch({ type: LOGIN_FAILURE, error: "Login failed" });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, error: "Login failed" });
    console.error(error);
  }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await axios.post(`${API_URL}/users/`, {
      name,
      email,
      password,
      avatar,
    });

    if (response.status === 201) {
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      console.log(response.data);
      return response.data;
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        error: error.response?.data?.message || error.message,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      error: error.response?.data?.message || error.message,
    });
    console.error("Registration error:", error);
    throw error;
  }
};
