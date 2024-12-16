"use client";
import {  configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import adminSlice from "./adminSlice";
import doctorSlice from "./doctorSlice";
import serviceSlice from "./serviceSlice";
import userSlice from "./userSlice";
import dialogSlice from "./dialogSlice";
import bannerSlice from "./bannerSlice";
import suggestedServiceSlice from "./suggestedServiceSlice";
import couponSlice from "./couponSlice";
import complainSlice from "./complainSlice";
import reviewSlice from "./reviewSlice";
import attendenceSlice from "./attendenceSlice";
import bookingSlice from "./bookingSlice";
import suggestionSlice from "./suggestionSlice";
import doctorHolidaySlice from "./doctorHolidaySlice";
import monthlyReportSlice from "./monthlyReportSlice";
import dashboardSlice from "./dashboardSlice";
import settingSlice from "./settingSlice";
import withdrawalSlice from "./withdrawalSlice";
import notificationSlice from "./notificationSlice";
import rechargeSlice from "./rechargeSlice";
import expertSlice from "./expertSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      admin: adminSlice,
      banner: bannerSlice,
      user: userSlice,
      suggestedService: suggestedServiceSlice,
      coupon: couponSlice,
      doctor: doctorSlice,
      service: serviceSlice,
      complain: complainSlice,
      review: reviewSlice,
      attendence: attendenceSlice,
      dialogue: dialogSlice,
      booking: bookingSlice,
      suggestion: suggestionSlice,
      doctorHoliday: doctorHolidaySlice,
      monthlyReport: monthlyReportSlice,
      dashboard: dashboardSlice,
      setting : settingSlice,
      withdraw : withdrawalSlice,
      notification: notificationSlice,
      recharge : rechargeSlice,
      expert: expertSlice
    },
  });
}
export const store = makeStore();

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<any> = useSelector;
