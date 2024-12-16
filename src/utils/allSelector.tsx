import { createSelector } from "reselect";

const selectStates = (state: any) => state;

export const isSkeleton = createSelector(selectStates, (state) => {
  const slices = Object.values(state);
  return slices.some((slice: any) => {
    if (slice && typeof slice === "object" && slice.isSkeleton === true) {
      return true;
    }
    return false;
  });
});

export const isLoading = createSelector(selectStates, (state) => {
  const slices = Object.values(state);
  return slices.some((slice: any) => {
    if (slice && typeof slice === "object" && slice.isLoading === true) {
      return true;
    }
    return false;
  });
});
