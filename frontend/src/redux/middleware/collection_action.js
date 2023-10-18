import axios from "axios";

export const fetch_collections = (page) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/collections?page=${page}`);

    dispatch({
      type: "SET_COLLECTIONS",
      payload: {
        collections: response.data.collections,
        totalPages: response.data.totalPages,
      },
    });
  };
};
