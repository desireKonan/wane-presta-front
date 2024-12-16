import { DangerRight } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { setToast } from "@/utils/toastServices";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  withDrawal: any[];
  isLoading: boolean;
}

const initialState: SuggestionState = {
  withDrawal: [],
  isLoading: false,
};
interface AllUsersPayload {
  start?: number;
  limit?: number;
  id?: string;
  data?: any;
  payload?: any;
  type?: number;
  reason?: string;
  status?: any;
  startDate?: any;
  endDate?: any;
}

export const getWithdrawalRequest: any = createAsyncThunk(
  "api/admin/providerWithdrawRequest/withdrawRequestOfProByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstanceFetch.get(
      `api/admin/providerWithdrawRequest/withdrawRequestOfProByAdmin?status=${payload?.status}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const withdrawRequestPendingPayUpdate: any = createAsyncThunk(
  "api/admin/providerWithdrawpendingRequest/withdrawRequestApproved",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstance.patch(
      `api/admin/providerWithdrawRequest/withdrawRequestApproved?requestId=${payload}`
    );
  }
);

export const withdrawRequestPayUpdate: any = createAsyncThunk(
  "api/admin/providerWithdrawRequest/withdrawRequestApproved",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstance.patch(
      `api/admin/providerWithdrawRequest/withdrawRequestApproved?requestId=${payload}`
    );
  }
);

export const withdrawRequestDeclineUpdate: any = createAsyncThunk(
  "api/admin/providerWithdrawRequest/withdrawRequestDecline",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstance.patch(
      `api/admin/providerWithdrawRequest/withdrawRequestDecline?requestId=${payload?.id}&reason=${payload?.reason}`
    );
  }
);

export const withdrawRequestPendingDeclineUpdate: any = createAsyncThunk(
  "api/admin/providerWithdrawRequest/withdrawRequestpendingDecline",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstance.patch(
      `api/admin/providerWithdrawRequest/withdrawRequestDecline?requestId=${payload?.id}&reason=${payload?.reason}`
    );
  }
);

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getWithdrawalRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getWithdrawalRequest.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.withDrawal = action.payload.request;
      }
    );

    builder.addCase(
      withdrawRequestPayUpdate.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        const findIndex = state?.withDrawal?.findIndex(
          (item) => item?._id === action?.meta?.arg
        );
        if (findIndex !== -1) {
          state.withDrawal[findIndex] = {
            ...state.withDrawal[findIndex],
            status: action?.payload?.data?.status,
          };
        }
        setToast("success", "Withdraw Request Accepted Succesfully");
      }
    );

    builder.addCase(
      withdrawRequestPendingPayUpdate.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        state.withDrawal = state?.withDrawal?.filter(
          (item) => item?._id !== action?.meta?.arg
        );
        setToast("success", "Withdraw Request Accepted Succesfully");
      }
    );

    builder.addCase(
      withdrawRequestDeclineUpdate.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        const findIndex = state?.withDrawal?.findIndex(
          (item) => item?._id === action?.meta?.arg?.id
        );
        if (findIndex !== -1) {
          state.withDrawal[findIndex] = {
            ...state.withDrawal[findIndex],
            status: action?.payload?.data?.status,
          };
        }
        setToast("success", "Withdraw Request Declined Succesfully");
      }
    );

    builder.addCase(
      withdrawRequestPendingDeclineUpdate.fulfilled,
      (state, action: any) => {
        state.isLoading = false;
        state.withDrawal = state?.withDrawal?.filter(
          (item) => item?._id !== action?.meta?.arg?.id
        );
        setToast("success", "Withdraw Request Declined Succesfully");
      }
    );
  },
});

export default withdrawalSlice.reducer;
