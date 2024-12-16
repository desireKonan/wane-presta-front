import { apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface SuggestionState {
  userSuggestion: [];
  expertSuggestion: [];
  isLoading: boolean;
}

const initialState: SuggestionState = {
  userSuggestion: [],
  expertSuggestion: [],
  isLoading: false,
};
interface AllUsersPayload {
  start?: number;
  limit?: number;
  id?: string;
  data?: any;
  payload?: any;
  type: number;
}

export const getUserSuggestion = createAsyncThunk(
  "admin/complain/usersuggestions",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/complaintSuggestion/getComplaintsAndSuggestions?person=${payload?.type}&type=2&start=${payload?.start}&limit=${payload?.limit}&status=1`
    );
  }
);

export const getExpertSuggestion = createAsyncThunk(
  "admin/complain/expertsuggestions",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(
      `api/admin/complaintSuggestion/getComplaintsAndSuggestions?person=${payload?.type}&type=2&start=${payload?.start}&limit=${payload?.limit}&status=1`
    );
  }
);

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserSuggestion.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getUserSuggestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.userSuggestion = action.payload.data;
      }
    );

    builder.addCase(
      getUserSuggestion.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );


    builder.addCase(
      getExpertSuggestion.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );

    builder.addCase(
      getExpertSuggestion.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.expertSuggestion = action.payload.data;
      }
    );

    builder.addCase(
      getExpertSuggestion.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );
  },
});

export default suggestionSlice.reducer;
