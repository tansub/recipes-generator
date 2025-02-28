import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
  error: null,
  selectedPost: null,
};

// get post by id
export const getById = createAsyncThunk("post/getById", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/post/${id}`); 
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to fetch recipe");
  }
});

// create post
export const createPost = createAsyncThunk("post/createPost", async (params, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/post", params); 
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

// get all posts
// export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.get("/post"); // Fixed endpoint
//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to fetch posts");
//   }
// });

// get my posts
export const getMyPosts = createAsyncThunk("post/getMyPosts", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/post/user/me");
      if (!Array.isArray(data)) {
        return rejectWithValue("You don't have any recipes saved");
      }
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch your recipes");
    }
  });

// delete post
export const deletePost = createAsyncThunk("post/deletePost", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/post/${id}`); 
    return id;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to delete recipe");
  }
});

// update post
export const updatePost = createAsyncThunk("post/updatePost", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/post/${id}`, updatedData); 
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data || "Failed to update recipe");
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // all posts
    //   .addCase(getAllPosts.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getAllPosts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.posts = action.payload.posts;
    //     state.popularPosts = action.payload.popularPosts;
    //   })
    //   .addCase(getAllPosts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

      // get posts
      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.selectedPost = null;
      })

      // update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.selectedPost = action.payload;
        state.posts = state.posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get post by id
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;
