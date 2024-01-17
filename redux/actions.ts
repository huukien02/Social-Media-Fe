import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { generateAxiosConfig } from "../config";

export const getDataPosts = createAsyncThunk<any>(
  "api/get-posts",
  async (_, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const response = await axios.get<any[]>(
        "http://localhost:3000/posts/",
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createPost = createAsyncThunk<any, { title: any; content: any }>(
  "api/create-post",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const postData = { title, content };
      const response = await axios.post<any>(
        "http://localhost:3000/posts/create",
        postData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getDataUsers = createAsyncThunk<any>(
  "api/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const response = await axios.get<any[]>(
        "http://localhost:3000/users",
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
        "http://localhost:3000/users/detail",
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
      "http://localhost:3000/users/upload-image",
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
      const config: AxiosRequestConfig = generateAxiosConfig();
      const postData = { postId: id, content: comment };
      const response = await axios.post<any>(
        "http://localhost:3000/comments/create",
        postData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const reactionPost = createAsyncThunk<any, { postId: any; type: any }>(
  "api/reaction-post",
  async ({ id, type }: any, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const postData = { postId: id, type: type };
      const response = await axios.post<any>(
        "http://localhost:3000/posts/reaction",
        postData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const sendMail = createAsyncThunk<any, { id: any; }>(
  "api/send-mail",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config: AxiosRequestConfig = generateAxiosConfig();
      const postData = { id: id };
      const response = await axios.post<any>(
        "http://localhost:3000/users/send-email",
        postData,
        config
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);
