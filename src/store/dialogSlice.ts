import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogState {
  dialogue: boolean;
  dialogueType: string;
  dialogueData: any;
  alertBox: boolean;
  isLoading: boolean;
}

const getDialogDataGet =
  typeof window !== "undefined" && localStorage.getItem("dialog");
const getDialogData = getDialogDataGet && JSON.parse(getDialogDataGet);
const initialState: DialogState = {
  dialogue: getDialogData?.dialogue || false,
  dialogueType: getDialogData?.dialogueType || "",
  dialogueData: getDialogData?.dialogueData || null,
  alertBox: false,
  isLoading: false,
};

const dialogSlice = createSlice({
  name: "dialogue",
  initialState,
  reducers: {
    setDialogInitialState: (
      state,
      action: PayloadAction<Partial<DialogState>>
    ) => {
      return { ...state, ...action.payload };
    },
    openDialog(state, action: PayloadAction<{ type?: string; data?: any }>) {
      state.dialogue = true;
      state.dialogueType = action.payload.type || "";
      state.dialogueData = action.payload.data || null;
    },
    closeDialog(state) {
      state.dialogue = false;
      state.dialogueType = "";
      state.dialogueData = null;
      localStorage.removeItem("dialogue");
    },
    openAlert(state) {
      state.alertBox = true;
    },
    closeAlert(state) {
      state.alertBox = false;
    },
    loaderOn(state) {
      state.isLoading = true;
    },
    loaderOff(state) {
      state.isLoading = false;
    },
  },
});
export default dialogSlice.reducer;
export const {
  openDialog,
  closeDialog,
  openAlert,
  closeAlert,
  loaderOn,
  loaderOff,
  setDialogInitialState,
} = dialogSlice.actions;
