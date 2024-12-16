import { Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  userPendingComplain: any[];
  userSolvedComplain: any[];
  expertPendingComplain: any[];
  expertSolvedComplain: any[];
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  userPendingComplain: [],
  userSolvedComplain: [],
  expertPendingComplain: [],
  expertSolvedComplain: [],
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
  status?:number;
}

export const getUserPendingComplain = createAsyncThunk(
  "api/admin/complaintSuggestion/getComplaintsAndSuggestions/userpending",
  async (payload: any) => {
    return apiInstanceFetch.get(`api/admin/complaintSuggestion/getComplaintsAndSuggestions?type=1&person=1&status=${payload}`);
  }
);
export const getUserSolvedComplain = createAsyncThunk(
  "api/admin/complaintSuggestion/getComplaintsAndSuggestions/usersolved",
  async (payload: any) => {
    return apiInstanceFetch.get(`api/admin/complaintSuggestion/getComplaintsAndSuggestions?type=1&person=1&status=${payload}`);
  }
);

export const getExpertPendingComplain = createAsyncThunk(
  "api/admin/complaintSuggestion/getComplaintsAndSuggestions/expertpending",
 async (payload: any) => {
     return apiInstanceFetch.get(`api/admin/complaintSuggestion/getComplaintsAndSuggestions?type=1&person=2&status=${payload}`);

  }
);


export const getExpertSolvedComplain = createAsyncThunk(
  "api/admin/complaintSuggestion/getComplaintsAndSuggestions/docotrsolved",
 async (payload: any) => {

    
    return apiInstanceFetch.get(`api/admin/complaintSuggestion/getComplaintsAndSuggestions?type=1&person=2&status=${payload}`);
  }
);

export const deleteExpertPendingComplain : any = createAsyncThunk(
  "admin/complain/delete/expertpending",
  async (id) => {
    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)


export const deleteUserPendingComplain : any = createAsyncThunk(
  "admin/complain/delete/userpending",
  async (id) => {


    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)

export const deleteUserSolveComplain : any = createAsyncThunk(
  "admin/complain/delete/userSolve",
  async (id) => {


    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)


export const deleteExpertSolveComplain : any = createAsyncThunk(
  "admin/complain/delete/expertsolve",
  async (id) => {


    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)

export const pendingToSolveUserComplain: any = createAsyncThunk(
  "admin/complain/solveUserComplain?",
  async (id) => {
    const response = await apiInstance.patch(`api/admin/complaintSuggestion/resolveComplaint?complaintSuggestionId=${id}`)
    return response
  }
)

export const pendingToSolveExpertComplain: any = createAsyncThunk(

  "admin/complain/solveExpertComplain?",
  async (id) => {
   return apiInstance.patch(`api/admin/complaintSuggestion/resolveComplaint?complaintSuggestionId=${id}`)
  }
)


const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getUserPendingComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.userPendingComplain = action.payload.data;
        }

        return state
      }
    );

    builder.addCase(
      getUserPendingComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        return state
      }

    );

    builder.addCase(
      getUserSolvedComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getUserSolvedComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.userSolvedComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getUserSolvedComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      getExpertPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getExpertPendingComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.expertPendingComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getExpertPendingComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      getExpertSolvedComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getExpertSolvedComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.expertSolvedComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getExpertSolvedComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      deleteExpertPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );


    builder.addCase(
      deleteExpertPendingComplain.fulfilled,
      (state, action: any) => {


        if (action.payload.status) {
          state.expertPendingComplain = state.expertPendingComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }

        state.isLoading = false
      }
    );

    builder.addCase(
      deleteUserPendingComplain.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {
          state.userPendingComplain = state.userPendingComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }
        state.isLoading = false
      }
    );

    builder.addCase(
      deleteUserSolveComplain.fulfilled,
      (state, action: any) => {


        if (action.payload.status) {
          state.userSolvedComplain = state.userSolvedComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }
        state.isLoading = false
      }
    )

    builder.addCase(
      deleteExpertSolveComplain.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {
        state.expertSolvedComplain = state.expertSolvedComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }
        
        state.isLoading = false
      }
    )

    builder.addCase(
      pendingToSolveUserComplain.fulfilled,
      (state, action: any) => {     
        if (action.payload.status) {
          state.userPendingComplain = state.userPendingComplain.filter((usercomplain) => usercomplain._id !== action?.meta?.arg)
          state.userSolvedComplain.unshift(action?.payload?.data)
          Success("Complain Solve Successfully");
        }
        state.isLoading = false
      }
    )

    builder.addCase(
      pendingToSolveExpertComplain.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {
          state.expertPendingComplain = state.expertPendingComplain.filter((expertcomplain) => expertcomplain._id !== action?.meta?.arg)
          state.expertSolvedComplain.unshift(action?.payload?.data)
          Success("Complain Solve Successfully");
        }
        state.isLoading = false
      }
    )
  },
});

export default complainSlice.reducer;


