export interface ISliceState {
  status: "idle" | "loading" | "failed";
  error: string | null;
}

export const defaultSliceState: ISliceState = {
  status: "idle",
  error: null,
};
