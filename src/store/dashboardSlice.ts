import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  dashboardData: [];
  topProviders: [];
  upcomingBookings: [];
  chartData: [];
  isLoading: boolean;
}

const initialState: SuggestionState = {
  dashboardData: [],
  topProviders: [],
  upcomingBookings: [],
  chartData: [],
  isLoading: false,
};
interface AllUsersPayload {
  startDate?: string;
  endDate?: string;
  payload?: {
    startDate?: string;
    endDate?: string;
  };
  type: number;
}

export const getDashboardData = createAsyncThunk(
  "api/admin/dashboard/dashboardCount",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/dashboard/dashboardCount?startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const getTopProvidersData = createAsyncThunk(
  "api/admin/dashboard/getTopRatedProvider",
  async (payload: AllUsersPayload | undefined) => {
    
    return apiInstanceFetch.get(
      `api/admin/dashboard/getTopRatedProvider?startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const getUpcomingBookings = createAsyncThunk(
  "api/admin/dashboard/upcomingBookings",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/dashboard/upcomingBookings`);
  }
);

export const getChartData = createAsyncThunk(
  "api/admin/dashboard/chartAnalytic",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/dashboard/chartAnalytic?startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDashboardData.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getDashboardData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.dashboardData = action.payload.data;
      }
    );

    builder.addCase(
      getTopProvidersData.fulfilled,
      (state, action: PayloadAction<any>) => {
        
        state.isLoading = false;
        state.topProviders = action.payload.data;
      }
    );

    builder.addCase(
      getUpcomingBookings.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.upcomingBookings = action.payload.data;
      }
    );

    builder.addCase(
      getChartData.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.chartData = action.payload.chartAnalytic;
      }
    );
  },
});

export default suggestionSlice.reducer;
