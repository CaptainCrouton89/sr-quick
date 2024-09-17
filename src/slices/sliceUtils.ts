// Purpose: create utility functions used by other slices
import {
  CreateSliceOptions,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
  UnknownAction,
  createSlice,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export function isPendingAction(sliceName: string) {
  return (action: UnknownAction): action is PayloadAction =>
    action.type.startsWith(sliceName) && action.type.endsWith("/pending");
}

export function isFulfilledAction(sliceName: string) {
  return (
    action: UnknownAction
  ): action is PayloadAction<unknown, string, any, Error> =>
    action.type.startsWith(sliceName) && action.type.endsWith("/fulfilled");
}

export function isRejectedAction(sliceName: string) {
  return (action: PayloadAction) =>
    action.type.startsWith(sliceName) && action.type.endsWith("/rejected");
}

export function rejectIfError(response: any) {
  if (response.failure) {
    throw JSON.stringify(response.error);
  }
  return response;
}

export const withOptimisticState = <T>(initialState: T, objects: string[]) => {
  return {
    ...initialState,
    prevStates: { ...initialState },
    optimisticLoads: objects.reduce((acc: any, obj: any) => {
      acc[obj] = { start: 0, stop: 0 };
      return acc;
    }, {}),
  };
};

interface RejectAction {
  error: Error | { message: string };
  axiosError: AxiosError;
  type: string;
  meta: any;
}

export function createSliceWithDefaults<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string,
  Selectors extends SliceSelectors<State>,
  ReducerPath extends string = Name
>(
  options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>
): Slice<State, CaseReducers, Name, ReducerPath, Selectors> {
  return createSlice({
    ...options,
    extraReducers: (builder) => {
      if (options.extraReducers) options.extraReducers(builder);
      const sliceName = options.name;

      builder.addMatcher(isFulfilledAction(sliceName), (state: any, _) => {
        state.status = "idle";
      });
      builder.addMatcher(isPendingAction(sliceName), (state: any, _) => {
        state.status = "loading";
      });
      builder.addMatcher(
        isRejectedAction(sliceName),
        (state: any, action: RejectAction) => {
          state.status = "failed";
          try {
            state.error = JSON.parse(action.error?.message).message;
          } catch (e) {
            state.error = action.error.message;
          }
        }
      );
    },
  });
}
