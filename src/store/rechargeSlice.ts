import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  recharge: [];
  isLoading: boolean;
  total: number;
}

const initialState: SuggestionState = {
  recharge: [],
  isLoading: false,
  total: 0,
};

interface AllUsersPayload {
  startDate?: any;
  endDate?: any;
  status?: any;
  type?: any;
  start?: number;
  limit?: number;
}

export const getRechargeRequest = createAsyncThunk(
  "api/admin/customer/fetchAllCustomerWalletRecords?",
  async (payload: AllUsersPayload | undefined) => {
    return await apiInstanceFetch.get(
      `api/admin/customer/fetchAllCustomerWalletRecords?startDate=${payload?.startDate}&endDate=${payload?.endDate}&type=${payload?.type}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);

const rechargeSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getRechargeRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getRechargeRequest.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.recharge = action.payload.data;
        state.total = action.payload.total;
      }
    );
  },
});

export default rechargeSlice.reducer;
