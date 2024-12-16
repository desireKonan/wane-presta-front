import { DangerRight, Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { setToast } from "@/utils/toastServices";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  doctor: any[];
  doctorPendingRequest: any[];
  doctorAcceptedRequest: any[];
  doctorRejectedRequest: any[];
  doctorAppointment: any[];
  doctorEarning: any[];
  doctorReview: [];
  doctorVideo: [];
  videoComments: [];
  doctorProfile: any;
  isLoading: boolean;
  isSkeleton: boolean;
  total: number;
  wallet: number;
}

const initialState: UserState = {
  doctor: [],
  total: 0,
  wallet: 0,
  doctorPendingRequest: [],
  doctorAcceptedRequest: [],
  doctorRejectedRequest: [],
  doctorAppointment: [],
  doctorEarning: [],
  doctorReview: [],
  doctorVideo: [],
  videoComments: [],
  doctorProfile: {},
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
  id?: any;
  data: any;
  providerId: any;
  payload: any;
  status: any;
  request: any;
  total: number;
  videoId: any;
}

export const getAllDoctor = createAsyncThunk(
  "admin/doctor",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/doctor?start=${payload?.start}&limit=${payload?.limit}&search=${payload?.search}`
    );
  }
);

export const getDoctorProfile = createAsyncThunk(
  "admin/doctor/profile",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/doctor/profile?providerId=${payload}`);
  }
);

export const getDoctorReview: any = createAsyncThunk(
  "admin/review/doctorReview",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/review/doctorReview?providerId=${payload?.id}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);

export const getDoctorVideo = createAsyncThunk(
  "admin/doctor/doctorVideosByadmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/video/doctorVideosByadmin?providerId=${payload}`
    );
  }
);

export const getVideoComment = createAsyncThunk(
  "admin/video/videoComments",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/video/videoComments?videoId=${payload}`);
  }
);

export const updateDoctor = createAsyncThunk(
  "api/admin/provider/updateProProfileByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(
      `api/admin/provider/updateProProfileByAdmin?providerId=${payload?.providerId}`,
      payload?.data
    );
  }
);

export const blockDoctor = createAsyncThunk(
  "admin/doctor/blockUnblock",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.patch(`admin/doctor/blockUnblock?providerId=${payload}`);
  }
);
export const deleteDoctor = createAsyncThunk(
  "admin/doctor/delete",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.patch(`admin/doctor/delete?providerId=${payload}`);
  }
);

export const deleteDoctorVideo: any = createAsyncThunk(
  "admin/video/deleteVideoByadmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.delete(
      `admin/video/deleteVideoByadmin?providerId=${payload?.providerId}&videoId=${payload?.videoId}`
    );
  }
);

export const deleteDoctorComment = createAsyncThunk(
  "admin/doctor/deleteVideoComment  ",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.delete(
      `admin/video/deleteVideoComment?commentId=${payload}`
    );
  }
);

export const getPendingRequest = createAsyncThunk(
  "admin/doctorRequest?type=1",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/doctorRequest?type=1`);
  }
);
export const getAcceptedRequest = createAsyncThunk(
  "admin/doctorRequest?type=2",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/doctorRequest?type=2`);
  }
);
export const getRejectedRequest = createAsyncThunk(
  "admin/doctorRequest?type=3",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/doctorRequest?type=3`);
  }
);

export const getParticularProviderAppointment = createAsyncThunk(
  "api/admin/appointment/fetchProviderBookings",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/appointment/fetchProviderBookings?providerId=${payload?.providerId}&start=${payload?.start}&limit=${payload?.limit}&startDate=${payload?.startDate}&endDate=${payload?.endDate}&status=${payload?.status}`
    );
  }
);
export const getParticularProviderEarning = createAsyncThunk(
  "api/admin/provider/walletHistoryByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/provider/walletHistoryByAdmin?providerId=${payload?.providerId}&type=${payload?.status}`
    );
  }
);

export const doctorActionAccepted = createAsyncThunk(
  "admin/doctorRequest/accept",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.post(`admin/doctorRequest/accept?requestId=${payload}`);
  }
);

export const doctorActionDeclined = createAsyncThunk(
  "admin/doctorRequest/decline",
  async (payload: AllUsersPayload | undefined) => {
    const response = await apiInstance.post(
      `admin/doctorRequest/decline?requestId=${payload}`
    );

    return response;
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllDoctor.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(getAllDoctor.fulfilled, (state, action: any) => {
      state.isSkeleton = false;
      state.doctor = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(getAllDoctor.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(getDoctorProfile.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getDoctorProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctorProfile = action?.payload?.data;
    });

    builder.addCase(getDoctorProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getDoctorVideo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getDoctorVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctorVideo = action?.payload?.videos;
    });

    builder.addCase(getDoctorVideo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getVideoComment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getVideoComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.videoComments = action?.payload?.data;
    });

    builder.addCase(getVideoComment.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getDoctorReview.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getDoctorReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.doctorReview = action?.payload?.data;
    });

    builder.addCase(getDoctorReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateDoctor.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(doctorActionAccepted.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(doctorActionAccepted.fulfilled, (state, action: any) => {
      state.isLoading = false;

      const index = state.doctorPendingRequest?.findIndex(
        (doctor) => doctor?._id === action?.meta?.arg
      );
      if (index !== -1) {
        const removedDoctor = state.doctorPendingRequest[index];
        state.doctorPendingRequest?.splice(index, 1);
      }

      state.doctorAcceptedRequest?.unshift(action?.payload?.doctor);
      Success("Dcotr Request Accept Succesfully");
    });

    builder.addCase(doctorActionDeclined.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.doctorPendingRequest = state?.doctorPendingRequest?.filter(
        (doctor) => doctor?._id !== action?.meta?.arg
      );
      state?.doctorRejectedRequest?.unshift(action?.payload?.doctor);

      Success("Doctor Request Declined Succesfully");
    });

    builder.addCase(
      updateDoctor.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (
          action.payload.status &&
          action?.payload?.data?.data?.name !== "Dr. M.d.batt"
        ) {
          const providerIdx = state.doctor.findIndex(
            (doctor: any) => doctor?._id === action.payload?.data?.data?._id
          );
          if (providerIdx !== -1) {
            state.doctor[providerIdx] = {
              ...state.doctor[providerIdx],
              ...action.payload.data.data,
            };
          }

          state.doctorProfile = action.payload.doctor;
          Success("Doctor Update Successfully");
        } else {
          DangerRight("This is a Demo Doctor You Can Not Update");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(updateDoctor.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(blockDoctor.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(blockDoctor.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        const blockDoctorIndx = action?.payload?.data;
        const doctorIndx = state.doctor.findIndex(
          (doctor: any) => doctor?._id === blockDoctorIndx?._id
        );
        if (doctorIndx !== -1) {
          state.doctor[doctorIndx] = {
            ...state.doctor[doctorIndx],
            ...action.payload.data,
          };
        }
        action.payload.data?.isBlock === true
          ? setToast("success", "Doctor Block Successfully")
          : setToast("success", "Doctor Unblock Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(blockDoctor.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteDoctor.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteDoctor.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        state.doctor = state.doctor.filter(
          (doctor) => doctor._id !== action?.meta?.arg
        );
        setToast("success", "Doctor Delete Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteDoctorVideo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteDoctorVideo.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        state.doctorVideo = state.doctorVideo.filter(
          (doctor) => doctor._id !== action?.meta?.arg?.videoId
        );
        setToast("success", "Video Deleted Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteDoctorVideo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteDoctorComment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(
      deleteDoctorComment.fulfilled,
      (state: any, action: any) => {
        if (action?.payload?.status) {
          state.videoComments = state.videoComments.filter(
            (doctor) => doctor._id !== action?.meta?.arg
          );
          setToast("success", "Video Comment Delete Successfully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(deleteDoctorComment.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      getPendingRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getPendingRequest.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.doctorPendingRequest = action.payload.data;
      }
    );
    builder.addCase(getPendingRequest.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      getAcceptedRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getAcceptedRequest.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.doctorAcceptedRequest = action.payload.data;
      }
    );

    builder.addCase(getAcceptedRequest.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(
      getRejectedRequest.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
        state.isLoading = true;
      }
    );

    builder.addCase(
      getRejectedRequest.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        state.doctorRejectedRequest = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(getRejectedRequest.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(getParticularProviderAppointment.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(
      getParticularProviderAppointment.fulfilled,
      (state, action) => {
        state.isSkeleton = false;
        state.doctorAppointment = action.payload.data;
        state.total = action.payload.total;
      }
    );
    builder.addCase(getParticularProviderAppointment.rejected, (state) => {
      state.isSkeleton = false;
    });
    builder.addCase(getParticularProviderEarning.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(getParticularProviderEarning.fulfilled, (state, action) => {
      state.isSkeleton = false;
      state.doctorEarning = action.payload.data;
      state.total = action.payload.total;
      state.wallet = action.payload.wallet;
    });
    builder.addCase(getParticularProviderEarning.rejected, (state) => {
      state.isSkeleton = false;
    });
  },
});

export default doctorSlice.reducer;
