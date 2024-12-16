import { DangerRight, Success } from "@/api/toastServices";
import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  suggestedService: any[];
  total: number;
  countryData: any[];
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  suggestedService: [],
  total: 0,
  countryData: [],
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
  data?: any;
  formData?: any;
  payload?: any;
}

export const getSuggestedServices = createAsyncThunk(
  "api/admin/suggestedService/getSuggestedServices",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/suggestedService/getSuggestedServices`
    );
  }
);

export const acceptSuggestedServiceRequest: any = createAsyncThunk(
  "api/admin/suggestedService/acceptSuggestedServices",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(
      `api/admin/suggestedService/acceptSuggestedServices?suggestedServiceId=${payload?.id}`,
      payload?.formData
    );
  }
);
export const declineSuggestedServiceRequest = createAsyncThunk(
  "api/admin/suggestedService/declineSuggestedServices",
  async (payload: AllUsersPayload | undefined) => {
    return axios.delete(
      `api/admin/suggestedService/declineSuggestedServices?suggestedServiceId=${payload}`
    );
  }
);

const suggestedServiceSlice = createSlice({
  name: "suggestService",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSuggestedServices.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getSuggestedServices.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.suggestedService = action.payload.data;
      }
    );
    builder.addCase(getSuggestedServices.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      acceptSuggestedServiceRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      acceptSuggestedServiceRequest.fulfilled,
      (state, action: any) => {
        if (action?.payload.data.status === true) {
          state.suggestedService = state.suggestedService.filter(
            (suggestedService) => suggestedService._id !== action?.meta?.arg?.id
          );
          state.total -= 1;
          Success("Suggested Service Accept Successfully");
        } else {
          DangerRight(action?.payload?.data.message);
        }
        state.isLoading = false;
      }
    );

    builder.addCase(acceptSuggestedServiceRequest.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      declineSuggestedServiceRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      declineSuggestedServiceRequest.fulfilled,
      (state, action: any) => {
        if (action?.payload?.status) {
          state.suggestedService = state.suggestedService.filter(
            (suggestedService) => suggestedService._id !== action?.meta?.arg
          );
          state.total -= 1;
          Success("Suggested Service Decline Successfully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(
      declineSuggestedServiceRequest.rejected,
      (state, action) => {
        state.isLoading = false;
      }
    );
  },
});

export default suggestedServiceSlice.reducer;
