import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { setToast } from "@/utils/toastServices";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any[];
  userWalletHistory: any[];
  userWalletData: any[];
  total: number;
  countryData: any[];
  booking: any[];
  userProfile: any;
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  user: [],
  total: 0,
  userProfile: {},
  countryData: [],
  userWalletData: [],
  userWalletHistory: [],
  booking: [],
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
  data: any;
  status: any;
}

export const getAllUser = createAsyncThunk(
  "api/admin/customer/getCustomers",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/customer/getCustomers?start=${payload?.start}&limit=${payload?.limit}&search=${payload?.search}`
    );
  }
);

export const getUserProfile = createAsyncThunk(
  "api/admin/customer/getProfile",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/customer/getProfile?customerId=${payload}`
    );
  }
);

export const getUserWalletHistory = createAsyncThunk(
  "admin/userWallet/get",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/customer/getCustomerWalletHistoryByAdmin?customerId=${payload?.id}&type=${payload?.status}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const blockuser = createAsyncThunk(
  "api/admin/customer/isBlock",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.patch(
      `api/admin/customer/isBlock?customerId=${payload}`
    );
  }
);

export const getUserAppointment = createAsyncThunk(
  "admin/user/appointment",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/appointment/fetchCustomerBookings?status=${payload?.status}&start=${payload?.start}&limit=${payload?.limit}&customerId=${payload?.id}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, (state, action: PayloadAction<any>) => {
      state.isSkeleton = true;
    });

    builder.addCase(
      getAllUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.user = action.payload.data;
        state.total = action.payload.total;
      }
    );
    builder.addCase(getAllUser.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      getUserWalletHistory.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getUserWalletHistory.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userWalletHistory = action.payload.data;
        state.userWalletData = action.payload.data;
      }
    );

    builder.addCase(getUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userProfile = action?.payload?.data;
    });

    builder.addCase(getUserAppointment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getUserAppointment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.booking = action?.payload?.data;
      state.total = action?.payload?.total;
    });

    builder.addCase(getUserAppointment.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(blockuser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(blockuser.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        const blockuserIndx = action?.payload?.data;
        const userIndx = state.user.findIndex(
          (user: any) => user?._id === blockuserIndx?._id
        );
        if (userIndx !== -1) {
          state.user[userIndx] = {
            ...state.user[userIndx],
            ...action.payload.data,
          };
        }
        action.payload.data?.isBlock === true
          ? setToast("success", "user Block Successfully")
          : setToast("success", "user Unblock Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(blockuser.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
