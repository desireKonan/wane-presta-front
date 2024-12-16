import { apiInstanceFetch } from "@/utils/ApiInstance";
import { setToast } from "@/utils/toastServices";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  doctorHoliday: [];
  doctorDropDown: [];
  isLoading: boolean;
}

const initialState: SuggestionState = {
  doctorHoliday: [],
  doctorDropDown: [],
  isLoading: false,
};
interface AllUsersPayload {
  payload?: any;
}

export const getProviderHoliday = createAsyncThunk(
  "api/admin/providerHoliday/providerHolidaySchedule",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/providerHoliday/providerHolidaySchedule?providerId=${payload}`
    );
  }
);

export const getProviderDropDown = createAsyncThunk(
  "api/admin/provider/getProvidersDropDown",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/provider/getProvidersDropDown`);
  }
);

export const deleteProviderHoliday = createAsyncThunk(
  "api/admin/providerHoliday/deleteProviderHoliday",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.delete(
      `api/admin/providerHoliday/deleteProviderHoliday?providerHolidayId=${payload}`
    );
  }
);

const doctorHolidayslice = createSlice({
  name: "doctorholiday",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProviderHoliday.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getProviderHoliday.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.doctorHoliday = action.payload.data;
      }
    );

    builder.addCase(
      getProviderDropDown.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.doctorDropDown = action.payload.data;
      }
    );

    builder.addCase(
      deleteProviderHoliday.fulfilled,
      (state: any, action: any) => {
        if (action?.payload?.status) {
          state.doctorHoliday = state.doctorHoliday.filter(
            (doctor: any) => doctor._id !== action?.meta?.arg
          );
          setToast("success", "Doctor Holiday Delete Successfully");
        }
        state.isLoading = false;
      }
    );
  },
});

export default doctorHolidayslice.reducer;
