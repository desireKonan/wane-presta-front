import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  monthlyReport: [];
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: SuggestionState = {
  monthlyReport: [],
  isLoading: false,
  isSkeleton: false,
};
interface AllUsersPayload {
  payload?: any;
}

export const getMonthlyReport = createAsyncThunk(
  "api/admin/appointment/fetchMonthlyAppointments",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/appointment/fetchMonthlyAppointments?year=${payload}`
    );
  }
);

const monthReportSlice = createSlice({
  name: "monthlystate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMonthlyReport.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getMonthlyReport.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.monthlyReport = action.payload.data;
        state.isSkeleton = false;
      }
    );
  },
});

export default monthReportSlice.reducer;
