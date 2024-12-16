import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DangerRight, Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";

// Define the structure of a booking item
interface Booking {
  _id: string;
  [key: string]: any; // Other properties of a booking
}

interface CalendarData {
  [key: string]: any; // Define the structure of calendar data if known
}

interface BookingState {
  booking: Booking[];
  calendarData: CalendarData[];
  futureBooking: Booking[];
  isLoading: boolean;
  isSkeleton: boolean;
  total: number | null;
}

interface AllUsersPayload {
  start?: number;
  limit?: number;
  startDate?: any;
  endDate?: any;
  appointmentId?: string;
  reason?: string;
  status?: number;
  customerId?: string;
  dialogPayload?: any;
}

// Initial state with proper types
const initialState: BookingState = {
  booking: [],
  calendarData: [],
  futureBooking: [],
  isLoading: false,
  isSkeleton: false,
  total: null,
};

export const getAllBookings = createAsyncThunk(
  "api/admin/appointment/fetchAppointmentsByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/appointment/fetchAppointmentsByAdmin?status=${payload?.status}&start=${payload?.start}&limit=${payload?.limit}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const getDailyBooking = createAsyncThunk(
  "api/admin/appointment/fetchDailyAppointments",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/appointment/fetchDailyAppointments?start=${payload?.start}&limit=${payload?.limit}&startDate=${payload?.startDate}&endDate=${payload?.endDate}`
    );
  }
);

export const cancelBooking = createAsyncThunk(
  "api/admin/appointment/cancelAppointmentByAdmin",
  async (payload: AllUsersPayload) => {
    const url = `api/admin/appointment/cancelAppointmentByAdmin?customerId=${encodeURIComponent(
      payload?.customerId ?? ""
    )}&appointmentId=${encodeURIComponent(
      payload?.appointmentId ?? ""
    )}&reason=${encodeURIComponent(payload?.reason ?? "")}`;
    
    return apiInstance.patch(url);
  }
);

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBookings.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(getAllBookings.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.booking = action.payload.data;
      state.total = action.payload.total;
      state.isSkeleton = false;
    });

    builder.addCase(getDailyBooking.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(getDailyBooking.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.calendarData = action.payload.data;
      state.isSkeleton = false;
      state.total = action.payload.total;
    });

    builder.addCase(cancelBooking.fulfilled, (state, action: PayloadAction<any>) => {
      const { status, data, message } = action.payload;

      if (status && state.booking) {
        const bookingIndex = state.booking.findIndex(
          (booking: Booking) => booking._id === data?._id
        );
        if (bookingIndex !== -1) {
          state.booking[bookingIndex] = {
            ...state.booking[bookingIndex],
            ...data,
          };
        }
        Success("Appointment Cancelled Successfully");
      } else {
        DangerRight(message);
      }
      state.isLoading = false;
    });
  },
});

export default bookingSlice.reducer;
