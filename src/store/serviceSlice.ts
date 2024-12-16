import { Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "@/utils/config";

interface UserState {
  service: any[];
  total: number;
  countryData: any[];
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  service: [],
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

export const getServices = createAsyncThunk(
  "api/admin/service/getService",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/service/getService?start=${payload?.start}&limit=${payload?.limit}&search=${payload?.search}`
    );
  }
);

export const createService = createAsyncThunk(
  "api/admin/service/createService",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(`api/admin/service/createService`, payload);
  }
);

export const createDoctorDialogue = createAsyncThunk(
  "admin/service/create",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(`admin/service/create`, payload);
  }
);

export const updateService = createAsyncThunk(
  "api/admin/service/updateService",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(
      `api/admin/service/updateService?serviceId=${payload?.id}`,
      payload?.formData
    );
  }
);
export const statusService = createAsyncThunk(
  "api/admin/service/isActive",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(`api/admin/service/isActive?serviceId=${payload}`);
  }
);

export const deleteService = createAsyncThunk(
  "admin/service/delete",
  async (id: any) => {
    return apiInstance.patch(`admin/service/delete?serviceId=${id}`);
  }
);

const serviceSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getServices.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getServices.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.service = action.payload.data;
        state.total = action.payload.total;
      }
    );
    builder.addCase(getServices.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      createService.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      createService.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload.status) {


          const serviceData = {
            ...action.payload.data.data,
            image: baseURL + action?.payload?.data?.data?.image,
          };

          state.service.unshift(serviceData);

          state.total += 1;
          Success("Service Add Successfully");
        }
      }
    );
    builder.addCase(createService.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      updateService.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      updateService.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.data.status === true) {
          Success("Service Update Successfully");
          const serviceInx = state.service.findIndex(
            (service) => service?._id === action?.payload?.data?.data?._id
          );

          if (serviceInx !== -1) {
            state.service[serviceInx] = {
              ...state.service[serviceInx],
              ...action.payload.data.data,
              image: action?.payload?.data?.data?.image,
            };
          }
        }

        state.isLoading = false;
      }
    );

    builder.addCase(updateService.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      statusService.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      statusService.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action?.payload?.data?.status) {
          const updatedService = action.payload.data.data;
          const serviceIndex = state.service.findIndex(
            (service) => service?._id === updatedService?._id
          );
          if (serviceIndex !== -1) {
            state.service[serviceIndex].isActive = updatedService.isActive;
          }
          Success("Service Status Update Successfully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(statusService.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      deleteService.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(deleteService.fulfilled, (state, action: any) => {
      if (action?.payload?.status) {
        state.service = state.service.filter(
          (service) => service._id !== action?.meta?.arg
        );
        state.total -= 1;
        Success("Service Delete Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteService.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default serviceSlice.reducer;
