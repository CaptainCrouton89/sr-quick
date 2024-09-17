import { useEffectOnce } from "./hooks/useEffectOnce";
import { useForm } from "./hooks/useForm";
import { useScrollPosition } from "./hooks/useScrollPosition";
import { useTypewriter } from "./hooks/useTypewriter";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { AxiosError, createAxios } from "./network/globalAxios.js";
import { ISliceState, defaultSliceState } from "./slices/sliceState";
import {
  createSliceWithDefaults,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  optimisticCases,
  optimisticThunk,
  rejectIfError,
  withOptimisticState,
} from "./slices/sliceUtils";

export {
  AxiosError,
  ISliceState,
  createAxios,
  createSliceWithDefaults,
  defaultSliceState,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  optimisticCases,
  optimisticThunk,
  rejectIfError,
  useEffectOnce,
  useForm,
  useScrollPosition,
  useTypewriter,
  useWindowDimensions,
  withOptimisticState,
};
