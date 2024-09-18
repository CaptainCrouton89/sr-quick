import { useEffectOnce, useEffectUntilTrue } from "./hooks/useEffectOnce";
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
import {
  Color,
  debug,
  error,
  jlog,
  log,
  logYellow,
  success,
  warn,
  whisper,
} from "./utils/consoleColor";
import { getObjectHash, hashFunction } from "./utils/stringUtils";

export {
  AxiosError,
  Color,
  ISliceState,
  createAxios,
  createSliceWithDefaults,
  debug,
  defaultSliceState,
  error,
  getObjectHash,
  hashFunction,
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  jlog,
  log,
  logYellow,
  optimisticCases,
  optimisticThunk,
  rejectIfError,
  success,
  useEffectOnce,
  useEffectUntilTrue,
  useForm,
  useScrollPosition,
  useTypewriter,
  useWindowDimensions,
  warn,
  whisper,
  withOptimisticState,
};
