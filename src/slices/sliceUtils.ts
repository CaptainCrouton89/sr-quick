// Purpose: create utility functions used by other slices
import {
  AsyncThunk,
  CreateSliceOptions,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  SliceSelectors,
  UnknownAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { cloneDeep, merge } from "lodash";

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

export const optimisticThunk = (
  path: string,
  thunkName: string,
  optimisticFunc: (payload: any, thunkAPI: any) => Promise<any>,
  maxRetries = 5,
  retryTime = 1000
) => {
  return createAsyncThunk(thunkName, async (payload: any, thunkAPI: any) => {
    let retryCounter = 0;
    const [sliceName, optimistObjectName] = path.split(".");
    while (
      thunkAPI.getState()[sliceName].optimisticLoads[optimistObjectName].start -
        1 >
      thunkAPI.getState()[sliceName].optimisticLoads[optimistObjectName].stop
    ) {
      if (retryCounter > maxRetries) {
        return thunkAPI.rejectWithValue("Request time out");
      }
      retryCounter += 1;
      await new Promise((resolve) => setTimeout(resolve, retryTime));
    }
    return await optimisticFunc(payload, thunkAPI);
  });
};

export const optimisticCases = (
  builder: any,
  thunk: AsyncThunk<any, any, any>,
  objectName: string
) => {
  builder.addCase(thunk.pending, (state: any, action: any) => {
    const currentState = cloneDeep(current(state));
    currentState.optimisticLoads[objectName].start += 1;
    if (
      currentState.optimisticLoads[objectName].start -
        currentState.optimisticLoads[objectName].stop ===
      1
    ) {
      currentState.prevStates[objectName] = cloneDeep(currentState[objectName]);

      currentState[objectName] = merge(
        currentState[objectName],
        action.meta.arg
      );
    }
    return currentState;
  });
  builder.addCase(thunk.fulfilled, (state: any, action: any) => {
    const currentState = cloneDeep(current(state));
    state[objectName] = merge(currentState[objectName], action.payload);
    state.optimisticLoads[objectName].stop += 1;
  });
  builder.addCase(thunk.rejected, (state: any, action: any) => {
    state.optimisticLoads[objectName].stop += 1;
    state[objectName] = current(state).prevStates[objectName];
  });
};
