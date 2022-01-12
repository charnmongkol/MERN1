import axios from "axios";
import {
  POSTS_ALL_FAIL,
  POSTS_ALL_REQUEST,
  POSTS_ALL_SUCCESS,
  POSTS_CREATE_REQUEST,
  POSTS_CREATE_SUCCESS,
  POSTS_DELETE_FAIL,
  POSTS_DELETE_REQUEST,
  POSTS_DELETE_SUCCESS,
  POSTS_LIST_FAIL,
  POSTS_LIST_REQUEST,
  POSTS_LIST_SUCCESS,
  POSTS_UPDATE_FAIL,
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
} from "../constants/postsConstants";

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: POSTS_ALL_REQUEST,
    });
    const { data } = await axios.get("/api/posts/allPosts");

    dispatch({
      type: POSTS_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_ALL_FAIL,
      payload: message,
    });
  }
};

export const listPosts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/posts`, config);

    dispatch({
      type: POSTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPostAction =
  (
    title,
    content,
    category,
    code,
    startAt,
    endAt,
    commission,
    seats,
    pdfFile
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_CREATE_REQUEST,
      });

      //get useInfo in state
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          //sending in json format
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //api calls
      const { data } = await axios.post(
        `/api/posts/create`,
        {
          title,
          content,
          category,
          code,
          startAt,
          endAt,
          commission,
          seats,
          pdfFile,
        },
        config
      );

      dispatch({
        type: POSTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_LIST_FAIL,
        payload: message,
      });
    }
  };

export const updatePostAction =
  (
    id,
    title,
    content,
    category,
    code,
    startAt,
    endAt,
    commission,
    seats,
    pdfFile
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: POSTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/posts/${id}`,
        {
          title,
          content,
          category,
          code,
          startAt,
          endAt,
          commission,
          seats,
          pdfFile,
        },
        config
      );

      dispatch({
        type: POSTS_UPDATE_SUCCESS,
        pauload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: POSTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deletePostAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POSTS_DELETE_REQUEST,
    });

    //tale userInfo from the state
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/posts/${id}`, config);

    dispatch({
      type: POSTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: POSTS_DELETE_FAIL,
      payload: message,
    });
  }
};
//go to myPost to create a logic
