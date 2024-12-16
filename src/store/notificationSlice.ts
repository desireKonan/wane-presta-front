import { DangerRight, Success } from "@/api/toastServices";
import { apiInstance } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

interface notificationState {
  notification: [];
  total: any;
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: notificationState = {
  notification: [],
  total: null,
  isLoading: false,
  isSkeleton: false,
};

interface AllUsersPayload {
  userId?: any;
  data?: any;
  formData?: any;
  doctorId?: any;
  status?: number;
  expertId?: any;
}

export const userNotification: any = createAsyncThunk(
  "api/admin/notification/notificationToCustomerByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(
      `api/admin/notification/notificationToCustomerByAdmin`,
      payload?.formData
    );
  }
);

export const userNotificationWithoutImage: any = createAsyncThunk(
  "api/admin/notificationwithoutimage/notificationToCustomerByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(
      `api/admin/notification/notificationToCustomerByAdmin`,
      payload
    );
  }
);

export const doctorNotification = createAsyncThunk(
  "admin/notification/toExpert",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.post(
      `admin/notification/toExpert?doctorId=${payload?.doctorId}`,
      payload?.data
    );
  }
);

export const allUserNotification: any = createAsyncThunk(
  "api/admin/notification/notificationToCustomers",
  async (payload: any) => {
    return axios.post(
      "api/admin/notification/notificationToCustomers",
      payload
    );
  }
);

export const expertNotification: any = createAsyncThunk(
  "api/admin/notification/notificationToProviderByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post(
      `api/admin/notification/notificationToProviderByAdmin`,
      payload
    );
  }
);

const notificationSlice = createSlice({
  name: "payoutSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userNotification.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(
      userNotification.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action?.payload.data.status === true) {
          Success("Notification Send SuccessFully");
        } else {
          DangerRight(action?.payload?.data.message);
        }
      }
    );

    builder.addCase(userNotification.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(userNotificationWithoutImage.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(
      userNotificationWithoutImage.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action?.payload.data.status === true) {
          Success("Notification Send SuccessFully");
        } else {
          DangerRight(action?.payload?.data.message);
        }
      }
    );

    builder.addCase(userNotificationWithoutImage.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(expertNotification.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(expertNotification.fulfilled, (state, action) => {
      if (action?.payload?.status) {
        Success("Notification Send SuccessFully");
      }
      state.isLoading = false;
    });

    builder.addCase(expertNotification.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(allUserNotification.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(
      allUserNotification.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action?.payload?.status) {
          Success("Notification Send SuccessFully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(allUserNotification.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default notificationSlice.reducer;
