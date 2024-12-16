import { Success } from "@/api/toastServices";
import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  review: any[];
  total: number;
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  review: [],
  total: 0,
  isLoading: false,
  isSkeleton: false,
};

interface AllUsersPayload {
  start?: number;
  limit?: number;
  search: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  meta: any;
  id?: string;
  data?: any;
  formData?: any;
  payload?: any;
}

export const getReview = createAsyncThunk(
  "api/admin/ratingReview/getReviews",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/ratingReview/getReviews?start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);
export const deletereview = createAsyncThunk(
  "api/admin/ratingReview/deleteReviewByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return axios.delete(`api/admin/ratingReview/deleteReviewByAdmin?providerId=${payload}`);
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReview.pending, (state, action: PayloadAction<any>) => {
      state.isSkeleton = true;
    });

    builder.addCase(
      getReview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.review = action.payload.data;
        state.total = action.payload.total;
      }
    );
    builder.addCase(getReview.rejected, (state) => {
      state.isSkeleton = false;
    });



    builder.addCase(
        deletereview.pending,
        (state, action: PayloadAction<any>) => {
          state.isLoading = true;
        }
      );
  
      builder.addCase(
        deletereview.fulfilled,
        (state, action: any) => {
          if (action?.payload?.status) {
            
            state.review = state.review.filter(
              (review) => review?._id !== action?.meta?.arg
            );
            state.total -= 1;
            Success("review Delete Successfully");
          }
          state.isLoading = false;
        }
      );
  
      builder.addCase(deletereview.rejected, (state, action) => {
        state.isLoading = false;
      });
  
  },
});

export default reviewSlice.reducer;
