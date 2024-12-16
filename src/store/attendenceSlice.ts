import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  attendence: any[];
  expertDropDown : [],
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  attendence: [],
  expertDropDown : [],
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
  expertId: any;
  payload: any;
  month: any;
}

export const getAttendence = createAsyncThunk(
  "api/admin/attendance",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/attendance/getAttendanceInfoOfPro?providerId=${payload?.expertId}&month=${payload?.month}`
    );
  }
);

export const getProviderDropDown = createAsyncThunk(
  "api/admin/provider/getProvidersDropDown",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/provider/getProvidersDropDown`);
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAttendence.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getAttendence.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.attendence = action.payload.data;
      }
    );
    builder.addCase(
      getAttendence.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      getProviderDropDown.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.expertDropDown = action.payload.data;
      }
    );
  },
});

export default attendanceSlice.reducer;
