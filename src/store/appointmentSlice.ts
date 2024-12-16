import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AppointmentState {
  appointment: any[];
  totalData: any;
  total: number;
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: AppointmentState = {
  appointment: [],
  totalData: {},
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
  meta?: any;
  id?: any;
  data: any;
  doctorId: any;
  payload: any;
  month: any;
  status: any;
}

export const getAllAppointment = createAsyncThunk(
  "admin/appointment/get",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/appointment/get?status=${payload?.status}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);


const appointmentSlice = createSlice({
  name: "suggestService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllAppointment.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getAllAppointment.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.appointment = action.payload.data;
      }
    );
  
  },
});

export default appointmentSlice.reducer;