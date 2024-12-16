import { DangerRight, Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { setToast } from "@/utils/toastServices";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  expert: any[];
  expertPendingRequest: any[];
  expertAcceptedRequest: any[];
  expertRejectedRequest: any[];
  expertAppointment: any[];
  expertEarning: any[];
  expertReview: [];
  expertService : [];
  expertVideo: [];
  videoComments: [];
  expertProfile: any;
  isLoading: boolean;
  isSkeleton: boolean;
  total: number;
  wallet: number;
}

const initialState: UserState = {
  expert: [],
  total: 0,
  wallet: 0,
  expertPendingRequest: [],
  expertAcceptedRequest: [],
  expertRejectedRequest: [],
  expertAppointment: [],
  expertEarning: [],
  expertReview: [],
  expertService : [],
  expertVideo: [],
  videoComments: [],
  expertProfile: {},
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
  expertId: any;
  payload: any;
  status: any;
  request: any;
  total: number;
  videoId: any;
  providerId?: string;
}

export const getAllExpert = createAsyncThunk(
  "api/admin/provider/getProviders",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/provider/getProviders?start=${payload?.start}&limit=${payload?.limit}&search=${payload?.search}`
    );
  }
);

export const getExpertProfile = createAsyncThunk(
  "api/admin/provider/getProviderProfile",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/provider/getProviderProfile?providerId=${payload}`
    );
  }
);

export const getExpertReview: any = createAsyncThunk(
  "api/admin/ratingReview/reviewsOfProByAdmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/ratingReview/reviewsOfProByAdmin?providerId=${payload?.id}&start=${payload?.start}&limit=${payload?.limit}`
    );
  }
);

export const getExpertVideo = createAsyncThunk(
  "admin/expert/expertVideosByadmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/video/expertVideosByadmin?expertId=${payload}`
    );
  }
);



export const getVideoComment = createAsyncThunk(
  "admin/video/videoComments",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/video/videoComments?videoId=${payload}`);
  }
);

export const updateExpert = createAsyncThunk(
  "api/admin/provider/updateProProfileByAdmin?providerId",
  async (payload: AllUsersPayload | undefined) => {
    return axios.patch(
      `api/admin/provider/updateProProfileByAdmin?providerId=${payload?.providerId}`,
      payload?.data
    );
  }
);

export const blockExpert = createAsyncThunk(
  "api/admin/provider/isBlockOfPro",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.patch(
      `api/admin/provider/isBlockOfPro?providerId=${payload}`
    );
  }
);
export const deleteExpert = createAsyncThunk(
  "admin/expert/delete",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.delete(`api/admin/provider/deleteProvider?providerId=${payload}`);
  }
);

export const deleteExpertVideo: any = createAsyncThunk(
  "admin/video/deleteVideoByadmin",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.delete(
      `admin/video/deleteVideoByadmin?expertId=${payload?.expertId}&videoId=${payload?.videoId}`
    );
  }
);

export const deleteExpertComment = createAsyncThunk(
  "admin/expert/deleteVideoComment  ",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.delete(
      `admin/video/deleteVideoComment?commentId=${payload}`
    );
  }
);

export const getPendingRequest = createAsyncThunk(
  "api/admin/providerRequest/retriveProductRequest?type=1",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/providerRequest/retriveProductRequest?type=1`
    );
  }
);
export const getAcceptedRequest = createAsyncThunk(
  "admin/providerRequest/retriveProductRequest?type=2",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/providerRequest/retriveProductRequest?type=2`
    );
  }
);
export const getRejectedRequest = createAsyncThunk(
  "api/admin/providerRequest/retriveProductRequest?type=3",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/providerRequest/retriveProductRequest?type=3`
    );
  }
);

export const getParticularExpertAppointment = createAsyncThunk(
  "admin/appointment/getParticularExpert",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/appointment/getParticularExpert?expertId=${payload?.expertId}&start=${payload?.start}&limit=${payload?.limit}&startDate=${payload?.startDate}&endDate=${payload?.endDate}&status=${payload?.status}`
    );
  }
);
export const getParticularExpertEarning = createAsyncThunk(
  "admin/expertWallet",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `admin/expertWallet/?expertId=660bf127a04fa0a1da265cd7&type=${payload?.status}`
    );
  }
);

export const expertActionAccepted = createAsyncThunk(
  "api/admin/providerRequest/acceptOrdecline",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstance.patch(
      `api/admin/providerRequest/acceptOrdecline?requestId=${payload?.id}&status=2`
    );
  }
);

export const expertActionDeclined = createAsyncThunk(
  "api/admin/expertRequest/decline",
  async (payload: AllUsersPayload | undefined) => {
    const response = await apiInstance.patch(
      `api/admin/providerRequest/acceptOrdecline?requestId=${payload?.id}&status=3`
    );

    return response;
  }
);

const expertSlice = createSlice({
  name: "expert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllExpert.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(getAllExpert.fulfilled, (state, action: any) => {
      state.isSkeleton = false;
      state.expert = action.payload.providers;
      state.total = action.payload.total;
    });
    builder.addCase(getAllExpert.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(getExpertProfile.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getExpertProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expertProfile = action?.payload?.data;
    });

    builder.addCase(getExpertProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getExpertVideo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getExpertVideo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expertVideo = action?.payload?.videos;
    });

    builder.addCase(getExpertVideo.rejected, (state, action) => {
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

    builder.addCase(getExpertReview.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getExpertReview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.expertReview = action?.payload?.data;
    });

    builder.addCase(getExpertReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateExpert.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(expertActionAccepted.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(expertActionAccepted.fulfilled, (state, action: any) => {
      debugger
      state.isLoading = false;

      state.expertPendingRequest = state.expertPendingRequest?.filter(
        (expert) => expert?._id !== action?.meta?.arg?.id
      );

      Success("Expert Request Accept Succesfully");
    });

    builder.addCase(expertActionDeclined.fulfilled, (state, action: any) => {
      state.isLoading = false;
      state.expertPendingRequest = state?.expertPendingRequest?.filter(
        (expert) => expert?._id !== action?.meta?.arg?.id
      );
      Success("Expert Request Declined Succesfully");
    });

    builder.addCase(
      updateExpert.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (
          action.payload.status &&
          action?.payload?.data?.data?.name !== "Dr. M.d.batt"
        ) {
          const expertIdx = state.expert.findIndex(
            (expert: any) => expert?._id === action.payload?.data?.data?._id
          );
          if (expertIdx !== -1) {
            state.expert[expertIdx] = {
              ...state.expert[expertIdx],
              ...action.payload.data.data,
            };
          }

          state.expertProfile = action.payload.expert;
          Success("Expert Update Successfully");
        } else {
          DangerRight("This is a Demo Expert You Can Not Update");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(updateExpert.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(blockExpert.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(blockExpert.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        const blockExpertIndx = action?.payload?.data;
        const expertIndx = state.expert.findIndex(
          (expert: any) => expert?._id === blockExpertIndx?._id
        );
        if (expertIndx !== -1) {
          state.expert[expertIndx] = {
            ...state.expert[expertIndx],
            ...action.payload.data,
          };
        }
        action.payload.data?.isBlock === true
          ? setToast("success", "Expert Block Successfully")
          : setToast("success", "Expert Unblock Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(blockExpert.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteExpert.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteExpert.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        debugger
        state.expert = state.expert.filter(
          (expert) => expert._id !== action?.meta?.arg
        );
        setToast("success", "Expert Delete Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteExpert.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteExpertVideo.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(deleteExpertVideo.fulfilled, (state: any, action: any) => {
      if (action?.payload?.status) {
        state.expertVideo = state.expertVideo.filter(
          (expert) => expert._id !== action?.meta?.arg?.videoId
        );
        setToast("success", "Video Deleted Successfully");
      }
      state.isLoading = false;
    });

    builder.addCase(deleteExpertVideo.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteExpertComment.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(
      deleteExpertComment.fulfilled,
      (state: any, action: any) => {
        if (action?.payload?.status) {
          state.videoComments = state.videoComments.filter(
            (expert) => expert._id !== action?.meta?.arg
          );
          setToast("success", "Video Comment Delete Successfully");
        }
        state.isLoading = false;
      }
    );

    builder.addCase(deleteExpertComment.rejected, (state, action) => {
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
        state.expertPendingRequest = action.payload.data;
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
        state.expertAcceptedRequest = action.payload.data;
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
        state.expertRejectedRequest = action.payload.data;
        state.isLoading = false;
      }
    );
    builder.addCase(getRejectedRequest.rejected, (state) => {
      state.isSkeleton = false;
    });

    builder.addCase(getParticularExpertAppointment.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(
      getParticularExpertAppointment.fulfilled,
      (state, action) => {
        state.isSkeleton = false;
        state.expertAppointment = action.payload.data;
        state.total = action.payload.total;
      }
    );
    builder.addCase(getParticularExpertAppointment.rejected, (state) => {
      state.isSkeleton = false;
    });
    builder.addCase(getParticularExpertEarning.pending, (state) => {
      state.isSkeleton = true;
    });

    builder.addCase(getParticularExpertEarning.fulfilled, (state, action) => {
      state.isSkeleton = false;
      state.expertEarning = action.payload.data;
      state.total = action.payload.total;
      state.wallet = action.payload.wallet;
    });
    builder.addCase(getParticularExpertEarning.rejected, (state) => {
      state.isSkeleton = false;
    });
  },
});

export default expertSlice.reducer;
