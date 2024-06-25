// api.js
import axios from "axios";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "./actions";

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products");
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
