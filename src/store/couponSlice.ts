import { DangerRight, Success } from "@/api/toastServices";
import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  coupon: any[];
  isLoading: boolean;
  isSkeleton: boolean;
}
const initialState: UserState = {
  coupon: [],
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
  meta?: any;
  id?: any;
  data: any;
  payload: any;
}

export const getCoupon = createAsyncThunk(
  "api/admin/coupon/getAllCoupons",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/coupon/getAllCoupons`);
  }
);
export const createCoupon = createAsyncThunk(
  "api/admin/coupon/couponGenerate",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(`api/admin/coupon/couponGenerate`, payload);
  }
);
export const activeCoupon = createAsyncThunk(
  "api/admin/coupon/toggleCouponStatus?couponId",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(
      `api/admin/coupon/toggleCouponStatus?couponId=${payload}`
    );
  }
);

export const deleteCoupon = createAsyncThunk(
  "api/admin/coupon/deleteCoupon?couponId",
  async (payload: AllUsersPayload | undefined) => {
    return axios.delete(`api/admin/coupon/deleteCoupon?couponId=${payload}`);
  }
);

const couponSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupon.pending, (state, action: PayloadAction<any>) => {
      state.isSkeleton = true;
    });

    builder.addCase(
      getCoupon.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.coupon = action.payload.data;
      }
    );
    builder.addCase(getCoupon.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      activeCoupon.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      activeCoupon.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action?.payload?.data?.status) {
          const updatedCoupon = action.payload.data.data;
          const couponIndex = state.coupon.findIndex(
            (coupon) => coupon?._id === updatedCoupon?._id
          );
          if (couponIndex !== -1) {
            state.coupon[couponIndex].isActive = updatedCoupon.isActive;
          }
          Success("Coupon Status Update Successfully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(activeCoupon.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      createCoupon.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      createCoupon.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload.data.status) {
          state.coupon.unshift(action?.payload?.data?.data);

          Success("Coupon Add Successfully");
        }
      }
    );

    builder.addCase(createCoupon.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      deleteCoupon.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      deleteCoupon.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        if (action.payload.data.status === true) {
          
          const couponIndex = state.coupon.findIndex(
            (coupon) => coupon?._id === action?.meta?.arg
          );
          if (couponIndex !== -1) {
            state.coupon.splice(couponIndex, 1);
          }
          Success("Coupon Deleted Successfully");
        } else {
          DangerRight(action.payload.data.message);
        }
      }
    );
  },
});

export default couponSlice.reducer;
