import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPost,
  getDataPosts,
  getDataUser,
  getDataUsers,
  postComment,
  reactionPost,
  sendMail,
  uploadImage,
} from "./actions";

interface ApiState {
  dataPost: null | any;
  loading: boolean;
  error: null | string;
  isCreatePost: null;
  dataUser: null;
  dataUsers: null;
  isUploadImage: null;
  isComment: null;
  isReaction: null;
  isSendMail: null;
}

const initialState: ApiState = {
  dataPost: null,
  isCreatePost: null,
  loading: false,
  error: null,
  dataUser: null,
  dataUsers: null,
  isUploadImage: null,
  isComment: null,
  isReaction: null,
  isSendMail: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    clearSendMailState: (state) => {
      state.isSendMail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Get Post */
      .addCase(getDataPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataPosts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataPost = action.payload;
      })
      .addCase(getDataPosts.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Create Post */
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isCreatePost = action.payload;
      })
      .addCase(createPost.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Get User */
      .addCase(getDataUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataUser = action.payload;
      })
      .addCase(getDataUser.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Get All User */
      .addCase(getDataUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDataUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.dataUsers = action.payload;
      })
      .addCase(getDataUsers.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Upload Image User */
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isUploadImage = action.payload;
      })
      .addCase(uploadImage.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* User Comment */
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isComment = action.payload;
      })
      .addCase(postComment.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Reaction Post */
      .addCase(reactionPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactionPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isReaction = action.payload;
      })
      .addCase(reactionPost.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* Send mail */
      .addCase(sendMail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isSendMail = action.payload;
      })
      .addCase(sendMail.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSendMailState } = apiSlice.actions;
export default apiSlice.reducer;
