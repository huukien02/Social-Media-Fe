import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { generateAxiosConfig, generateAxiosConfig2 } from "../config";

export const userLogin = createAsyncThunk<
  any,
  { username: any; password: any }
>("api/user-login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const postData = { username, password };

    const response = await axios.post<any>(
      `${process.env.URL_BE}/auth/user/login`,
      postData
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const createUser = createAsyncThunk<
  any,
  { username: any; password: any; email: any }
>(
  "api/create-user",
  async ({ username, password, email }, { rejectWithValue }) => {
    try {
      const postData = { username, password, email };

      const response = await axios.post<any>(
        `${process.env.URL_BE}/users/create`,
        postData
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createUserFromCsv = createAsyncThunk<any, { file: File }>(
  "api/create-user-csv",
  async ({ file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post<any>(
        `${process.env.URL_BE}/users/create/from-csv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDataPosts = createAsyncThunk<any>(
  "api/get-posts",
  async (_, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const response = await axios.get<any[]>(
        `${process.env.URL_BE}/posts`,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createPost = createAsyncThunk<
  any,
  { title: any; content: any; image: any }
>("api/create-post", async ({ title, content, image }, { rejectWithValue }) => {
  try {
    const config: AxiosRequestConfig = generateAxiosConfig();
    const postData = { title, content, image };
    const response = await axios.post<any>(
      `${process.env.URL_BE}/posts/create`,
      postData,
      config
    );

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
  }
});

export const getDataUsers = createAsyncThunk<any>(
  "api/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const response = await axios.get<any[]>(
        `${process.env.URL_BE}/users`,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDataUser = createAsyncThunk<any>(
  "api/fetchDetailUser",
  async (_, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const response = await axios.get<any[]>(
        `${process.env.URL_BE}/users/detail`,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "api/upload-image",
  async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${process.env.URL_BE}/users/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  }
);

export const postComment = createAsyncThunk<any, { id: any; comment: any }>(
  "api/create-comment",
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      //  const config: AxiosRequestConfig = generateAxiosConfig();
      const config: AxiosRequestConfig = generateAxiosConfig2();
      const postData = { postId: id, content: comment };
      const response = await axios.post<any>(
        `${process.env.URL_BE}/comments/create`,
        postData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const reactionPost = createAsyncThunk(
  "api/reaction-post",
  async ({ postId, reactionType }: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.URL_BE}/posts/reaction/${postId}/${reactionType}`,
        {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMail = createAsyncThunk<any, { email: any }>(
  "api/send-mail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const postData = { email: email };
      const response = await axios.post<any>(
        `${process.env.URL_BE}/users/send-email`,
        postData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
