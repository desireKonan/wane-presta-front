"use client";

import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setToast } from "@/utils/toastServices";
import { SetDevKey, setToken } from "@/utils/setAuthAxios";
import { key } from "@/utils/config";
import axios from "axios";

interface UserState {
  isAuth: boolean;
  admin: any;

  isLoading: boolean;
}

const initialState: UserState = {
  isAuth: false,
  admin: {},

  isLoading: false,
};

interface AllUsersPayload {
  adminId: string;
  start?: number;
  limit?: number;
  startDate?: string;
  data: any;
  endDate?: string;
  payload?: any;
  type?: string;
}

export const signUpAdmin = createAsyncThunk(
  "api/admin/admin/signUp",
  async (payload: any) => {
    return apiInstanceFetch.post("api/admin/admin/signUp", payload);
  }
);

export const login = createAsyncThunk(
  "api/admin/admin/login",
  async (payload: AllUsersPayload | undefined) => {
    return axios.post("api/admin/admin/login", payload);
  }
);

export const adminProfileGet = createAsyncThunk(
  "api/admin/admin/profile",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/admin/profile`);
  }
);

export const adminProfileUpdate: any = createAsyncThunk(
  "admin/update",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(`api/admin/admin/updateProfile`, payload);
  }
);

export const updateAdminPassword: any = createAsyncThunk(
  "api/admin/admin/updatePassword",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(`api/admin/admin/updatePassword`, payload);
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutApi(state: any, action: PayloadAction<any>) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("key");
      sessionStorage.removeItem("isAuth");
      state.admin = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(
      signUpAdmin.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      signUpAdmin.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload && action.payload?.status !== false) {
          setToast("success", "Admin Sign Up Successfully");
          window.location.href = "/";
        } else {
          setToast("error", action.payload?.message);
        }
      }
    );
    builder.addCase(
      signUpAdmin.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        setToast("error", action.payload?.message);
      }
    );

    builder.addCase(login.pending, (state: any, action: PayloadAction<any>) => {
      state.isLoading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload && action.payload?.data?.status !== false) {
          const token = action.payload.data.data;
          const decodedToken: any = jwtDecode(token);
          state.isAuth = true;
          state.admin = decodedToken;
          setToken(action.payload.data);
          SetDevKey(key);

          sessionStorage.setItem("token", token);
          sessionStorage.setItem("isAuth", JSON.stringify(true));
          sessionStorage.setItem("admin_", JSON.stringify(decodedToken));
          setToast("success", "Login Successfully");

          window.location.href = "/dashboard";
        } else {
          setToast("error", action.payload?.data?.message);
        }
      }
    );
    builder.addCase(
      login.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        setToast("error", action.payload?.message);
      }
    );

    builder.addCase(
      adminProfileGet.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      adminProfileGet.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.admin = {
          ...state.admin,
          _id: action.payload?.data?._id,
          name: action.payload?.data?.name,
          email: action.payload?.data?.email,
          image: action.payload?.data?.image,
        };
      }
    );
    builder.addCase(
      adminProfileGet.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        setToast("error", action.payload?.message);
        setToken("");
        SetDevKey("");
        window.localStorage.clear();
        window.sessionStorage.clear();
      }
    );

    builder.addCase(
      adminProfileUpdate.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      adminProfileUpdate.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload.data?.status === true) {
          state.admin = action?.payload?.data?.data;
          setToast("success", "Admin Profile Update Successful");
        } else {
          setToast("error", action.payload.data.message);
        }
      }
    );
    builder.addCase(
      adminProfileUpdate.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        setToast("error", action.payload?.message);
      }
    );

    builder.addCase(
      updateAdminPassword.pending,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );
    builder.addCase(
      updateAdminPassword.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        if (action.payload.data?.status === true) {
          state.admin = action.payload.data?.data;
          setToast("success", "Admin Password Update Successful");
          window.location.href = "/";
        } else {
          setToast("error", action.payload.data.message);
        }
      }
    );
    builder.addCase(
      updateAdminPassword.rejected,
      (state: any, action: PayloadAction<any>) => {
        state.isLoading = false;
        setToast("error", action.payload?.message);
      }
    );
  },
});

export default adminSlice.reducer;
export const { logoutApi } = adminSlice.actions;
