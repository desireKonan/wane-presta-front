import { DangerRight, Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface SettingState {
  setting: any[];
  isLoading: boolean;
  isSkeleton: boolean;
  withdrawSetting: any;
  currency: any[];
  defaultCurrency: any;
}

const initialState: SettingState = {
  setting: [],
  withdrawSetting: [],
  isLoading: false,
  isSkeleton: false,
  currency: [],
  defaultCurrency: {},
};

interface SettingPayload {
  meta?: any;
  id?: any;
  data: any;
  settingId: any;
  payload: any;
  type: any;
  status: any;
}

export const getSetting: any = createAsyncThunk(
  "api/admin/setting/getSetting",
  async (payload: SettingPayload | undefined) => {
    return apiInstance.get("api/admin/setting/getSetting");
  }
);

export const updateSetting: any = createAsyncThunk(
  "api/admin/setting/update",
  async (payload: any | undefined) => {
    return apiInstance.patch(`api/admin/setting/update`, payload);
  }
);

export const handleSetting: any = createAsyncThunk(
  "api/admin/setting/handleSwitch",
  async (payload: SettingPayload | undefined) => {
    return apiInstance.patch(
      `api/admin/setting/handleSwitch?settingId=${payload?.settingId}&type=${payload?.type}`
    );
  }
);

export const getWithdrawMethod = createAsyncThunk(
  "api/admin/withdrawMethod/getMethods",
  async (payload: SettingPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/withdrawMethod/getMethods`);
  }
);

export const createWithdrawMethod = createAsyncThunk(
  "api/admin/withdrawMethod/create",
  async (payload: any) => {
    return axios.post("api/admin/withdrawMethod/create", payload);
  }
);

export const updateWithdrawMethod = createAsyncThunk(
  "api/admin/withdrawMethod/update",
  async (payload: any) => {
    return axios.patch(
      `api/admin/withdrawMethod/update?withdrawMethodId=${payload?.id}`,
      payload?.formData
    );
  }
);
export const activeWithdrawMethod = createAsyncThunk(
  "api/admin/withdrawMethod/handleSwitch",
  async (payload: any) => {
    return apiInstance.patch(
      `api/admin/withdrawMethod/handleSwitch?withdrawMethodId=${payload}`
    );
  }
);
export const deleteWithdrawMethod = createAsyncThunk(
  "api/admin/withdrawMethod/delete",
  async (payload: any) => {
    return apiInstance.delete(
      `api/admin/withdrawMethod/delete?withdrawMethodId=${payload}`
    );
  }
);

export const getAllCurrency = createAsyncThunk(
  "api/admin/currency/fetchCurrency",
  async (payload: SettingPayload | undefined) => {
    return apiInstanceFetch.get(`api/admin/currency/fetchCurrency`);
  }
);

export const createCurrency = createAsyncThunk(
  "api/admin/currency/create",
  async (payload: any) => {
    return axios.post("api/admin/currency/create", payload);
  }
);

export const updateCurrency = createAsyncThunk(
  "api/admin/currency/update",
  async (payload: any) => {
    return axios.patch(
      `api/admin/currency/update?currencyId=${payload?.currencyId}`,
      payload?.data
    );
  }
);

export const setDefaultCurrency = createAsyncThunk(
  "api/admin/currency/setDefault",
  async (payload: any) => {
    return axios.patch(`api/admin/currency/setDefault?currencyId=${payload}`);
  }
);

export const deleteCurrency = createAsyncThunk(
  "api/admin/currency/delete",
  async (payload: any) => {
    return axios.delete(`api/admin/currency/delete?currencyId=${payload}`);
  }
);

export const getDefaultCurrency = createAsyncThunk(
  "api/admin/currency/getDefault",
  async () => {
    return apiInstanceFetch.get("api/admin/currency/getDefault");
  }
);

const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.setting = action?.payload?.data;
    });

    builder.addCase(getSetting.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateSetting.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.setting = { ...state.setting, ...action.payload.data };
        Success("Setting Updated Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(getWithdrawMethod.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(getWithdrawMethod.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.withdrawSetting = action.payload.data;
    });

    builder.addCase(getWithdrawMethod.rejected, (state, action: any) => {
      state.isLoading = false;
    });
    builder.addCase(handleSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(handleSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === true) {
        state.setting = action.payload.data;
        Success("Updated Successfully");
      } else {
        DangerRight(action.payload.message);
      }
    });

    builder.addCase(handleSetting.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(createWithdrawMethod.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createWithdrawMethod.fulfilled, (state, action: any) => {
      state.isLoading = false;
      if (action.payload.status) {
        state.withdrawSetting.unshift(action?.payload?.data?.data);

        Success("Withdraw Method Add Successfully");
      } else {
        Success(action?.payload?.data?.message);
      }
    });
    builder.addCase(createWithdrawMethod.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateWithdrawMethod.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(updateWithdrawMethod.fulfilled, (state, action: any) => {
      if (action.payload.status) {
        if (action.payload.status) {
          const Index = state.withdrawSetting.findIndex(
            (withdrawSetting) =>
              withdrawSetting?._id === action?.payload?.data?.data?._id
          );

          if (Index !== -1) {
            state.withdrawSetting[Index] = {
              ...state.withdrawSetting[Index],
              ...action.payload.data.data,
            };
          }
        }
        Success("WithDraw Method Update Successfully");
      } else {
        Success(action.payload.data.message);
      }
      state.isLoading = false;
    });

    builder.addCase(updateWithdrawMethod.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(activeWithdrawMethod.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(activeWithdrawMethod.fulfilled, (state, action: any) => {
      if (action?.payload?.status) {
        const updatedWithdraw = action.payload.data;
        const Index = state.withdrawSetting.findIndex(
          (withdrawSetting) => withdrawSetting?._id === updatedWithdraw?._id
        );
        if (Index !== -1) {
          state.withdrawSetting[Index].isEnabled = updatedWithdraw.isEnabled;
        }
        Success("Withdraw Status Update Successfully");
      } else {
        Success(action.payload.data.message);
      }
      state.isLoading = false;
    });

    builder.addCase(activeWithdrawMethod.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteWithdrawMethod.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(deleteWithdrawMethod.fulfilled, (state, action: any) => {
      if (action?.payload?.status) {
        state.withdrawSetting = state.withdrawSetting.filter(
          (withdrawSetting: any) => withdrawSetting._id !== action?.meta?.arg
        );

        Success("Withdraw Delete Successfully");
      } else {
        Success(action.payload.data?.message);
      }
      state.isLoading = false;
    });

    builder.addCase(deleteWithdrawMethod.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getAllCurrency.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(getAllCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.currency = action.payload.data;
    });
    builder.addCase(getAllCurrency.rejected, (state, action: any) => {
      state.isLoading = false;
    });

    builder.addCase(createCurrency.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(createCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      if (action.payload.status) {
        state.currency.unshift(action?.payload?.data?.data);

        Success("Currency add successfully");
      } else {
        DangerRight(action?.payload?.data?.message);
      }
    });
    builder.addCase(createCurrency.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateCurrency.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(updateCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      if (action.payload.status) {
        const Index = state.currency.findIndex(
          (currency) => currency?._id === action?.payload?.data?.data?._id
        );

        if (Index !== -1) {
          state.currency[Index] = {
            ...state.currency[Index],
            ...action.payload.data.data,
          };
        }

        Success("Currency Update Successfully");
      } else {
        DangerRight(action.payload.data.message);
      }
    });
    builder.addCase(updateCurrency.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(setDefaultCurrency.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(setDefaultCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      if (action.payload.status) {
        Success("Default Currency Update Successfully");
        state.currency = action.payload.data.data;
      } else {
        DangerRight(action.payload.data.message);
      }
    });
    builder.addCase(setDefaultCurrency.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(deleteCurrency.pending, (state, action: any) => {
      state.isLoading = true;
    });

    builder.addCase(deleteCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      if (action.payload.data.status) {
        state.currency = state.currency.filter(
          (currency: any) => currency?._id !== action?.meta?.arg
        );

        Success("Currency Delete Successfully");
      } else {
        DangerRight(action.payload.data.message);
      }
    });

    builder.addCase(deleteCurrency.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getDefaultCurrency.pending, (state, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(getDefaultCurrency.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.defaultCurrency = action.payload.data;
    });
    builder.addCase(getDefaultCurrency.rejected, (state, action: any) => {
      state.isLoading = false;
    });
  },
});

export default settingSlice.reducer;
